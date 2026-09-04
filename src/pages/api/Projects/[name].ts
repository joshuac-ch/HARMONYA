import type { APIRoute } from "astro"
import { get_proyect_by_name } from "@/services/projects"

export const prerender = false;

export const GET: APIRoute = async({params})=> {
    try{
        const project= params.name;
        if (!project){
            return new Response(
                JSON.stringify({
                  error:"Nombre de proyecto no encontrado"  
                }),
                {
                    status:404,
                    headers:{
                       "Content-Type": "application/json",  
                    }
                }
            )
        }

        const serach_project=await get_proyect_by_name(project)
        return new Response(
            JSON.stringify(serach_project),
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
            error: "Error obteniendo projecto",
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