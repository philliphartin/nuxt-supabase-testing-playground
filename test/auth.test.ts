import { describe, test, expect } from "vitest"
import { fetch, setup } from "@nuxt/test-utils"
import { createClient } from "@supabase/supabase-js"
import { faker } from "@faker-js/faker"

describe("auth examples", async () => {
  await setup({
    server: true,
  })
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  )

  test("unauthenticated users can access the ping endpoint", async () => {
    const response = await fetch("/api/ping", { method: "GET" })
    expect(response.status).toEqual(200)
    response.json().then((data) => {
      expect(data).toEqual({ ping: "pong" })
    })
  })

  test("me endpoint requires auth", async () => {
    const response = await fetch("/api/me", { method: "GET" })
    expect(response.status).toEqual(401)
    response.json().then((data) => {
      expect(data.message).toEqual("Unauthorised. Please log in.")
      expect(data.data).toEqual({ error: "Unauthorised. Please log in." })
    })
  })

  test("authenticated users can view their own profie", async () => {
    // Note: In a perfect world, I would have a test util to create a test user, which returns their data that I can use to authenticate with and also make assertions with.
    // Right now I'm attempting to manually creating a user in the database, and then using the returned access token to authenticate with the API.
    const authResponse = await supabase.auth.signUp({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    const response = await fetch("/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authResponse.data.session?.access_token}`,
      },
    })

    expect(response.status).toEqual(200)
    response.json().then((data) => {
      expect(data.id).toEqual(authResponse.data.user?.id)
    })
  })
})
