<template>
  <nav class="flex p-4 justify-between">
    <NuxtLink to="/upload">Upload</NuxtLink>
    <button @click="logout">Logout</button>
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
