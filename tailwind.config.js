module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        calcColXL: 'repeat(4, 6rem)',
        calcColSm: 'repeat(4, 3rem)',
      },
      gridTemplateRows: {
        calcRowXL: 'minmax(7rem, auto) repeat(5, 6rem)',
        calcRowSm: 'minmax(7rem, auto) repeat(5, 3rem)',
      },
      colors: {
        primary: '#555b6e',
        secondary: '#89b0ae',
        tertiary: '#bee3db',
        accent1: '#faf9f9',
        accent2: '#ffd6ba',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
