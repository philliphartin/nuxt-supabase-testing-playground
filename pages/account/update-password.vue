<template>
  <div>
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">Create new password</h1>
    <form class="space-y-4 md:space-y-6" v-if="!isPasswordReset" @submit.prevent="submit">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password">Password</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="password"
          v-model="password"
          type="password"
          name="password"
          placeholder="••••••••"
          autocomplete="new-password"
          required />
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="password">Confirm Password</label>
        <input
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          name="password"
          placeholder="••••••••"
          autocomplete="new-password"
          required />
      </div>

      <button
        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        type="submit"
        :disabled="isSubmitting">
        Reset Password
      </button>
      <FormErrorMessage v-if="errorMessage" :message="errorMessage" />
    </form>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  })

  const router = useRouter()
  const client = useSupabaseClient()
  const password = ref()
  const confirmPassword = ref()
  const errorMessage = ref()
  const isSubmitting = ref(false)
  const isPasswordReset = ref(false)

  const submit = async () => {
    if (password.value == '' || confirmPassword.value == '') {
      errorMessage.value = 'Please enter a password'
      return
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }

    isSubmitting.value = true
    const { data, error } = await client.auth.updateUser({
      password: password.value
    })

    if (error) {
      console.warn(error)
      errorMessage.value = error.message
      return
    }

    isSubmitting.value = false
    isPasswordReset.value = true

    router.push('/')
  }
</script>
