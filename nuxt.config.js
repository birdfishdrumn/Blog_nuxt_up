// ここから追加
// const config = require("./.contentful.json");
require('dotenv').config()
// const contentful = require("contentful");
// ここまで追加
const client = require("./plugins/contentful").default;

// const client = contentful.createClient({
//   space: config.CTF_SPACE_ID,
//   accessToken: config.CTF_CDA_ACCESS_TOKEN

// });

module.exports = {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  generate: {
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: "work"
        }),
        client.getEntries({ // 追記
          content_type: 'category'
        })
      ]).then(([works, categories]) => { // 追記
        return [
          ...works.items.map((work) => {
            return {
              route: `works/${work.fields.slug}`,
              payload: work
            }
          }),
          ...categories.items.map((category) => { // 追記
            return {
              route: `categories/${category.fields.slug}`,
              payload: category
            }
          })
        ]
      })
    }
  },

  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [{
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico"
    }]
  },
  /*
   ** Global CSS
   */
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    "../assets/css/main.css",
    "../assets/sass/main.scss" // ここを追加

  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    "plugins/contentful",
    "plugins/vuetify",
    'plugins/components',
    {
      src: '~plugins/font-awesome',
      ssr: false
    }

  ],
  axios: {},
  /*

   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/tailwindcss"],
  /*
   ** Nuxt.js modules
   */

  env: {

    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000', // 追記
    SITE_NAME: "動物古今東西", // 追記
    TWITTER_ACCOUNT: "maruyosi_fuurin",
  },
  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/axios",
    "@nuxtjs/eslint-module",
    "@nuxtjs/dotenv",
    'nuxt-fontawesome'
  ],
  fontawesome: {
    component: 'fa'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  router: {
    middleware: ["getContentful", "getCategories"]
  },
  build: {}
};
