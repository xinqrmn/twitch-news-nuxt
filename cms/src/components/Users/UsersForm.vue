<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { CreateUserDto } from '@/types/user'
import { useRolesStore } from '@/stores/roles';

const rolesStore = useRolesStore()

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  submit: [data: CreateUserDto]
  'update:modelValue': [value: boolean]
}>()

const form = ref<CreateUserDto>({
  email: '',
  password: '',
  username: '',
  roles: [],
})

function handleSubmit() {
  emit('submit', form.value)
  emit('update:modelValue', false)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('update:modelValue', false)
}

onMounted(async () => {
  document.addEventListener('keydown', handleEscape)
  await rolesStore.fetchRoles()
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Dialog
    header="Создание пользователя"
    :visible="props.modelValue"
    modal
    style="min-width: 450px"
    @update:visible="emit('update:modelValue', $event)"
  >
    <form class="p-fluid space-y-4" @submit.prevent="handleSubmit">
      <div class="field">
        <label for="email">Email</label>
        <InputText v-model="form.email" id="email" type="email" placeholder="Введите email" />
      </div>

      <div class="field">
        <label for="username">Имя пользователя</label>
        <InputText v-model="form.username" id="username" placeholder="Введите логин" />
      </div>

      <div class="field" id="pass-input">
        <label for="password">Пароль</label>
        <Password
          v-model="form.password"
          toggleMask
          id="password"
          placeholder="Введите пароль"
          feedback
        />
      </div>

      <div class="field">
        <label for="roles">Роли</label>
        <MultiSelect
          v-model="form.roles"
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
          label="Отменить"
          severity="secondary"
          class="p-button-outlined w-28"
          @click="emit('update:modelValue', false)"
        />
        <Button label="Сохранить" class="w-28" @click="handleSubmit" />
      </div>
    </template>
  </Dialog>
</template>

<style lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;

  label {
    font-weight: 600;
  }

  .p-password-input{
    width: 100%;
  }
}
</style>
