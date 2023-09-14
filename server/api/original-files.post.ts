import { serverSupabaseClient } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient

export default defineEventHandler(async (event) => {
  supabase = await serverSupabaseClient(event)

  const { asset_id, name, size, mime, extension, path } = await readBody(event)

  const asset = await getAsset(asset_id)

  const data = await recordOriginalFileDetails(asset.user_id, asset_id, name, size, mime, extension, path)

  await updateAsset(asset_id, name, size, mime, extension)

  return { data }
})

async function getAsset(id: string) {
  return (await supabase.from('assets').select('*').eq('id', id).single()).data
}

async function recordOriginalFileDetails(user_id: string, asset_id: string, name: string, size: number, mime: string, extension: string, path: string) {
  // Record the asset file information
  const { data, error } = await supabase
    .from('asset_files')
    .insert({
      asset_id: asset_id,
      user_id: user_id,
      type: 'original',
      name: name,
      size: size,
      mime: mime,
      extension: extension,
      path: path
    })
    .select('*')
    .single()

  if (error) {
    throw createError({
      message: error.message,
      status: 500,
      data: { error: error.details }
    })
  }

  return data
}

async function updateAsset(asset_id: string, name: string, size: number, mime: string, extension: string) {
  // Update the asset reference
  const { error } = await supabase
    .from('assets')
    .update({
      status: 'queued'
    })
    .eq('id', asset_id)
    .select('*')
    .single()

  if (error) {
    throw createError({
      message: error.message,
      status: 500,
      data: { error: error.details }
    })
  }
}
