<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface IData {
  id: number
  name: string
  points: number
}

const props = defineProps<{data: IData[]}>()

const sortedArr = [...props.data].sort((a, b) => b.points - a.points)

</script>

<template>
  <Table>
    <TableHeader>
      <TableRow
      class="table__row"
      >
        <TableHead>#</TableHead>
        <TableHead>Лого</TableHead>
        <TableHead>Имя</TableHead>
        <TableHead>Поинты</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow
        v-for="(item, index) in sortedArr"
        :key="item.id"
        class="table__row"
      >
        <TableCell class="table__pos">{{ index + 1 }}</TableCell>
        <TableCell class="table__image">
          <NuxtLink :to="`https://www.twitch.tv/${item.name}`" target="_blank">
            <img
              :src="`/images/streamers/${(item.name.toLowerCase()).replaceAll(' ', '')}.png`"
              :alt="`${item.name} logo`"
            />
          </NuxtLink>
        </TableCell>
        <TableCell class="table__name">
          <NuxtLink :to="`https://www.twitch.tv/${item.name}`" target="_blank">
            {{ item.name }}
          </NuxtLink>
        </TableCell>
        <TableCell class="table__points">{{ item.points }}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>


<style lang="scss" scoped>

.table {
  &__row {
    transition: background 0.2s ease;
    //cursor: pointer;

    &:hover {
      background-color: $color-background-main; // Замените на нужный цвет
    }
  }

  &__image {
    img {
      display: block;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  &__name,
  &__points,
  &__pos {
    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        //text-decoration: underline;
        color: $color-background-primary;
      }
    }
  }
}

</style>