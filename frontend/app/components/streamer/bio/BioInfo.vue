<template>
  <div class="info-item">
    <UIcon :name="icon" class="info-icon" />
    <span class="info-label">{{ text }}</span>
    <span class="info-value">{{ props.data.payload }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IBioData } from '~/types/streamer'

const props = defineProps<{
  data: IBioData
}>()

const icon = ref('')
const text = ref('')

onBeforeMount(() => {
  switch (props.data.type) {
    case 'birthday':
      icon.value = 'mdi:calendar'
      text.value = 'День рождения:'
      break
    case 'game':
      icon.value = 'mdi:gamepad-variant'
      text.value = 'Основная игра:'
      break
    case 'city':
      icon.value = 'mdi:city-variant-outline'
      text.value = 'Город проживания:'
      break
    case 'country':
      icon.value = 'mdi:map-marker'
      text.value = 'Страна:'
      break
    case 'weight':
      icon.value = 'mdi:weight-kilogram'
      text.value = 'Вес:'
      break
    case 'height':
      icon.value = 'mdi:human-male-height-variant'
      text.value = 'Рост:'
      break

    default:
      break
  }
})
</script>

<style scoped lang="scss">
.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  color: #6b7280;
  width: 1.25rem;
  height: 1.25rem;
}

.info-label {
  font-weight: 500;
  min-width: 140px;
}

.info-value {
  color: #374151;

  .dark & {
    color: #d1d5db;
  }
}
</style>
