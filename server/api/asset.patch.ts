import { serverSupabaseClient } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const supabase: SupabaseClient = await serverSupabaseClient(event)

  const { id, name, size, mime, ext } = await readBody(event)

  const { data, error } = await supabase
    .from('assets')
    .update({
      name: name,
      size: size,
      mime: mime,
      ext: ext,
      status: 'placeholder'
    })
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw createError({
      message: error.message,
      status: 500,
      data: { error: error.details }
    })
  }

  return { data }
})
