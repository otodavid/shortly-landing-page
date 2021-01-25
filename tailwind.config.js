module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.js'],
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
          darkViolet: 'rgb(35, 33, 39)',
          lightCyan: 'rgb(157, 218, 218)'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'Roboto', 'sans-serif']
      },
      spacing : {
        18: '4.5rem',
        '31%': '31.5%',
        98: '33rem'
      },
      zIndex: {
        "-1": '-1'
      },
      transitionProperty: {
        left: 'left'
      },
      fontSize: {
        '5.5xl': ['3.5rem', { lineHeight: '1' }],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
