<template>
  <div class="flex min-h-screen flex-col">
    <!-- Navigation -->
    <nav class="grid grid-flow-col p-4 md:grid-cols-3 md:p-6 flex-end">
      <button @click="logout">Logout</button>
    </nav>

    <!-- Main -->
    <main class="flex-1" v-if="user">Hi {{ user.email }}</main>
  </div>
</template>
<script setup lang="ts">
  const client = useSupabaseClient()
  const user = useSupabaseUser()

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
