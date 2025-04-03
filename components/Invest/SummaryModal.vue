<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg max-w-md w-full space-y-6">
        <button @click="$emit('close')" class="absolute top-2 right-2 text-red-500 text-xl">&times;</button>
        <h2 class="text-xl font-semibold">Investment Summary</h2>
        <p class="text-gray-600">This investment offers the best of both worlds by combining liquidity and attractive returns on investment.</p>
  
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500">Investment amount</p>
            <p class="font-semibold">₦{{ amount }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Investment type</p>
            <p class="font-semibold">{{ investmentName }}</p>
          </div>
        </div>
  
        <!-- Benefits -->
        <div>
          <h3 class="font-semibold">Benefits</h3>
          <div class="grid grid-cols-2 gap-4">
            <p class="text-sm text-gray-600 flex items-center"><i class="fas fa-check-circle text-red-500 mr-2"></i>No lock-in period</p>
            <p class="text-sm text-gray-600 flex items-center"><i class="fas fa-check-circle text-red-500 mr-2"></i>Interest is calculated daily</p>
            <p class="text-sm text-gray-600 flex items-center"><i class="fas fa-check-circle text-red-500 mr-2"></i>No early liquidation penalty</p>
            <p class="text-sm text-gray-600 flex items-center"><i class="fas fa-check-circle text-red-500 mr-2"></i>Minimum balance of N10,000</p>
          </div>
        </div>
  
        <div class="flex justify-between items-center">
          <button @click="$emit('close')" class="text-green-600">Make changes</button>
          <button @click="completeOrder" class="bg-green-500 text-white px-4 py-2 rounded">Complete order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    investmentName: String,
    amount: Number
  });
  const emit = defineEmits(['close']);
  
  function completeOrder() {
    emit('close');
  }
  </script>
  