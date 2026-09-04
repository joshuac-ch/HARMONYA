import React from 'react'

interface Props {
  title: string;
  description?: string;
  value?: string;
  icon?: string;
}

export default function LeadInsightCard({title,
  description,
  value,
  icon,}:Props) {
  return (
    <div className="rounded-xl border border-indigo-100 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon ?? "✦"}
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-slate-700">
            {title}
          </h4>

          {value && (
            <p className="mt-1 text-sm font-medium text-indigo-600">
              {value}
            </p>
          )}

          {description && (
            <p className="mt-1 text-sm leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}
