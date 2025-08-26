// server/api/mockStreamers.ts
export const mockStreamers = [
  {
    name: 'evelone2004',
    displayName: 'Evelone',
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/4af340ba-8d13-44e8-9e72-14c4c86d1f20-profile_image-150x150.png?imenable=1&impolicy=user-profile-picture&imwidth=100',
    isLive: true,
    createdAt: '2020-02-17',
    accountAge: '12',
    language: 'Ru',
    followersOnSite: 12,
    stats: {
      followers: 850000,
      avgViewers: 7721,
      maxViewers: 31222,
      streamedHours: 1500,
    },
    bio: {
      article:
        'Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей',
      description: 'Топовый стример, любит CS2, GTA RP и общение с чатом.',
      country: 'Россия',
      language: 'Ru',
      mainCategory: 'Just Chating',
      createdAt: '2020-02-17',
      accountAge: '6',
    },
    media: [
      { type: 'youtube', url: 'https://youtube.com/...', title: 'Лучший момент' },
      { type: 'clip', url: 'https://twitch.tv/...', title: 'Клип дня' },
    ],
    news: [
      { id: 1, title: 'Evelone выиграл турнир', date: '2025-08-01' },
      { id: 2, title: 'Новый сетап для стримов', date: '2025-07-25' },
    ],
    related: [
      {
        name: 'bratishkinoff',
        logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/ababebac-f06f-40e7-b19c-2436b9311c1a-profile_image-150x150.png?imenable=1&impolicy=user-profile-picture&imwidth=100',
        displayName: 'Братишкин',
      },
      {
        name: 'buster',
        logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/96d66837-22f0-4393-89c5-2e5c2408485b-profile_image-70x70.png',
        displayName: 'Buster',
      },
    ],
  },
  {
    name: 'bratishkinoff',
    displayName: 'Братишкин',
    avatar:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/ababebac-f06f-40e7-b19c-2436b9311c1a-profile_image-150x150.png?imenable=1&impolicy=user-profile-picture&imwidth=100',
    isLive: true,
    createdAt: '2018-05-27',
    accountAge: '7',
    language: 'Ru',
    followersOnSite: 12,
    stats: {
      viewers: 8000,
      followers: 650000,
      subs: 11000,
    },
    bio: {
      article:
        'Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей. Анимешник, филантроп, продастся за пачку пельменей',
      description: 'Смешной стример, много общается с чатом.',
      country: 'Россия',
      language: 'Ru',
      mainCategory: 'Just Chating',
      createdAt: '2020-02-17',
      accountAge: '6',
    },
    media: [{ type: 'youtube', url: 'https://youtube.com/...', title: 'Топовый момент' }],
    news: [{ id: 1, title: 'Братишкин вернулся со стрима IRL', date: '2025-08-05' }],
    related: [
      {
        name: 'evelone2004',
        logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/4af340ba-8d13-44e8-9e72-14c4c86d1f20-profile_image-150x150.png?imenable=1&impolicy=user-profile-picture&imwidth=100',
        displayName: 'Evelone',
      },
      {
        name: 'buster',
        logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/96d66837-22f0-4393-89c5-2e5c2408485b-profile_image-70x70.png',
        displayName: 'Buster',
      },
    ],
  },
]
