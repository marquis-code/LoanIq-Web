export default {
  ssr: false,
  app: {
    errorHandler: '~/layouts/error.vue',
    head: {
      title: "LoanIQ",
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0",
        },
      ],
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
    pageTransition: false,
  },
  // Alternatively, for finer control, you can disable loading indicators and other settings:
  loading: false,
  loadingIndicator: false, // Completely removes the default Nuxt loading screen

  modules: ["@nuxtjs/tailwindcss"],
  css: ["/assets/css/main.css", '@/assets/css/fonts.css'],

  tailwindcss: {
    cssPath: "@/assets/css/main.css",
  },
  axios: {
    // Axios options here
    timeout: 10000, // Example: set timeout to 10 seconds
  },

  // buildModules: [
  //   '@nuxtjs/moment'
  // ]
  // alias: {
  // 	'@': '/'
  // },
  plugins: [],

  compatibilityDate: "2024-10-30",
};