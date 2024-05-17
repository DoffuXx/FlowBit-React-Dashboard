/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      primaryColor: "#1f2241",
      secondaryColor: "#da0232",
    },
    extend: {
      backgroundImage: {
        "login-background": "url('https://mm-j.be/img/bg/home.jpg')",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
