import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // mode: 'spa',
  head: {
    titleTemplate: "%s | PDFEzy",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      { name: "robots", content: "index, follow" },
      {
        hid: "description",
        name: "description",
        content: "Convert, edit, compress, and manage your PDF files online",
      },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:site_name", property: "og:site_name", content: "PDFEzy" },
      { hid: "og:title", property: "og:title", content: "PDFEzy - PDF Tools" },
      {
        hid: "og:description",
        property: "og:description",
        content: "Convert, edit, compress, and manage your PDF files online",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      { hid: "twitter:site", name: "twitter:site", content: "@pdfezy" },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "PDFEzy - PDF Tools",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: "Convert, edit, compress, and manage your PDF files online",
      },
      // { charset: 'utf-8' },
      // { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      // { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      // { name: 'description', content: 'PDFden.com - Free Online PDF Tools - Merge, Split, Compress, and More!' }
    ],
    link: [
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.io" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon.io" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/favicon.io" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Satisfy&family=Shadows+Into+Light&family=Alex+Brush&family=Allura&family=Handlee&family=Kristi&family=La+Belle+Aurore&family=Marck+Script&family=Reenie+Beanie&family=Zeyada&display=swap",
      },
    ],
  },
  loading: {
    color: "#0000ff", // Change this to the desired color
    height: "2px", // Optionally, you can adjust the height of the progress bar
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "~/assets/scss/material-dashboard.scss",
    "~/assets/css/scrollbar.css",
    "~/assets/fonts/fonts.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-drawing-canvas.js", ssr: false },
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/rating.js", ssr: false },
    { src: "~/plugins/vuelidate.js", mode: "client" },
    { src: "~/plugins/crypto.js", mode: "client" },
    { src: "~/plugins/vue-radial.js", mode: "client" },
    "~/plugins/vue-material.js",
    "~/plugins/axios.js",
    "~/plugins/socket.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  store: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  //   // https://go.nuxtjs.dev/vuetify
  //   "@nuxtjs/vuetify",
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-sweetalert2",
    "@nuxtjs/google-gtag",
  ],

  "google-gtag": {
    id: "G-XDB3D6VRLS", // Replace with your Google Analytics ID
    debug: true, // Enables debug mode
    pageTrackerScreenviewEnabled: true, // Enables tracking of page views
  },

  axios: {
    baseURL: "https://api.pdfden.com/api",
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: "https://api.pdfden.com/api",
    },
  },
  // vuetify: {
  //   customVariables: ["~/assets/variables.scss"],
  //   theme: {
  //     dark: true,
  //     themes: {
  //       dark: {
  //         primary: colors.blue.darken2,
  //         accent: colors.grey.darken3,
  //         secondary: colors.amber.darken3,
  //         info: colors.teal.lighten1,
  //         warning: colors.amber.base,
  //         error: colors.deepOrange.accent4,
  //         success: colors.green.accent3,
  //       },
  //     },
  //   },
  // },
  build: {},
};
