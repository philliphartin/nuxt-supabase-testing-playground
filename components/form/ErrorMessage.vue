<template>
  <div class="mt-4 rounded-lg border border-red-500 bg-red-50 px-3 py-1.5 text-lg text-red-700">
    {{ message }}
  </div>
</template>
<script setup>
  const props = defineProps({
    message: {
      type: String
    }
  })
</script>
