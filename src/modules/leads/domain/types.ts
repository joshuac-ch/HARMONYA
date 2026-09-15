import type { ProjectReference } from "../../projects/domain/types";

export const LEAD_ETAPAS_TYPES= [
    "Bandeja",
    "Contacto sin respuesta",
    "Seguimiento",
    "Lead tracking",
    "Desestimado",
] as const;

export type LeadEtapaType = (typeof LEAD_ETAPAS_TYPES)[number];


export interface Lead {
    _id: string;
    nombre: string;
    apellido: string;
    tipo_documento: string;
    numero: string;
    genero: string;
    fecha_nacimiento: Date;
    pais_origen: string;
    canal_origen: string;
    agente_asignado: string;
    nombre_campaña: string;
    medio_captacion: string;
    celular: string;
    usuario_wasap: string;
    correo_electronico: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    proyecto: ProjectReference;
    fecha_ingreso: Date;
    hora_ingreso: Date;
    etapas: LeadEtapaType;
}
