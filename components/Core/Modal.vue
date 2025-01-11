<template>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 space-y-4 relative"
      >
        <button
          class="absolute top-2 right-2 border rounded-full shadow bg-white p-1 text-gray-500 hover:text-gray-700"
          @click="closeModal"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  defineProps({
    isOpen: Boolean,
  });
  
  const emit = defineEmits(['close']);
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  /* Optional additional styles */
  </style>
  