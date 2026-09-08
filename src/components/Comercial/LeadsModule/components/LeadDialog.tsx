import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import LeadTracking from "./LeadTracking";



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

interface Props {
  lead: any;
}

const nivelStyles: Record<string, string> = {
  alto: "text-emerald-600 bg-emerald-50",
  medio: "text-amber-600 bg-amber-50",
  bajo: "text-rose-600 bg-rose-50",
};

const medios_captacion={
  "whatsapp":"https://images.icon-icons.com/840/PNG/512/Whatsapp_icon-icons.com_66931.png",
  "chatbot":"https://images.icon-icons.com/1913/PNG/512/iconfinder-bl-1646-brain-artificial-intelligence-electronic-computer-processor-consciousness-4575061_121498.png",
  "instagram":"https://images.icon-icons.com/836/PNG/512/Instagram_icon-icons.com_66804.png",
  "google":"https://images.icon-icons.com/729/PNG/512/google_icon-icons.com_62736.png",
  "facebook":"https://images.icon-icons.com/555/PNG/512/facebook_icon-icons.com_53612.png"
}
const country={
  "peru":"https://images.icon-icons.com/1694/PNG/512/peperuflag_111973.png"
}
export default function LeadDialog({ lead }: Props) {
  return (
    <Dialog>
      <DialogTrigger nativeButton={false}
        render={
         <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-indigo-200 transition">
            <header className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800">
                {lead.nombre} {lead.apellido}
                </h3>
                
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-col">
                    <i className="bx bx-happy text-center " />
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${lead.nivel}`}>
                      
                    </span>
                  </div>
                  <span>
                    <i className="bx bx-phone" />
                  </span>
                  <span>
                    <i className="bx bx-dots-vertical-rounded" />
                  </span>
                </div>
                

            </header>

            <p className="mt-1 text-sm text-slate-600">{lead.proyecto}</p>

            <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-500">
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5">{lead.canal_origen}</span>
                <div className="flex flex-row items-center rounded-md bg-slate-50 px-1.5 py-0.5">
                  <img src={lead.medio_captacion?medios_captacion[lead.medio_captacion]:""} 
                  className="w-4 h-4 " alt={lead.medio_captacion || "Medio de captación"} />
                  <span className=" px-1.5 p-0.5">{lead.medio_captacion}</span>
                </div>
            </div>

            <div className="flex gap-2 items-center mt-2">
              <img src={country.peru} className="w-4 h-4 rounded-md" alt="" />
              <a href={`tel:${lead.celular}`} className="block text-sm font-medium text-indigo-600 hover:text-indigo-700">
                {lead.celular}
            </a>
            </div>

            <footer className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
                <span className="truncate font-semibold">
                Asesor {lead.agente_asignado ?? "Sin personal asignado"}
                </span>
                <span className="shrink-0">{new Date(lead.fecha_ingreso).toLocaleDateString()} · {new Date(lead.hora_ingreso).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
            </footer>
        </article>
        }
      />

      <DialogContent className="sm:max-w-7xl bg-zinc-100 border-0 p-0 ring-0 shadow-none" >
        <DialogHeader >
          <DialogTitle className="text-center font-bold py-4 rounded-t-2xl bg-indigo-400 text-zinc-100">
            Lead Tracking — {lead.nombre} {lead.apellido} 
          </DialogTitle>
        </DialogHeader>

        {/* Aquí después colocamos LeadTracking */}
        <LeadTracking lead_id={lead._id} project_name={lead.proyecto}></LeadTracking>
        <DialogFooter className="border-0 m-2">
          <DialogClose
            render={
              <Button variant="outline">
                Cerrar
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}