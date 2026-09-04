import { harmonyTools } from "@/tools/harmony.tools";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});


export async function processHarmonyMessage(
  message: string,
  origin: string
) {

  console.log("🤖 Harmony procesando:", message);

  const tools = harmonyTools.map((tool)=>({
    type:"function" as const,
    name:tool.name,
    description: tool.description,
    parameters: tool.inputSchema
  }));
  // 1️⃣ Primera llamada
  let response = await openai.responses.create({
    model: "gpt-4o-mini",

    tools,

    input: message
  });

  console.log("🤖 Primera respuesta:", response.output);

  // 2️⃣ Buscar llamadas a tools
  for (const item of response.output) {

    if (item.type !== "function_call") {
      continue;
    }

    console.log("🛠️ Tool solicitada:", item.name);

    const args = JSON.parse(item.arguments);

     // 3️⃣ Buscar la tool en nuestro registro
    const tool = harmonyTools.find(
      (tool) => tool.name === item.name
    );


    if (!tool) {

      throw new Error(
        `Tool no encontrada: ${item.name}`
      );

    }

    // 4️⃣ Ejecutar LA MISMA tool que usa WebMCP
    const result = await tool.execute(
      args,
      origin
    );


    console.log("📊 Resultado tool:", result);
    
    // 5️⃣ Mandamos el resultado al mismo contexto
    response = await openai.responses.create({

      model: "gpt-4o-mini",

      previous_response_id: response.id,

      tools,

      input: [

        {
          type: "function_call_output",

          call_id: item.call_id,

          output: JSON.stringify(result)
        }

      ]

    });


    console.log("🤖 Respuesta final:", response.output_text);
  
  }

  return response;
}