<template>
  <div v-if="user">Hi {{ user.email }}</div>
</template>
<script setup lang="ts">
  const user = useSupabaseUser()
</script>
