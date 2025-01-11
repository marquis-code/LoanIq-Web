<template>
    <CoreModal :isOpen="isOpen" @close="closeModal">
        <div class="flex justify-center items-center flex-col gap-y-3">
            <img src="@/assets/icons/error.svg" class="h-16 w-16" alt="" />
            <h2 class="text-lg font-semibold text-red-500">Transfer Failed</h2>
            <p
                class="text-sm text-center text-gray-600"
            >Unfortunately, your bank transfer could not be completed. Please try again later or contact support if the issue persists.</p>
            <div class="pt-4 w-full">
                <button
                class="mt-4 bg-red-500 w-full text-white px-4 py-3 rounded-md hover:bg-red-600"
                @click="closeModal"
            >Close</button>
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
  