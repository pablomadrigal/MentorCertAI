import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: "class",
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
          DEFAULT: "#1E2A38",
          foreground: "#f8fafc",
          main: "#1E2A38",
          light: "#38bdf8",
          dark: "#0f172a",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          foreground: "#f8fafc",
          main: "#7B61FF",
          light: "#9D89FF",
          dark: "#2A1A67",
        },
        accent: {
          DEFAULT: "#3DDC97",
          foreground: "#0f172a",
          main: "#3DDC97",
          light: "#65E5AF",
          dark: "#2AB77A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#334155",
          foreground: "#cbd5e1",
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
        success: "#3DDC97",
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
        "gradient-primary": "linear-gradient(to right, #0f172a, #1E2A38, #38bdf8)",
        "gradient-secondary": "linear-gradient(to right, #2A1A67, #7B61FF, #9D89FF)",
        "gradient-accent": "linear-gradient(to right, #2AB77A, #3DDC97, #65E5AF)",
        "gradient-mixed": "linear-gradient(to right, #1E2A38, #7B61FF, #3DDC97)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config 