<script setup lang="ts">
import { UAvatar } from '#components'
import type { TableColumn } from '@nuxt/ui'

interface IData {
  id: number
  name: string
  points: number
  image: string
  position: number
}

const props = defineProps<{ data: IData[] }>()
const tableStyles = {
  td: 'py-2 text-center',
  th: 'text-center',
  thead: 'border-b-3 border-solid border-twitch-400',
}
const tableColumns: TableColumn<IData>[] = [
  {
    accessorKey: 'position',
    header: '#',
    cell: ({ row }) => `${row.getValue('position')}`,
  },
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          src: row.original.image,
          size: 'lg',
        }),
        h('div', undefined, [h('p', { class: 'font-medium text-highlighted' }, row.original.name)]),
      ])
    },
  },
  {
    accessorKey: 'points',
    header: 'Поинты',
    cell: ({ row }) => `${row.getValue('points')}`,
  },
]
// const sortedArr = [...props.data].sort((a, b) => b.points - a.points)
//#, name, points
</script>

<template>
  <UTable :data="props.data" :columns="tableColumns" :ui="tableStyles"></UTable>
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
        color: $color-primary;
      }
    }
  }
}
</style>
