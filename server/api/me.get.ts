import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server"
import { User } from "@supabase/supabase-js"
import { SupabaseClient } from "@supabase/supabase-js"

export default defineEventHandler(async (event) => {
  const client: SupabaseClient = await serverSupabaseClient(event)

  // Get the user from the request
  let user: User | null = null
  try {
    user = await serverSupabaseUser(event)
  } catch (e) {}

  if (!user) {
    throw createError({
      statusMessage: "Unauthorised. Please log in.",
      statusCode: 401,
      data: { error: "Unauthorised. Please log in." },
    })
  }

  return {
    id: user.id,
  }
})
