<template>
  <div @click="openFileSelection">
    <slot></slot>
    <input class="hidden" v-on:change="handleFileSelection" type="file" ref="fileInput" :accept="supportedFormats.join(',')" multiple hidden />
  </div>
</template>

<script setup lang="ts">
  import { useUploadStore, Context } from '@/store/upload'

  interface Props {
    userId: string
    context?: Context
    supportedFormats?: string[]
  }

  const props = withDefaults(defineProps<Props>(), {
    supportedFormats: () => ['.png', '.jpg', '.jpeg', '.mp4', '.mov']
  })

  const uploadStore = useUploadStore()

  // FIXME: Find a way to call setUserId automatically on auth events
  // Set the user id for the upload store
  uploadStore.setUserId(props.userId)

  const fileInput = ref()

  const openFileSelection = () => {
    fileInput.value.click()
  }

  const handleFileSelection = (event: Event) => {
    const eventTarget = event.target as HTMLInputElement
    const fileList = eventTarget.files
    if (!fileList) return

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      try {
        uploadStore.addFile(file, props.userId, { ...props.context })
      } catch (err) {
        console.error(err)
      }
    }
  }
</script>
