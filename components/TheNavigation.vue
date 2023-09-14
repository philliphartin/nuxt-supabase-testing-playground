<template>
  <nav class="flex p-4 justify-between shadow-xl dark:shadow-gray-800 text-gray-800 dark:text-gray-100 dark:bg-gray-700">
    <NuxtLink to="/">Home</NuxtLink>
    <!-- User -->
    <template v-if="user">
      <button @click="logout">Logout as {{ user.email }}</button>
    </template>
  </nav>
</template>
<script setup lang="ts">
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  watch(
    user,
    () => {
      if (!user.value) {
        return navigateTo('/login')
      }
    },
    { immediate: true }
  )

  const logout = () => {
    client.auth.signOut()
  }
</script>
