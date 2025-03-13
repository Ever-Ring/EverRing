import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#DC2626",
        "mint-50": "#F1FAF6",
        "mint-100": "#EAF8F2",
        "mint-200": "#D4F0E3",
        "mint-300": "#A8E0C5",
        "mint-400": "#73CFA5",
        "mint-500": "#68BA95",
        "mint-600": "#34B17B",
        "mint-700": "#178055",
        "mint-800": "#20654C",
        "mint-900": "#144B38",
        "mint-950": "#0A2F23",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
