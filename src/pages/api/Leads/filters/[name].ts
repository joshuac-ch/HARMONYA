

import type { APIRoute } from "astro";
import { getLeadByName } from "@/services/leads";
export const prerender=false
export const GET : APIRoute = async ({params}) => {
    try{
        const name=params.name
        if (!name) {
        return new Response(
            JSON.stringify({
            error: "name de usuario requerido",
            }),
            {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
        }
        const search_stage=await getLeadByName(name)
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
        console.error("Hubo un error en obtecion del leadByName",err)
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
