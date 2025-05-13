import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0f172a",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#1e3a8a",
          foreground: "#f8fafc",
          main: "#1e3a8a",
          light: "#38bdf8",
          dark: "#0f172a",
        },
        secondary: {
          DEFAULT: "#f97316",
          foreground: "#f8fafc",
          main: "#f97316",
          light: "#fb923c",
          dark: "#c2410c",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#334155",
          foreground: "#cbd5e1",
        },
        accent: {
          DEFAULT: "#38bdf8",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "#1e293b",
          foreground: "#f8fafc",
        },
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
        success: "#10b981",
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          disabled: "#64748b",
        },
        surface: {
          DEFAULT: "#1e293b",
          lighter: "#334155",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #0f172a, #1e3a8a, #38bdf8)",
        "gradient-secondary": "linear-gradient(to right, #c2410c, #f97316, #fb923c)",
        "gradient-mixed": "linear-gradient(to right, #1e3a8a, #38bdf8, #f97316)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
