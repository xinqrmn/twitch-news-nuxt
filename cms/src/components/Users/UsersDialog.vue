<script setup lang="ts">

</script>

<template>
  <Dialog v-model:visible="editVisible" header="Редактировать пользователя" modal>
    <FloatLabel class="flex items-center gap-4 mb-4">
      <label id="loginLabel" for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" v-model="editInfo.email" autocomplete="off" />
    </FloatLabel>
    <FloatLabel class="flex items-center gap-4 mb-4 login-input">
      <label id="loginLabel" for="password" class="font-semibold w-24">New Password</label>
      <Password
        v-model="editInfo.password"
        toggleMask
        :feedback="false"
        inputId="password"
        variant="outlined"
      />
    </FloatLabel>
    <FloatLabel class="flex items-center gap-4 mb-4 login-input">
      <label id="loginLabel" for="imageUrl" class="font-semibold w-24">Image URL</label>
      <InputText
        id="imageUrl"
        v-model="editInfo.image_url"
        class="flex-auto"
        autocomplete="off"
      />
    </FloatLabel>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Закрыть"
        severity="secondary"
        @click="
            () => {
              editVisible = false
              editInfo = {}
            }
          "
      ></Button>
      <Button type="button" label="Сохранить" @click="authStore.handleEdit(editInfo)"></Button>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">

</style>