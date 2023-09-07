// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', 'nuxt-vitest'],
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
