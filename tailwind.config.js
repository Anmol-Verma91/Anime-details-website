/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      "green": "#53FF86",
      "white": "white",
      "orange": "#ffc233",
      "black": "black",
      "grey": "grey",
      "yellow": "yellow",
      "red" : "red"
    },
    screens: {
      'sm': {max : '500px'},
      // => @media (max-width: 500px) { ... }

      'md':  {max : '768px' },
      // => @media (max-width: 768px) { ... }

      'lg':  {max : '1024px' },
      // => @media (max-width: 1024px) { ... }

      'xl':  {max : '1280px' },
      // => @media (max-width: 1280px) { ... }

      '2xl':  {max : '1536px'},
      // => @media (max-width: 1536px) { ... }
    }
  },
  plugins: [],
}

