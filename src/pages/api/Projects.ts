import { getProjects } from "@/services/projects";
import type { APIRoute } from "astro";

export const GET: APIRoute = async()=> {
    try{
        const projects=await getProjects()
        return new Response(
            JSON.stringify(projects),
            {
                status:200,
                headers:{
                  "Content-Type": "application/json",
                },
            }
        )
    }
    catch(err){
        console.error(err)
        return new Response(
        JSON.stringify({
            error: "Error obteniendo projectos",
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
