import { findAllLeads,findLeadByLeadID, findLeadByName,findLeadByStage, updateLeadByStage } from "../infrastructure/repository";

// REGLA ACA VIVE TODA LA LOGICA de la aplicacion
export function findAllLeadService(){
    return findAllLeads()
}

export async function findLeadByLeadIDService(id:string) {
    return findLeadByLeadID(id)
}

export async function findLeadByNameService(nombre:string) {
    return findLeadByName(nombre)
}

export async function findLeadByStageService(etapa:string) {
    return findLeadByStage(etapa)
}

export async function updateLeadByStageService(id:string,etapa:string) {
    return updateLeadByStage(id,etapa)
}