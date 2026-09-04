import { get_LeadbyStage } from "@/services/leads"
import type { APIRoute } from "astro"

export const prerender=false


export const GET : APIRoute = async ({params}) => {
    try{
        const stage=params.stage
        if (!stage) {
        return new Response(
            JSON.stringify({
            error: "stage requerido",
            }),
            {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        }
        const search_stage=await get_LeadbyStage(stage)
        return new Response(
            JSON.stringify(search_stage),
            {
                status:200,
                headers:{
                    "Content-Type": "application/json",
                }
            }
        )

    }catch(err){
        console.error("Hubo un error en obtecion del lead stage",err)
        return new Response(
        JSON.stringify({
            error: "Error obteniendo lead",
        }),
        {
            status: 500,
            headers: {
            "Content-Type": "application/json",
            },
        }
        );
    }
}