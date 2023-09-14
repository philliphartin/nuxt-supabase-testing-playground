import UppyAssetGenerator from '@/plugins/uppy/UppyAssetGenerator'
import AwsS3 from '@uppy/aws-s3'
import Uppy, { UppyFile } from '@uppy/core'

import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
export interface Context {
  story_id?: string
  chapter_id?: string
}

export const useUploadStore = defineStore('uploads', () => {
  const processedFiles: Ref<string[]> = ref([])

  const uppy = new Uppy({
    debug: true,
    autoProceed: true,
    onBeforeFileAdded: (currentFile, files) => {
      currentFile.id = uuidv4()
      return true
    }
  })

  uppy.use(UppyAssetGenerator)
  uppy.use(AwsS3, {
    async getUploadParameters(file) {
      return await $fetch('/api/presign-upload', {
        method: 'POST',
        body: JSON.stringify({
          id: file.meta.asset_id,
          type: file.type,
          filename: file.name
        })
      })
        .then((response) => {
          return response
        })
        .catch((error) => {
          return error
        })
    }
  })

  const files = computed(() => {
    return uppy.getState().files
  })

  uppy.on('upload-progress', (file, progress) => {
    if (!file) {
      return
    }

    // FIXME: This is a hack that forces the reactivity to update
    // Long term fix is to create a adaptor for uppy to use the Pinia store directly
    uppy.setFileMeta(file.id, {
      uploadingProgressing: true
    })
  })

  uppy.on('upload-success', async (file, response) => {
    if (!file) {
      return
    }

    console.log('uppy:upload-success', file, response)

    // Record the original file upload
    await $fetch(`/api/original-files`, {
      method: 'POST',
      body: {
        asset_id: file.meta.asset_id,
        name: file.name,
        size: file.size,
        mime: file.type,
        extension: file.extension,
        path: response.uploadURL
      }
    })
  })

  uppy.on('upload-error', (file, error, response) => {
    console.error('uppy:upload-error', file, error, response)
  })

  uppy.on('error', (error) => {
    console.error('uppy:error', error)
  })

  function setUserId(userId: string) {
    uppy.setMeta({ user_id: userId })
  }

  function addFile(file: File, userId: string, context: Context) {
    uppy.addFile({
      name: file.name,
      type: file.type,
      data: file,
      source: 'Local',
      isRemote: false,
      meta: {
        thumbnail: URL.createObjectURL(file),
        user_id: userId,
        ...context
      }
    })
  }

  function removeFile(fileId: string) {
    uppy.removeFile(fileId, 'removed-by-user')
  }

  function retryUpload(fileId: string) {
    uppy.retryUpload(fileId)
  }

  function markAssetFinished(assetId: string) {
    const file: UppyFile | undefined = Array.from(Object.values(files.value)).find((file: UppyFile) => {
      return file.meta.asset_id === assetId
    })

    if (!file) {
      console.warn('Could not find file with asset_id', assetId)
      return
    }

    uppy.setFileMeta(file.id, { isFinished: true })
    processedFiles.value.push(file.id)
  }

  return {
    uppy,
    setUserId,
    processedFiles,
    addFile,
    retryUpload,
    markAssetFinished,
    removeFile,
    files
  }
})
