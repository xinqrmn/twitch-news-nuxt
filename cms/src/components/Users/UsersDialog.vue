<script setup lang="ts">
import { UpdateUserDto } from '@/types/user';
import { ref, defineModel, defineProps, watchEffect } from 'vue'

const props = defineProps<{
  userData: UpdateUserDto | null,
}>()

const emit = defineEmits<{
  handleEdit: [data: UpdateUserDto]
}>()

const visible = defineModel<boolean>()

const editData = ref<UpdateUserDto>({})

watchEffect(() => {
  if (props.userData) {
    editData.value = { ...props.userData }
  }
})
</script>

<template>
  <Dialog v-model:visible="visible"  header="Редактировать пользователя" modal>
    <FloatLabel class="flex items-center gap-4 mb-4">
      <label id="loginLabel" for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" v-model="editData.email" autocomplete="off" />
    </FloatLabel>
    <FloatLabel class="flex items-center gap-4 mb-4 login-input">
      <label id="loginLabel" for="password" class="font-semibold w-24">New Password</label>
      <Password
        v-model="editData.password"
        toggleMask
        :feedback="false"
        inputId="password"
        variant="outlined"
      />
    </FloatLabel>
    <FloatLabel class="flex items-center gap-4 mb-4 login-input">
      <label id="loginLabel" for="imageUrl" class="font-semibold w-24">Image URL</label>
      <InputText id="imageUrl" v-model="editData.image_url" class="flex-auto" autocomplete="off" />
    </FloatLabel>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Закрыть"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        type="button"
        label="Сохранить"
        @click="emit('handleEdit', editData)"
      ></Button>
    </div>
  </Dialog>
</template>

<style scoped lang="scss"></style>
