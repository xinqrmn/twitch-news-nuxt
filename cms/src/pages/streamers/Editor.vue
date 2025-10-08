<script setup lang="ts">
import { ref } from 'vue'

const bio = ref('')
const birthday = ref<Date | Date[]>()
const mainGame = ref('')
const weight = ref<number | null>(null)
const country = ref('')
const city = ref('')
const height = ref<number | null>(null)

const gallery = ref<string[]>([])
const socials = ref<{ type: string; url: string }[]>([
  { type: 'twitch', url: '' },
  { type: 'telegram', url: '' },
  { type: 'instagram', url: '' },
])
</script>

<template>
  <Card class="streamer-editor">
    <template #title>
      <div class="flex gap-4 items-center">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/4af340ba-8d13-44e8-9e72-14c4c86d1f20-profile_image-150x150.png?imenable=1&impolicy=user-profile-picture&imwidth=100"
          class="block object-cover w-16 h-16 rounded-sm"
          alt="streamer logo"
        />
        <div class="flex flex-col">
          <p class="text-sm text-gray-400">evelone2004</p>
          <p class="text-3xl">Evelone</p>
        </div>
      </div>
    </template>
    <template #content>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Основная информация</Tab>
          <Tab value="1">О себе</Tab>
          <Tab value="2">Фото</Tab>
          <Tab value="3">Соцсети</Tab>
          <Tab value="4">Новости</Tab>
        </TabList>

        <TabPanels>
          <TabPanel value="0">
            <div class="field">
              <label>Дата рождения</label>
              <DatePicker class="w-full" v-model="birthday" dateFormat="dd.mm.yy" showIcon />
            </div>
            <div class="field">
              <label>Основная игра</label>
              <InputText v-model="mainGame" />
            </div>
            <div class="field">
              <label>Вес (кг)</label>
              <InputNumber class="w-full" v-model="weight" />
            </div>
            <div class="field">
              <label>Страна</label>
              <InputText v-model="country" />
            </div>
            <div class="field">
              <label>Город</label>
              <InputText v-model="city" />
            </div>
            <div class="field">
              <label>Рост (см)</label>
              <InputNumber class="w-full" v-model="height" />
            </div>
          </TabPanel>

          <TabPanel value="1">
            <Textarea
              v-model="bio"
              class="w-full"
              rows="6"
              autoResize
              placeholder="Введите описание..."
            />
          </TabPanel>

          <TabPanel value="2">
            <div v-for="(_, idx) in gallery" :key="idx" class="field">
              <InputText v-model="gallery[idx]" placeholder="Ссылка на фото" />
              <Button icon="pi pi-times" severity="danger" @click="gallery.splice(idx, 1)" />
            </div>
            <Button
              label="Добавить фото"
              variant="text"
              class="block w-full"
              icon="pi pi-plus"
              @click="gallery.push('')"
            />
          </TabPanel>

          <TabPanel value="3">
            <div v-for="(s, idx) in socials" :key="idx" class="field">
              <Dropdown
                v-model="socials[idx].type"
                :options="['telegram', 'steam', 'twitch', 'instagram', 'kick', 'tiktok', 'vk']"
              />
              <InputText v-model="socials[idx].url" placeholder="https://..." />
              <Button icon="pi pi-times" severity="danger" @click="socials.splice(idx, 1)" />
            </div>
            <Button
              label="Добавить соцсеть"
              icon="pi pi-plus"
              @click="socials.push({ type: 'vk', url: '' })"
            />
          </TabPanel>

          <TabPanel value="4">
            <p class="mb-2">Здесь можно будет прикреплять или создавать новости (TODO)</p>
            <p class="mb-4 text-sm text-red-500">
              Чтобы увидеть здесь новости связанные с стримером, указываете в тегах displayName
              (например: Evelone а не evelone2004)
            </p>
            <Button label="Добавить новость" icon="pi pi-plus" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </template>
    <template #footer>
      <Button>Сохранить</Button>
    </template>
  </Card>
</template>

<style lang="scss">
.streamer-editor {
  .field {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    label {
      min-width: 150px;
      font-weight: 600;
    }

    input,
    textarea,
    .p-dropdown {
      flex: 1;
    }
  }

  .p-tabpanel {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
