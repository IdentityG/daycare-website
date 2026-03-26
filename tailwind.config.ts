import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kid: {
          // Primary Text & Dark Elements (Replaces slate-900)
          primary: "#0F172A", 
          
          // Vibrant Accents (High Contrast)
          pink: "#EC4899",   // Vibrant Pink
          purple: "#8B5CF6", // Deep Purple
          blue: "#3B82F6",   // Bright Blue
          yellow: "#F59E0B", // Warm Amber/Yellow
          green: "#10B981",  // Emerald Green
          
          // Pastel Backgrounds (For badges, soft backgrounds)
          "bg-pink": "#FCE7F3",
          "bg-blue": "#DBEAFE",
          "bg-yellow": "#FEF3C7",
          "bg-green": "#D1FAE5",
        }
      },
      fontFamily: {
        sans: ['var(--font-fredoka)'],
      }
    },
  },
  plugins: [],
};
export default config;