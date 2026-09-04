import { getDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getLeads() {
  const db = await getDatabase();
  const leads = await db
    .collection("leads")
    .find({})
    .toArray();
  return leads.map((lead) => ({
    ...lead,
    _id: lead._id.toString(),
  }));
}

export async function getLeadbyID(leadId:string) {
  const db= await getDatabase()
  return db.collection("leads").findOne({"_id":new ObjectId(leadId)})
  
}

export async function get_LeadbyStage(stage:string) {
  const db=await getDatabase()
  const normalizedStage = stage.trim().toLowerCase();
  return db.collection("leads").find({"etapa":normalizedStage}).toArray()
}

export async function updateLeadStage(
  id: string,
  etapa: string
) {
  const db = await getDatabase();
  const etapas = [
    "Bandeja",
    "Contacto sin respuesta",
    "Seguimiento",
    "Lead tracking",
    "Desestimado",
  ];

  const normalizedStage = etapas.find(
    (stage) =>
      stage.toLowerCase() === etapa.trim().toLowerCase()
  );
  
  if (!normalizedStage) {
    throw new Error(`Etapa no válida: ${etapa}`);
  }   
  
  const result = await db.collection("leads").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        etapa:normalizedStage,
        updatedAt: new Date(),
      },
    }
  );

  if (result.matchedCount === 0) {
    throw new Error("Lead no encontrado");
  }

  return {
    success: true,
    id,
    etapa,
  };
}


export async function getLeadByName(nombre: string, apellido?: string) {
  const db = await getDatabase();

  const filter: any = {
    nombre: {
      $regex: nombre,
      $options: "i",
    },
  };

  if (apellido) {
    filter.apellido = {
      $regex: apellido,
      $options: "i",
    };
  }

  return await db
    .collection("leads")
    .find(filter)
    .toArray();
}