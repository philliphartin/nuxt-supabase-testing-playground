<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">Sign in to your account</h1>
    <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">Your email</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="email"
          v-model="email"
          type="email"
          name="email"
          placeholder="name@email.com"
          autocomplete="email"
          required />
      </div>
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password">Password</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="••••••••"
          autocomplete="current-password"
          required />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              id="remember"
              aria-describedby="remember"
              type="checkbox" />
          </div>
          <div class="ml-3 text-sm">
            <label class="text-gray-500 dark:text-gray-300" for="remember">Remember me</label>
          </div>
        </div>
        <NuxtLink class="text-sm font-medium hover:underline text-gray-500 dark:text-gray-400" href="/forgot-password">Forgot password?</NuxtLink>
      </div>
      <button
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="submit"
        :disabled="isSubmitting">
        Sign in
      </button>
      <FormErrorMessage v-if="errorMessage" :message="errorMessage" />
      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <NuxtLink class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/register">Sign up</NuxtLink>
      </p>
    </form>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  })

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  const email = ref()
  const password = ref()
  const isSubmitting = ref(false)
  const errorMessage = ref()

  watch(
    user,
    () => {
      if (user.value) {
        return navigateTo('/')
      }
    },
    { immediate: true }
  )

  const submit = async () => {
    isSubmitting.value = true

    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    isSubmitting.value = false

    if (error) {
      console.warn(error)
      errorMessage.value = error.message
      return
    }
  }
</script>
