import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { SupabaseClient, User } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  // If the request is not an API request, skip this middleware
  if (!event.path.startsWith('/api')) {
    return
  }

  let user: User | null
  try {
    user = await serverSupabaseUser(event)
  } catch (e) {
    user = null
  }

  // If unable to get the user from the request, try to get it from the token
  if (!user) {
    // Get the token from the headers
    const bearerToken = getRequestHeader(event, 'Authorization')

    if (bearerToken) {
      const jwt = bearerToken.replace('Bearer ', '')
      const serviceClient: SupabaseClient = await serverSupabaseServiceRole(event)
      const { data, error: tokenError } = await serviceClient.auth.getUser(jwt)
      if (tokenError) console.warn('Unable to get user from token')
      user = data?.user || null
    }
  }

  // Set the user on the event context, which can be accessed later on any endpoint
  event.context.auth = { user }
})
