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
                {lead.nivel && (
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${lead.nivel}`}>
                    {lead.nivel}
                </span>
                )}
            </header>

            <p className="mt-1 text-sm text-slate-600">{lead.proyecto}</p>

            <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-500">
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5">{lead.canal_origen}</span>
                <span className="rounded-md bg-slate-50 px-1.5 py-0.5">{lead.medio_captacion}</span>
            </div>

            <a href={`tel:${lead.celular}`} className="mt-2 block text-sm font-medium text-indigo-600 hover:text-indigo-700">
                {lead.celular}
            </a>

            <footer className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
                <span className="truncate">
                {lead.agente_asignado ?? "Sin personal asignado"}
                </span>
                <span className="shrink-0">{new Date(lead.fecha_ingreso).toDateString()} · {new Date(lead.hora_ingreso).getTime()}</span>
            </footer>
        </article>
        }
      />

      <DialogContent className="sm:max-w-7xl bg-white">
        <DialogHeader>
          <DialogTitle>
            Lead Tracking — {lead.nombre} {lead.apellido} 
          </DialogTitle>
        </DialogHeader>

        {/* Aquí después colocamos LeadTracking */}
        <LeadTracking lead_id={lead._id} project_name={lead.proyecto}></LeadTracking>
        <DialogFooter>
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