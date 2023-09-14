<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">Sign in to your account</h1>
    <form class="space-y-4 md:space-y-6" v-if="!resetPasswordEmailSent" @submit.prevent="submit">
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

      <button
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="submit"
        :disabled="isSubmitting">
        Reset Password
      </button>
      <FormErrorMessage v-if="errorMessage" :message="errorMessage" />

      <p class="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <NuxtLink class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/register">Sign up</NuxtLink>
      </p>
    </form>
    <div class="mt-4 rounded-lg border border-blue-500 bg-blue-50 px-3 py-1.5 text-lg text-blue-700" v-if="resetPasswordEmailSent">
      Check your email for a link to reset your password.
    </div>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  })

  const client = useSupabaseClient()
  const email = ref()
  const errorMessage = ref()
  const isSubmitting = ref(false)
  const resetPasswordEmailSent = ref(false)

  const submit = async () => {
    isSubmitting.value = true
    const { error } = await client.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/login`
    })

    if (error) {
      console.warn(error)
      errorMessage.value = error.message
      return
    }

    isSubmitting.value = false
    resetPasswordEmailSent.value = true
  }
</script>
