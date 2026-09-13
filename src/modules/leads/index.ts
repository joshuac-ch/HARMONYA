import { getLeadService } from "./application/service";
import type { Lead, LEAD_ETAPAS_TYPES } from "./domain/types";

export type {Lead, LEAD_ETAPAS_TYPES} from "./domain/types"

export const leadsService=getLeadService()