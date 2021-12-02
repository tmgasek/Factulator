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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
