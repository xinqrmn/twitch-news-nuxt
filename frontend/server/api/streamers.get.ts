export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const days = query.days || 7
  const region = query.region || 227
  const page = query.page || 1
  const sortColumn = query.sortColumn || 3
  const sortDirection = query.sortDirection || 'desc'
  const offset = query.offset || 0
  const limit = query.limit || 10

  const url = `https://sullygnome.com/api/tables/channeltables/getchannels/${days}/${region}/${page}/${sortColumn}/${sortDirection}/${offset}/${limit}`
  // https://sullygnome.com/api/tables/channeltables/getchannels/7(Это за сколько дней)/227(это ру регион)/1(1 страница серверной пагинации)/3/desc/0/10(сколько показывать)

  const data = await $fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0', // важен для некоторых API
    },
  })

  return data
})
