import { User } from "@supabase/supabase-js"

export default defineEventHandler(async (event) => {
  const { user }: { user: User | null } = event.context.auth

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
