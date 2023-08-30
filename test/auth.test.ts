import { describe, test, expect } from "vitest"
import { setup, fetch } from "@nuxt/test-utils"

describe("auth examples", async () => {
  await setup({
    server: true,
    dev: true,
  })

  test("one is one", () => {
    expect(1).toBe(1)
  })

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
    describe.todo("Unimplemented")
  })
})
