import type { APIRoute } from "astro";
import { getLeads,updateLeadStage } from "@/services/leads";
export const prerender = false;
export const GET: APIRoute = async () => {
  try {
    const leads = await getLeads();
    return new Response(
      JSON.stringify(leads),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Error obteniendo leads",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};




export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { id, etapa } = body;

    if (!id || !etapa) {
      return new Response(
        JSON.stringify({
          error: "id y etapa son requeridos",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const result = await updateLeadStage(id, etapa);

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error: "Error actualizando el lead",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};