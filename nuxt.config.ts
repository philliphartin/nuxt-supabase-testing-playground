// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-vitest'],

  runtimeConfig: {
    private: {
      awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
      awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      awsDefaultRegion: process.env.AWS_DEFAULT_REGION,
      awsBucket: process.env.AWS_BUCKET,
      awsUsePathStyleEndpoint: process.env.AWS_USE_PATH_STYLE_ENDPOINT
    }
  },

  supabase: {
    clientOptions: {
      auth: {
        flowType: 'implicit' // TODO: As of 2023-09-07, the PCKE flow does not allow autoconfirm email on registration. So we need to use implicit flow for now.
      }
    },
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register']
    }
  }
})
