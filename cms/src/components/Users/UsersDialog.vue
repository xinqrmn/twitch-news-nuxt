<script setup lang="ts">
import { UpdateUserDto } from '@/types/user'
import { useRolesStore } from '@/stores/roles'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps<{
  userData: UpdateUserDto | null
}>()

const emit = defineEmits<{
  handleEdit: [data: UpdateUserDto]
  close
}>()

const rolesStore = useRolesStore()

const visible = defineModel<boolean>()

const editData = ref<UpdateUserDto>({})

watchEffect(() => {
  if (props.userData) {
    editData.value = { ...props.userData }
  }
})

function handleSubmit() {
  emit('handleEdit', editData.value)
  visible.value = false
}

onMounted(async () => {
  await rolesStore.fetchRoles()
})
</script>

<template>
  <Dialog
    v-model:visible="visible"
    header="Редактировать пользователя"
    modal
    style="min-width: 450px"
  >
    <form class="p-fluid" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="email">Email</label>
        <InputText id="email" v-model="editData.email" autocomplete="off" required />
      </div>

      <div class="field">
        <label for="password">Новый пароль</label>
        <Password
          v-model="editData.password"
          toggleMask
          :feedback="false"
          inputId="password"
          class="w-full"
        />
      </div>

      <div class="field">
        <label for="imageUrl">Image URL</label>
        <InputText id="imageUrl" v-model="editData.image_url" autocomplete="off" />
      </div>

      <div class="field">
        <label for="roles">Роли</label>
        <MultiSelect
          v-model="editData.roles"
          id="roles"
          :options="rolesStore.roles"
          optionLabel="cyrillic"
          optionValue="name"
          :showToggleAll="false"
          :loading="rolesStore.loading"
          placeholder="Выберите одну или несколько ролей"
          display="chip"
        />
      </div>
    </form>

    <template #footer>
      <div class="flex gap-2 justify-end w-full">
        <Button
          label="Закрыть"
          severity="secondary"
          class="p-button-outlined w-28"
          @click="emit('close')"
        />
        <Button label="Сохранить" class="w-28" @click="handleSubmit" />
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-weight: 500;
  }
}
</style>
