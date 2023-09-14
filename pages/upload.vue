<template>
  <div class="container mx-auto mt-12">
    <h1 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">Upload Experiments</h1>

    <!-- File Upload -->
    <section class="p-8 bg-gray-100 border border-gray-200 mt-12 rounded-xl">
      <h2 class="font-medium text-xl mb-4">File Select</h2>
      <FileSelect v-if="user" :user-id="user.id" :context="context">
        <button class="bg-gray-200 rounded px-4 py-2 hover:bg-purple-100 hover:shadow-lg hover:shadow-purple-300 transition" type="button">Select Files</button>
      </FileSelect>
    </section>

    <!-- Gallery -->
    <section class="p-8 bg-gray-100 border border-gray-200 mt-12 rounded-xl">
      <h2 class="font-medium text-xl mb-4">Gallery</h2>
      <div>
        <img src="" alt="" />
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
  const user = useSupabaseUser()
  const context = {
    chapter_id: 'chap-1',
    story_id: 'story-2'
  }
</script>
