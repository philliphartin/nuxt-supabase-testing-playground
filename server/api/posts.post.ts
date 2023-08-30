import { SupabaseClient } from "@supabase/supabase-js"

import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase: SupabaseClient = await serverSupabaseClient(event)

  const { data, error } = await supabase
    .from("posts")
    .insert({ content: "Hello world!" })
    .select()

  if (error) {
    throw createError({
      message: error.message,
      status: 500,
      data: { error: error.details },
    })
  }

  return { data }
})
