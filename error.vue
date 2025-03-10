<template>
  <CoreError />
   </template>
   
   <script setup>
   useHead(() => ({
    status: 404,
    title: "Page not found",
   }));

   definePageMeta({
        layout: "error",
        });
   </script>