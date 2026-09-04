import type { APIRoute } from "astro";
import OpenAI from "openai";
import { processHarmonyMessage } from "@/services/agent";

export const prerender = false;

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});


export const POST: APIRoute = async ({ request }) => {

  try {

    console.log("🎙️ Harmony voice request");


    // =====================================================
    // 1. RECIBIR AUDIO
    // =====================================================

    const formData = await request.formData();

    const audio = formData.get("audio");


    if (!(audio instanceof File)) {

      console.error("❌ No se recibió archivo");

      return new Response(
        JSON.stringify({
          success: false,
          error: "No se recibió ningún audio"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    }


    console.log("🎧 Audio recibido:", {
      name: audio.name,
      type: audio.type,
      size: audio.size
    });



    // =====================================================
    // 2. SPEECH TO TEXT
    // =====================================================

    const transcription =
      await openai.audio.transcriptions.create({

        file: audio,

        model: "gpt-4o-mini-transcribe",

        language: "es"

      });


    const userMessage = transcription.text;


    console.log(
      "🗣️ Transcripción:",
      userMessage
    );



    // =====================================================
    // 3. HARMONY AGENT
    // =====================================================

    const origin = new URL(
      request.url
    ).origin;


    const harmonyResponse =
      await processHarmonyMessage(
        userMessage,
        origin
      );


    // output_text contiene la respuesta final
    const responseText =
      harmonyResponse.output_text;


    console.log(
      "🤖 Harmony respuesta:",
      responseText
    );



    // =====================================================
    // 4. TEXT TO SPEECH
    // =====================================================

    console.log(
      "🔊 Generando voz..."
    );


    const speech =
      await openai.audio.speech.create({

        model: "gpt-4o-mini-tts",

        voice: "coral",

        input: responseText,

        response_format: "mp3"

      });



    console.log(
      "🔊 Audio generado"
    );



    // =====================================================
    // 5. DEVOLVER AUDIO AL NAVEGADOR
    // =====================================================

    const audioBuffer =
      Buffer.from(
        await speech.arrayBuffer()
      );


    return new Response(
      audioBuffer,
      {
        status: 200,

        headers: {

          "Content-Type":
            "audio/mpeg",

          "Content-Length":
            audioBuffer.length.toString(),

          "Cache-Control":
            "no-cache"

        }
      }
    );


  } catch (error) {

    console.error(
      "❌ Error Harmony Voice:",
      error
    );


    return new Response(

      JSON.stringify({

        success: false,

        error:
          "Error procesando Harmony"

      }),

      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json"
        }
      }

    );

  }

};