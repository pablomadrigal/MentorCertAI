import type React from "react"
import { FormFieldProps } from "@/types/ui"

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="block text-sm font-medium text-text-primary">
                {label}
            </label>
            {children}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    )
} 