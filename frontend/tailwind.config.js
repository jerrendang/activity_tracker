/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '960px',
      'lg': '1024px'
    },
    colors: {
      'green': '#607274',
      'brown': '#B2A59B',
      'skyBlue': '#E0F4FF',
      'lightBlue': '#87C4FF',
      'blue': '#a0deff', // (160,222,255)
      'cream': '#FFEED9',
      'darkRed': '#801336',
      'red': '#C72C41',
      'orange': '#EE4540',
      'white': '#FCF5ED',
    },
    extend: {},
    fontSize: {
      'title': '2.1em',
      'label': '.80em',
      'text': '.75em'
    }
  },
  plugins: [],
}

// #2D132C
// #801336
// #C72C41
// #EE4540
