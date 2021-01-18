module.exports = {
  purge: {
    content: ['./public/**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: 'rgb(42, 207, 207)',
          violet: 'rgb(59, 48, 84)'
        },
        secondary: 'rgb(244, 98, 98)',
        neutral: {
          gray: 'rgb(191, 191, 191)',
          grayishViolet: 'rgb(158, 154, 167)',
          blue: 'rgb(53, 50, 62)',
          darkViolet: 'rgb(35, 33, 39)'
        }
      },
      fontFamily: {
        body: ['Poppins']
      },
      spacing : {
        18: '4.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
