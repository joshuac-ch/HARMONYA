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

export async function updateLeadStage(
  id: string,
  etapa: string
) {
  const db = await getDatabase();

  const result = await db.collection("leads").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        etapa,
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