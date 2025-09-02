<script setup lang="ts"></script>

<template>
  <router-view></router-view>
  <Toast
    :pt="{
      summary: 'font-bold',
      messageIcon: 'scale-[90%]',
    }"
  />
</template>

<style scoped></style>
