import { findAllLeadService,
    findLeadByLeadIDService,
    findLeadByNameService,
    findLeadByStageService,
    updateLeadByStageService } from "./application/service";

export const gefindAllLead=findAllLeadService
export const getfindLeadByLeadID=findLeadByLeadIDService
export const getfindLeadByName = findLeadByNameService
export const getfindLeadByStage = findLeadByStageService
export const putupdateLeadByStageService = updateLeadByStageService