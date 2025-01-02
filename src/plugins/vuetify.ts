/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify, type ThemeDefinition} from 'vuetify'

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#fff',
    readable: '#000',
    primary: '#BB8E65',
    secondary: '#0478A6',
    accent: '#f6a720',
    success: '#92c83e',
    backgroundGrey: '#EEEEEE',
  }
}
const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#121212',
    readable: '#fff',
    primary: '#BB8E65',
    secondary: '#0478A6',
    accent: '#f6a720',
    success: '#92c83e',
    backgroundGrey: '#424242',
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
      dark,
    }
  },
})
