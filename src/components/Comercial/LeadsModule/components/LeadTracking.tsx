
interface Lead {
  nombre: string;
  apellido: string;
  proyecto: string;
  canal_origen: string;
  medio_captacion: string;
  celular: string;
  agente_asignado?: string;
  fecha_ingreso: string;
  hora_ingreso: string;
  nivel?: "alto" | "medio" | "bajo";
}
interface Project {
    name:string,
    description:string,
    codigo:string,
    type_proyect:string,
    type:string,
    area_total_terreno:string,
    moneda:string,
    fecha_inicio_obras:string,
    fecha_fin_obras:string,
    costo_total:string,
    fecha_inicio_venta:string,
    financiamiento:string,
    propietario:string,
    desarrollador_immobiliario:string,
    departamento:string,
    dirrecion:string,
    ubicacion:string,
    image:string
}
interface Props {
    lead_id:string,
    project_name:string
}
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import LeadAgent from './views/LeadAgent';


export default function LeadTracking({ lead_id,project_name }: Props) {
  const [lead, setLead] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [section, setsection] = useState("identificacion");
  const [view, setview] = useState("datos")
  console.log("lead id leadtraking",lead_id)
  useEffect(() => {
    async function loadTracking() {
      try {
        setLoading(true);

        const response = await fetch(`/api/Leads/${lead_id}`);

        if (!response.ok) {
          throw new Error("Error obteniendo lead");
        }

        const leadData = await response.json();

        setLead(leadData);

        // Si el lead tiene proyecto
        if (leadData?.proyecto) {
          // Aquí podrías hacer un endpoint para obtener el proyecto
          // o directamente hacer fetch al endpoint de proyectos.
        }

      } catch (error) {
        console.error("Error cargando Lead Tracking:", error);
      } finally {
        setLoading(false);
      }
    }
    async function loadTrakingProject() {
       try{
        const response=await fetch(`/api/Projects/${encodeURIComponent(project_name)}`)
        const projectoInfo=await response.json()
        setProject(projectoInfo)
        console.log("projecto",projectoInfo)
      }catch(err){
        console.error("Error cargando proyectos:",err)
       }     
    }

    loadTracking();
    loadTrakingProject()
  }, [lead_id,project_name]);
   if (loading || !lead || !project) {
    return (
      <div className="py-8 text-center text-sm text-slate-500">
        Cargando información...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="py-8 text-center text-sm text-slate-500">
        No se encontró el lead.
      </div>
    );
  }
   return (
    <>
      <div className="bg-zinc-50">

    {/* HEADER DEL PROYECTO */}
    <div className="border-b bg-white px-6 py-5">

      <div className="flex items-center justify-between gap-6">

        {/* Proyecto */}
        <div className="flex items-center gap-4">
          <img
            src={project.image??""}
            className="h-16 w-16 rounded-xl object-cover"
          />

          <div>
            <p className="text-lg font-semibold text-zinc-900">
              {project.name}
            </p>

            <div className="mt-1 flex gap-4 text-xs text-zinc-500">
              <span>
                Código: <b>{project.codigo}</b>
              </span>

              <span>
                {project.type_proyect}
              </span>

              <span>
                {project.type}
              </span>
            </div>
          </div>
        </div>

        {/* Navegación principal */}
        <div className="flex rounded-lg bg-zinc-100 p-1">

          <button 
          onClick={()=>setview("datos")}
          className={view === "datos"
            ? "rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white"
            : "rounded-md px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-100"
          }>
            Datos
          </button>

          <button className="rounded-md px-4 py-2 text-sm text-zinc-600 hover:bg-white">
            Actividades
          </button>

          <button className="rounded-md px-4 py-2 text-sm text-zinc-600 hover:bg-white">
            Timeline
          </button>

          <button 
          onClick={()=>setview("agente")}
          className={view === "agente"
            ? "rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white"
            : "rounded-md px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-100"
          }>
            Agente
          </button>

        </div>

      </div>
    </div>


    
    {view==="datos" &&( 
     <div className="">
      {/* CONTENIDO DINAMICO */}
    <div className="px-6 py-6">

      {/* SUBNAVEGACIÓN */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-base font-semibold text-zinc-900">
            Información del lead
          </h2>

          <p className="text-sm text-zinc-500">
            {lead.nombre} {lead.apellido}
          </p>
        </div>

        {/* Selector */}
        <div className="flex rounded-lg border bg-white p-1 shadow-sm">

          <button
            onClick={()=>setsection("identificacion")}
            className={section === "identificacion"
            ? "rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white"
            : "rounded-md px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-100"
            }>
            Identificación
          </button>

          <button 
            onClick={()=>setsection("perfil")}
            className={section === "perfil"
            ? "rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white"
            : "rounded-md px-4 py-2 text-xs text-zinc-600 hover:bg-zinc-100"
            }>
            Perfil y Contacto
          </button>

          <button className="rounded-md px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100">
            Finanzas y Compra
          </button>

        </div>
      </div>


      {/* IDENTIFICACION */}
      
               
      {/* GRID DE INFORMACIÓN */}
      {section === "identificacion" && (
      <div className="grid grid-cols-2 gap-5">

        {/* Datos personales */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="font-semibold text-zinc-900">
              Datos personales
            </h3>

            <p className="text-xs text-zinc-500">
              Información de identificación del cliente
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Tipo de documento
              </label>
              <Input value={lead.tipo_documento ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Número
              </label>
              <Input value={lead.numero ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Nombres
              </label>
              <Input value={lead.nombre ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Apellidos
              </label>
              <Input value={lead.apellido ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Género
              </label>
              <Input value={lead.genero ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Fecha de nacimiento
              </label>
              <Input value={lead.fecha_nacimiento ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                País de origen
              </label>
              <Input value={lead.pais_origen ?? ""} readOnly />
            </div>

          </div>
        </div>


        {/* Agente y origen */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h3 className="font-semibold text-zinc-900">
              Agente y origen
            </h3>

            <p className="text-xs text-zinc-500">
              Información comercial del lead
            </p>
          </div>

          <div className="space-y-4">

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Agente asignado
              </label>

              <Input
                value={lead.agente_asignado ?? ""}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-xs font-medium text-zinc-500">
                  Canal de origen
                </label>

                <Input
                  value={lead.canal_origen ?? ""}
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500">
                  Medio de captación
                </label>

                <Input
                  value={lead.medio_captacion ?? ""}
                  readOnly
                />
              </div>

            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Nombre de campaña
              </label>

              <Input
                value={lead.nombre_campaña ?? ""}
                readOnly
              />
            </div>

          </div>
        </div>

      </div>
    )}
      {section=== "perfil" &&(
        <div className="grid grid-cols-2 gap-5">

        {/* Datos personales */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="font-semibold text-zinc-900">
              Contacto y Ubicacion
            </h3>

            <p className="text-xs text-zinc-500">
              Información de Contacto y Ubicacion
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Celular
              </label>
              <Input value={lead.celular ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Usuario de Whastsapp
              </label>
              <Input value={"@".concat(lead.usuario_wasap) ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Correo Electronico 1
              </label>
              <Input value={lead.correo_electronico ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Correo Electronico 2
              </label>
              <Input value={lead.correo2 ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Departamento
              </label>
              <Input value={lead.departamento ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Provincia
              </label>
              <Input value={lead.provincia ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Distrito
              </label>
              <Input value={lead.distrito ?? ""} readOnly />
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500">
                Dirreccion
              </label>
              <Input value={lead.direccion ?? ""} readOnly />
            </div>

          </div>
        </div>        

      </div>
      )}     
      
    </div>
     </div>  
    )}

    {view==="agente" &&(
      <LeadAgent lead={lead} project={project}></LeadAgent>
    )}
  </div>
    </>
  );
}
