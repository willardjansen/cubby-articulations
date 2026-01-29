import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cubby: {
          pink: '#E91E8C',
          purple: '#9B4DCA',
          dark: '#12101a',
          card: '#1a1825',
        }
      },
    },
  },
  plugins: [],
};
export default config;
