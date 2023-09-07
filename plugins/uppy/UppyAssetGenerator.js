import { UIPlugin } from '@uppy/core'

export default class UppyAssetGenerator extends UIPlugin {
  constructor(uppy, opts) {
    super(uppy, { ...opts })

    this.id = this.opts.id || 'AssetGenerator'
    this.type = 'modifier'

    this.defaultLocale = {
      strings: {
        generatingAssets: 'Generating asset IDs...'
      }
    }

    delete this.opts.success
    delete this.opts.error

    this.i18nInit()
  }

  createNewAsset = async () => {
    const state = this.uppy.getState()
    const meta = state.meta

    if (!meta.user_id) {
      throw new Error('No user ID provided')
    }

    // Create a new asset record and return the ID
    const { data, error } = await $fetch('/api/asset', {
      method: 'POST',
      body: JSON.stringify({
        user_id: meta.user_id
      })
    })

    if (error) {
      throw new Error(error)
    }

    return data
  }

  prepareUpload = async (fileIDs) => {
    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID)

      this.uppy.emit('airlume:generate-asset-id-progress', file, {
        mode: 'indeterminate',
        message: this.i18n('generatingAssets')
      })

      return this.createNewAsset()
        .then((data) => {
          this.uppy.log(`[Asset Generator] File ${file.id} has created asset: ${data.id}`)
          this.uppy.setFileMeta(fileID, { asset_id: data.id })
        })
        .catch((err) => {
          this.uppy.log(`[Asset Generator] Failed to create asset record for ${file.id}:`, 'warning')
          this.uppy.log(err, 'warning')
        })
    })

    const emitPreprocessCompleteForAll = () => {
      fileIDs.forEach((fileID) => {
        const file = this.uppy.getFile(fileID)
        this.uppy.emit('airlume:generate-asset-id-complete', file)
      })
    }

    // Why emit `preprocess-complete` for all files at once, instead of
    // above when each is processed?
    // Because it leads to StatusBar showing a weird “upload 6 files” button,
    // while waiting for all the files to complete pre-processing.
    return Promise.all(promises).then(emitPreprocessCompleteForAll)
  }

  install() {
    this.uppy.addPreProcessor(this.prepareUpload)
  }

  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload)
  }
}
