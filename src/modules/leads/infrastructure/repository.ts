import { getDatabase } from "@/lib/mongodb";
import { LEAD_ETAPAS_TYPES, type Lead } from "../domain/types";
import type { ProjectReference } from "../../projects/types"
const COLLECTION= "leads";

type LeadDocument = Omit<Lead, "_id"> & { _id?: unknown };

function toLead(doc:LeadDocument & { _id: {toString(): string} }): Lead {
    return{
        _id: doc._id.toString(),
        nombre: doc.nombre,
        apellido: doc.apellido,
        tipo_documento: doc.tipo_documento,
        numero: doc.numero,
        genero: doc.genero,
        fecha_nacimiento: doc.fecha_nacimiento,
        pais_origen: doc.pais_origen,
        canal_origen: doc.canal_origen,
        agente_asignado: doc.agente_asignado,
        nombre_campaña: doc.nombre_campaña,
        medio_captacion: doc.medio_captacion,
        celular: doc.celular,
        usuario_wasap: doc.usuario_wasap,
        correo_electronico: doc.correo_electronico,
        departamento: doc.departamento,
        provincia: doc.provincia,
        distrito: doc.distrito,
        direccion: doc.direccion,
        proyecto: doc.proyecto,
        fecha_ingreso: doc.fecha_ingreso,
        hora_ingreso: doc.hora_ingreso,
        etapas: doc.etapas
    }
}

export async function  findAllLeads(): Promise<Lead[]> {
    const db=await getDatabase()
    const doc= await db.collection<LeadDocument>(COLLECTION).find().toArray()
    return doc as Lead[];
}

export async function findLeadByLeadID(leadId:string): Promise<Lead|null> {
    const db =await getDatabase()
    const doc=await db.collection(COLLECTION).findOne({"_id":leadId})
    return doc 
    
}