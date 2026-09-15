// PEQUEÑA REFERENCIA PARA OTROS MODULOS
 export interface ProjectReference {
    id: string;
    name: string;
    description: string;
    codigo: string;    
    departamento: string;
    direccion: string;
    ubicacion: string;
    image: string;   
}
// PROYECTO COMPLETO
export interface Project{
    id: string;
    name: string;
    description: string;
    codigo: string;
    type_project: string;
    type: string;
    area_total_terreno:string;
    moneda: string;
    fecha_inicio_obras: string;
    fecha_fin_obras: string;
    costo_total: string;
    fecha_inicio_venta: string;
    financiamiento: string;
    propietario: string; 
    desarrollador_immobiliario: string;
    departamento: string;
    direccion: string;
    ubicacion: string;
    image: string;   
}