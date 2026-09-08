import React, { useEffect, useState } from 'react'
import LeadInsightCard from '../LeadInsightCard'

interface Props {
  lead: any;
  project: any;
}
interface Conversation{
  role:"user"|"assistant"
  content:string 
  timestamp:string
}

interface chatResponse{
  total: number
  page: number 
  page_size: number
  phone: string 
  username: string | null 
  history: Conversation[]
}

export default function LeadAgent({lead,project}:Props) {
  //const summary = lead?.summary;

  //const insights = lead?.insights ?? [];
  const [chat_conversation, setchat_conversation] = useState<Conversation[]>([])
  const [summary, setsummary] = useState("")
  const [insights, setinsights] = useState({}) 
  useEffect(()=>{
    async function getConversation(lead_id:string) {
        try{
          const response=await fetch(`https://${lead_id}`)
          const data:chatResponse =await response.json()
          console.log("GET CONVERSATIONS DATA", data);
          setchat_conversation(data.history)
        }catch(err){
          console.error("error get_covnersations ",err)
        }
    }
    async function getSummary(lead_id:string) {
      try{
        const response=await fetch(`https://${lead_id}`)
        const data = await response.json()
        console.log("Summary Conversation",data)
        setsummary(data)
      }catch(err){
        console.error("Error en getSummary",err)
      }
      
    }
    async function  getInshigtsConversation(lead_id:string) {
      try{
        const response=await fetch(`https://${lead_id}`)
        const data = await response.json()
        console.log("Inshings Conversation",data)
        setinsights(data)
      } catch(err){
        console.error("Hubo un error en getInshigthConversation ",err)
      }     
    }
    getConversation("0001")
    getSummary("0001")
    getInshigtsConversation("0001")
  },[lead._id])
  return (
    <div className="p-2 space-y-5">

      {/* CABECERA */}
      <div className='px-4 py-2'>
        <h3 className="text-lg font-semibold text-slate-800">
          Análisis del ZefiAgent
        </h3>

        <p className="text-sm text-slate-500">
          Análisis generado a partir de la conversación con el lead
        </p>
      </div>

      <div className="flex flex-row h-100 rounded-md bg-white-50 p-2 gap-4 justify-between items-start">

        <div className="flex h-full w-200 flex-col overflow-hidden rounded-xl bg-white shadow-sm ">
        {/* CABECERA */}
      <div className="flex shrink-0 items-center justify-between border-b border-indigo-100 bg-indigo-50 px-5 py-4">

        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
            Z
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              ZefiAgent
            </h3>

            <p className="text-xs text-slate-500">
              Conversación con {lead?.nombre} {lead?.apellido}
            </p>
          </div>

        </div>

        {/* Estado */}
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />

          <span className="text-xs font-medium text-indigo-400">
            IA activa
          </span>
        </div>

      </div>
          {/* Chat */}
        <div className="h-full overflow-y-auto w-200 bg-white-50 p-5">

          {chat_conversation.length === 0 ? (

            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-400">
                No hay conversaciones disponibles.
              </p>
            </div>

          ) : (

            <div className="space-y-4">
              
              {chat_conversation.map((message, index) => (

                <div
                  key={index}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === "user"
                        ? "rounded-tl-sm bg-white border border-slate-200"
                        : "rounded-tr-sm bg-indigo-500 text-white"
                    }`}
                  >

                    <p className="text-sm leading-5">
                      {message.content}
                    </p>

                    <p
                      className={`mt-2 text-[10px] ${
                        message.role === "user"
                          ? "text-slate-400"
                          : "text-indigo-200"
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleString(
                        "es-PE",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>
        </div>
        
        <div className="flex flex-col gap-4 overflow-hidden overflow-y-auto w-100 h-full W-100 justify-between">
          {/* RESUMEN */}
          <section className="rounded-xl border   border-slate-200 h-full bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h4 className="text-base font-semibold text-slate-700">
                Resumen de la conversación
              </h4>

              <p className="mt-1 text-xs text-slate-400">
                Generado por ZefiAgent · actualizado al último mensaje
              </p>
            </div>

            {summary ? (
              <p className="text-sm leading-6 text-slate-600">
                {summary}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                No hay suficiente historial para generar un nuevo resumen.
              </p>
            )}
          </section>

          {/* INSIGHTS */}
          <section className="rounded-xl border h-full W-100 border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4">
              <h4 className="text-base font-semibold text-slate-700">
                Insights del lead
              </h4>

              <p className="mt-1 text-xs text-slate-400">
                Puntos clave extraídos automáticamente de la conversación.
              </p>
            </div>

            {insights.length > 0 ? (

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                {insights.map((insight: any, index: number) => (
                  <LeadInsightCard
                    key={index}
                    title={insight.title}
                    value={insight.value}
                    description={insight.description}
                    icon={insight.icon}
                  />
                ))}

              </div>

            ) : (

              <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center">
                <p className="text-sm text-slate-400">
                  Aún no hay insights disponibles para este lead.
                </p>
              </div>

            )}

          </section>
        </div>
      </div>

      

    </div>
  )
}
