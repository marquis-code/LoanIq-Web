<template>
    <CoreModal :isOpen="isOpen" @close="closeModal">
        <div class="flex justify-center items-center flex-col gap-y-3">
        <img src="@/assets/icons/wallet.svg" class="h-16 w-16" alt="" />
      <h2 class="text-lg font-semibold">Bank Account Details</h2>
      <div class="text-sm text-gray-600">Account Number:</div>
      <div class="flex mt-6 items-center justify-between bg-gray-100 p-2 rounded-md">
        <span class="font-mono">{{ accountNumber }}</span>
        <button
          class="text-blue-500 hover:underline"
          @click="copyToClipboard"
        >
         <img class="h-6 w-6 ml-2" src="@/assets/icons/copy.svg" alt="" />
        </button>
      </div>
      <p v-if="copySuccess" class="text-green-500 text-sm mt-2">Copied!</p>
    </div>
    </CoreModal>
  </template>
  
  <script lang="ts" setup>  
  const props = defineProps({
    isOpen: Boolean,
    accountNumber: String,
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  
  const copySuccess = ref(false);
  
  const copyToClipboard = async () => {
    if (!props.accountNumber) return;
    try {
      await navigator.clipboard.writeText(props.accountNumber);
      copySuccess.value = true;
      setTimeout(() => (copySuccess.value = false), 2000);
    } catch (err) {
      console.error('Failed to copy account number:', err);
    }
  };
  </script>
  