import type { Config } from "tailwindcss";

const config: Config = {
  content: [
   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",  // Incluindo todas as páginas em src
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Incluindo componentes em src
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Caso haja o diretório src/app
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
