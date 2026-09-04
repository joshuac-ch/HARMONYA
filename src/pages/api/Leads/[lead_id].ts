import type { APIRoute } from "astro";

export const prerender = false;
import { getLeadbyID } from "@/services/leads";

export const GET : APIRoute = async ({params}) => {
  try {
    const leadId=params.lead_id;
    if (!leadId) {
      return new Response(
        JSON.stringify({
          error: "Lead ID requerido",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    const lead = await getLeadbyID(leadId);
    return new Response(
      JSON.stringify(lead),
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
};