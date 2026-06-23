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
        tier: {
          s: "#FF4D4D",
          a: "#FF9F4D",
          b: "#FFDF4D",
          c: "#4DFF91",
          d: "#4D9FFF",
          f: "#C84DFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
