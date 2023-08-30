import { describe, test, expect } from "vitest"
import { setup, fetch } from "@nuxt/test-utils"
import { createClient } from "@supabase/supabase-js"

describe("auth examples", async () => {
  await setup({
    server: true,
    dev: true,
  })

  test("two is two", () => {
    expect(2).toBe(2)
  })

  test("unauthenticated users can create posts", async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_KEY as string
    )

    // Assert that the number of posts increases by one
    let { count: originalCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })

    if (!originalCount) {
      originalCount = 0
    }

    const response = await fetch("/api/posts", { method: "POST" })
    expect(response.status).toEqual(200)

    const { count: newCount } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })

    expect(newCount).toEqual(originalCount + 1)
  })
})
