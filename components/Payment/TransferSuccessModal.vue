<template>
    <CoreModal :isOpen="isOpen" @close="closeModal">
        <div class="flex justify-center items-center flex-col gap-y-3">
        <img src="@/assets/icons/success.svg" class="h-16 w-16" alt="" />
      <h2 class="text-lg font-semibold text-green-500">Transfer Successful</h2>
      <p class="text-sm text-gray-600 text-center">
        Your bank transfer was completed successfully. Thank you for using our service!
      </p>

      
   <div class="w-full pt-4">
    <button
        class="mt-4 bg-green-500 text-white px-4 py-3 w-full rounded-md hover:bg-green-600"
        @click="closeModal"
      >
        Close 
      </button>
   </div>
      </div>
    </CoreModal>
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
  