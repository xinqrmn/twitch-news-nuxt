import { mockStreamers } from "../mockStreamers"

export default defineEventHandler((event) => {
  const { name } = getRouterParams(event) as { name: string }

  const streamer = mockStreamers.find((s) => s.name === name)

  if (!streamer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Streamer not found",
    })
  }

  return streamer
})
