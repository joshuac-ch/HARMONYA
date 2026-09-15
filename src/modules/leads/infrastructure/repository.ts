import { getDatabase } from "@/lib/mongodb";
import { LEAD_ETAPAS_TYPES, type Lead } from "../domain/types";
const COLLECTION= "leads";

export async function  findAllLeads(){
    const db=await getDatabase()
    const doc= await db.collection(COLLECTION).find().toArray()
    return doc;
}

export async function findLeadByLeadID(leadId:string){
    const db =await getDatabase()
    const doc=await db.collection(COLLECTION).findOne({"_id":leadId})
    return doc 
    
}
   
export async function findLeadByStage(stage:string) {
    const db=await getDatabase()
    const normalizedStage = stage.trim().toLowerCase();
    return db.collection(COLLECTION).find({"etapa":normalizedStage}).toArray()
  }
  
export async function updateLeadByStage(
    id: string,
    etapa: string
  ) {
    const db = await getDatabase();
  
    const normalizedStage = LEAD_ETAPAS_TYPES.find(
      (stage) =>
        stage.toLowerCase() === etapa.trim().toLowerCase()
    );
    
    if (!normalizedStage) {
      throw new Error(`Etapa no válida: ${etapa}`);
    }   
    
    const result = await db.collection(COLLECTION).updateOne(
      {
        "_id":id,
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

export async function findLeadByName(nombre: string, apellido?: string) {
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
      .collection(COLLECTION)
      .find(filter)
      .toArray();
  }