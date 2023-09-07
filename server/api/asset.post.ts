import { SupabaseClient } from '@supabase/supabase-js'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase: SupabaseClient = await serverSupabaseClient(event)

  const { user_id } = await readBody(event)

  const { data, error } = await supabase
    .from('assets')
    .insert({
      user_id: user_id,
      status: 'placeholder'
    })
    .select('id')
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
