import type React from "react"

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  )
}
