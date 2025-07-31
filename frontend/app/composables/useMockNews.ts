export const useMockNews = () => {
  return [
    {
      id: 1,
      title: 'Twitch ужесточает борьбу с накруткой просмотров',
      category: 'Статья',
      tags: ['CS2'],
      image: 'images/news/news1.jpg',
      date: '29.07 в 16:48',
      comments: 3,
      views: 2,
    },
    {
      id: 2,
      title: 'Twitch раздаст значок к ZEVENT 25',
      category: 'Новость',
      tags: ['CS2', 'IEM'],
      image: 'images/news/news2.jpg',
      date: '28.07 в 15:00',
      comments: 12,
      views: 10,
    },
    {
      id: 3,
      title: 'Twitch удалил глобальный смайлик GunRun',
      category: 'Новость',
      tags: ['CS2', 'IEM'],
      image: 'images/news/news3.jpg',
      date: '28.07 в 15:00',
      comments: 12,
      views: 10,
    },
    {
      id: 4,
      title: 'Ibai побил мировой рекорд Twitch — 9.300.000 зрителей на «La Velada del Año V»',
      category: 'Новость',
      tags: ['CS2', 'IEM'],
      image: 'images/news/news4.jpg',
      date: '28.07 в 15:00',
      comments: 12,
      views: 10,
    },
  ]
}

const useStrapiNews = async () => {
  const { data, error } = await useFetch('http://localhost:1337/api/news-posts?populate=image')
  console.log(data.value)
  console.log(error.value)
}

useStrapiNews()
