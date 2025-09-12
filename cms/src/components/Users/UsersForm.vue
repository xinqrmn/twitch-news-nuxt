<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { CreateUserDto } from '@/types/user'

const emit = defineEmits<{
  (e: 'submit', data: CreateUserDto): void
  (e: 'close'): void
}>()

const form = ref<CreateUserDto>({
  email: '',
  password: '',
  username: '',
  roles: [],
})

function handleSubmit() {
  emit('submit', form.value)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Dialog header="User Form" visible modal>
    <div class="p-fluid">
      <div class="field">
        <label>Email</label>
        <InputText v-model="form.email" />
      </div>
      <div class="field">
        <label>Username</label>
        <InputText v-model="form.username" />
      </div>
      <div class="field">
        <label>Password</label>
        <Password v-model="form.password" toggleMask />
      </div>
      <div class="field">
        <label>Roles</label>
        <MultiSelect v-model="form.roles" :options="['admin','user']" />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" severity="secondary" @click="emit('close')" />
      <Button label="Save" @click="handleSubmit" />
    </template>
  </Dialog>
</template>
