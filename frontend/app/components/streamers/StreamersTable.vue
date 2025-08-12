<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { StreamersData } from '~/composables/useTwitchAnalytics'

console.log(StreamersData)
// logo
// displayName
// followers
// followersGained
// streamedMinutes
// maxViewers
// avgViewers
// twitchUrl

// https://sullygnome.com/api/tables/channeltables/getchannels/7(Это за сколько дней)/227(это ру регион)/1(1 страница серверной пагинации)/3/desc/0/10(сколько показывать)
</script>

<template>
  <div class="main-content">
    <div class="class streamers__inner">
      <h2 class="title">Топ Стримеров</h2>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="10"> 10 </SelectItem>
            <SelectItem value="25"> 25 </SelectItem>
            <SelectItem value="50"> 50 </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead class="min-w-12">Лого</TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Сабы всего</TableHead>
          <TableHead>Сабы за 7 дней</TableHead>
          <TableHead>Время в потоке</TableHead>
          <TableHead>Max зрителей</TableHead>
          <TableHead>Avg зрителей</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(streamer, index) in StreamersData" :key="streamer.displayName">
          <TableCell>{{ index + 1 }}</TableCell>
          <TableCell>
            <img :src="streamer.logo" :alt="`${streamer.displayName + 'logo'}`" />
          </TableCell>
          <TableCell>{{ streamer.displayName }}</TableCell>
          <TableCell>{{ streamer.followers }}</TableCell>
          <TableCell>{{ streamer.followersGained }}</TableCell>
          <TableCell>{{ streamer.streamedMinutes }}</TableCell>
          <TableCell>{{ streamer.maxViewers }}</TableCell>
          <TableCell>{{ streamer.avgViewers }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination class="mt-4">
      <PaginationContent>
        <PaginationPrevious />

        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>
        <PaginationItem>1</PaginationItem>

        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>

<style scoped lang="scss">
.streamers {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1rem;
  }
}

table {
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }

  tbody,
  thead {
    tr {
      color: #fff;
      transition: all 0.2s;

      &:nth-child(odd) {
        background-color: rgba($color-background-primary, 0);
      }

      &:nth-child(even) {
        background-color: rgba($color-background-primary, 0);
      }

      &:hover {
        background-color: rgba($color-background-primary, 0.4);
        color: #fff;
      }
    }
  }

  thead tr th {
    color: #fff;
  }
}
</style>
