import { harmonyTools } from "@/tools/harmony.tools";

for (const tool of harmonyTools){
    document.modelContext.registerTool({
      name:tool.name,
      description:tool.description,
      inputSchema:tool.inputSchema,
      execute:async (args)=>{
        return await tool.execute(args,window.location.origin)
      }
    })
}
