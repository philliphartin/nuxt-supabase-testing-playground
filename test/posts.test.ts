import { describe, test, expect, beforeEach, TestContext } from "vitest"
import { setup, fetch } from "@nuxt/test-utils"
import { createClient } from "@supabase/supabase-js"
import { faker } from "@faker-js/faker"

describe("auth examples", async () => {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  )

  await setup({
    server: true,
    dev: true,
  })

  beforeEach(async (context: TestContext) => {
    // Delete all posts before each test
    await supabase.from("posts").delete().neq("content", "")
  })

  test("unauthenticated users can create posts", async () => {
    const content = faker.lorem.paragraph()
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    expect(response.status).toEqual(200)

    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("content", content)

    expect(count).toBe(1)
  })
})
