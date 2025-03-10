<template>
    <div class="error-page bg-red-500">
      <CoreError  v-if="error.statusCode === 404" />
      <h1 v-else>Something Went Wrong</h1>
      <p>{{ error.message }}</p>
      <NuxtLink to="/">Go Back Home OK please</NuxtLink>
    </div>
  </template>
  
  <script setup>
  defineProps(['error'])
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    padding: 50px;
  }
  h1 {
    color: red;
  }
  </style>
  