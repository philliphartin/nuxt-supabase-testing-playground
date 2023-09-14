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
      <div class="flex flex-wrap">
        <div class="flex flex-col border bg-gray-200" v-for="file in files">
          <img class="w-24 h-24" :src="'/api/file/' + file.asset_id" :alt="file.path" />
          <span>{{ file.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
  import { RealtimeChannel, User } from '@supabase/supabase-js'
  const user = useSupabaseUser() as Ref<User>
  const client = useSupabaseClient()
  const context = {
    chapter_id: 'chap-1',
    story_id: 'story-2'
  }

  let subscriptions: RealtimeChannel[] = []

  const { data: files, refresh: refreshFiles } = await useAsyncData(async () => {
    const { data, error } = await client.from('asset_files').select('asset_id, name, path').eq('user_id', user.value.id)

    if (error) {
      console.error(error)
      return []
    }

    return data
  })

  function subscribeToFiles() {
    subscriptions.push(
      client
        .channel('any')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'asset_files', filter: `user_id=eq.${user.value?.id}` }, (payload) => {
          refreshFiles()
        })
        .subscribe()
    )
  }

  onMounted(() => {
    // subscribeToFiles()
  })

  onUnmounted(() => {
    subscriptions.forEach((subscription) => {
      subscription.unsubscribe()
    })
  })
</script>
