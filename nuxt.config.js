import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vendor',
    title: 'vendor',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    {
      rel: "stylesheet",
      href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap',
    },],
    
  },
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vuex-persist', ssr: false },
    //  '~/plugins/firebase',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/firebase',
  ],

  firebase: {
    // options
    config: {
      apiKey: 'AIzaSyAiVp2qbQhCVb1WhCv11Kcs9yD1C36q_Hs',
      authDomain: 'htmlfoods-63ed2.firebaseapp.com',
      projectId: 'htmlfoods-63ed2',
      storageBucket: 'htmlfoods-63ed2.appspot.com',
      messagingSenderId: '574123000003',
      appId: '1:574123000003:web:53c290b8c5ef130731e276',
      measurementId: 'G-NHX3NGWHS3',
    },
    services: {
      auth: false, // Just as example. Can be any other service.
      storage: true
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  },
  privateRuntimeConfig: {
    myPrivateToken: process.env.BASE_URL,
  },
}
