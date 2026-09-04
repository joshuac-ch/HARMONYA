export const harmonyTools = [

    {
        name: "get_leads",
        description: "Obtener todos los leads disponibles del kanban",
        
        execute: async (args: any, origin: string) => {
        const response = await fetch(`${origin}/api/Leads`);

            if (!response.ok) {
            throw new Error("No se pudieron obtener los leads");
            }

            return await response.json();
        }
    },
    {
        name:"get_lead_traking_agent_conversation",
        description: "Obtener la conversacion del asesor y el lead",
        inputSchema: {
            type: "object",
            properties: {
                nombre: { type: "string", description: "nombre del lead" }
            },
            required: ["nombre"]
            },
            execute:async (args: any, origin: string)=>{
            const search_lead=await fetch(`${origin}/api/Leads/filters/${args.nombre}`)
            const leads=await search_lead.json()
            if (!leads || leads.length === 0) {
                throw new Error("No se encontró ningún lead con ese nombre");
            }

            if (leads.length > 1) {
                return JSON.stringify({
                success: false,
                multiple: true,
                message: "Se encontraron varios leads con ese nombre",
                leads
                });
            }
            const lead=leads[0]
            const searchConversations=await fetch(`https://ia.zefiron.com/dev/ia/adgent/chat-history/${lead.celular}`)
            const data=await searchConversations.json()
            return JSON.stringify(data)
            }
    },
    {
        name:"get_lead_traking_agent_summary",
        description:"Obtener el resumen de la conversacion del lead",
        inputSchema:{
            type:"object",
            properties:{
            nombre:{type:"string",description:"nombre del lead"}
            },
            required:["nombre"]
        },
        execute:async (args: any, origin: string)=>{
            const search_lead=await fetch(`${origin}/api/Leads/filters/${args.nombre}`)
            const leads=await search_lead.json()
            if (!leads || leads.length === 0) {
                throw new Error("No se encontró ningún lead con ese nombre");
            }

            if (leads.length > 1) {
                return JSON.stringify({
                success: false,
                multiple: true,
                message: "Se encontraron varios leads con ese nombre",
                leads
                });
            }
            const lead=leads[0]
            const searchConversations=await fetch(`https://ia.zefiron.com/dev/ia/adgent/conversation_summary/${lead.celular}`)
            const data=await searchConversations.json()
            return JSON.stringify(data)
            }
    },
    {
        name:"get_lead_traking_agent_insigths",
        description:"Obtener las metricas de un lead en especifico",
        inputSchema:{
            type:"object",
            properties:{
            nombre:{type:"string",description:"nombre del lead"}
            },
            required:["nombre"]
        },
        execute:async (args: any, origin: string)=>{
            const search_lead=await fetch(`${origin}/api/Leads/filters/${args.nombre}`)
            console.log("SEARCH",search_lead)
            const leads=await search_lead.json()
            if (!leads || leads.length === 0) {
                throw new Error("No se encontró ningún lead con ese nombre");
            }

            if (leads.length > 1) {
                return JSON.stringify({
                success: false,
                multiple: true,
                message: "Se encontraron varios leads con ese nombre",
                leads
                });
            }
            const lead=leads[0]
            const searchConversations=await fetch(`https://ia.zefiron.com/dev/ia/adgent/lead-metrics/${lead.celular}`)
            
            const data=await searchConversations.json()

            const metrics = {
            interes: data.interestLevel,
            canal: data.sourceChannel,
            metodo: data.method,
            proyecto: data.interestedProjectName || data.projectOfInterest,
            cantidad_mensajes: data.message_count,
            ultima_interaccion: data.last
            };
            return JSON.stringify(metrics)
            } 
    },
    {
        name:"get_lead_by_stage",
        description: "Obtener los leads segun el estado desesado",
        inputSchema: {
            type: "object",
            properties: {
                etapa: { type: "string", description: "estado del lead" }
            },
            required: ["etapa"]
            },
        execute:async (args: any, origin: string)=>{
            const response = await fetch(`${origin}/api/Leads/stage/${encodeURIComponent(args.etapa)}`)
            const data= await response.json()
            return JSON.stringify(data)
        }  
    },
    {
        name: "update_lead_stage",
        description: "Actualiza la etapa de un lead en el Kanban.",
        inputSchema: {
            type: "object",
            properties: {
            name: {
                type: "string",
                description: "name del lead que se quiere actualizar"
            },
            etapa: {
                type: "string",
                description: "Nueva etapa del lead"
            }
            },
            required: ["name", "etapa"]
        },
        execute: async (args: any, origin: string) => {
            const searchResponse = await  fetch(`${origin}/api/Leads/filters/${encodeURIComponent(args.name)}`)
            const leads = await searchResponse.json();

            if (!leads || leads.length === 0) {
            throw new Error("No se encontró ningún lead con ese nombre");
            }

            if (leads.length > 1) {
            return JSON.stringify({
                success: false,
                multiple: true,
                message: "Se encontraron varios leads con ese nombre",
                leads
            });
            }

            const lead=leads[0]
            const response = await fetch(`${origin}/api/Leads/`,
            {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                id: lead._id,
                etapa: args.etapa
                })
            }
            )
            const data= await response.json()
            return JSON.stringify(data)
        } 
    }

]