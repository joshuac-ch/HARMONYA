import { LEAD_ETAPAS_TYPES,type Lead } from "../domain/types";
import { findAllLeads,findLeadByLeadID } from "../infrastructure/repository";
import type { ProjectLookup } from "../../projects/ports/project_port";

export function getLeadService(){
    return findAllLeads()
}
