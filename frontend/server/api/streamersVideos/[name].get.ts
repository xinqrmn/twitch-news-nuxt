import { mockStreamersVideos } from '../mockStreamersVideos'

export default defineEventHandler((event) => {
  const { name } = getRouterParams(event) as { name: string }

  const streamerVideos = mockStreamersVideos.find((s) => s.displayName === name)

  if (!streamerVideos) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Streamer not found',
    })
  }

  return streamerVideos
})
