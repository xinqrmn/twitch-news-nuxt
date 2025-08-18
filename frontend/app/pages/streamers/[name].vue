<script setup lang="ts">
import Header from '~/components/streamer/Header.vue'
import Stats from '~/components/streamer/Stats.vue'
// import Bio from '~/components/streamer/Bio.vue'
// import Media from '~/components/streamer/Media.vue'
// import News from '~/components/streamer/News.vue'
// import Related from '~/components/streamer/Related.vue'

const route = useRoute()
const name = route.params.name as string

useHead({
  title: 'TwitchNews | ' + name,
})

const { data: streamer } = await useFetch(`/api/streamers/${name}`)
</script>

<template>
    <section class="col-span-full">
      <Header :streamer="streamer"></Header>
      <Stats :stats="streamer!.stats"></Stats>
      <!--    <Bio :bio="streamer.bio"></Bio>-->
      <!--    <Related :related="streamer.related"></Related>-->
      <!--    <News :news="streamer.news"></News>-->
    </section>
</template>

<style scoped lang="scss">
.main {
  &-left,
  &-right {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
