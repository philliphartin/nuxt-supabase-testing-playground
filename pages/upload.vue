<template>
  <div>
    Let's upload some schtuff!
    <template v-if="user">
      <FileSelect :user-id="user.id" :context="context">
        <button type="button">Upload</button>
      </FileSelect>
    </template>
  </div>
</template>
<script setup lang="ts">
  const user = useSupabaseUser()
  const context = {
    chapter_id: 'chap-1',
    story_id: 'story-2'
  }
</script>
