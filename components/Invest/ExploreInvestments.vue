<template>
  <div class="pt-6">
    <!-- Title -->
    <h2 class="text-[#687181] text-lg font-medium mb-6">
      Choose an investment product to get started
    </h2>
    <!-- {{ products }} -->

    <!-- Investment Product Cards Grid -->
    <div class="grid grid-cols-1 cursor-pointer sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        @click="router.push(`/dashboard/investments/explore-investments/${product.id}`)"
        v-for="product in processedProducts"
        :key="product.id"
        :class="['p-6 h-44 rounded-lg shadow-sm', product.bgColor]"
      >
        <div class="flex flex-col mb-4">
          <img :src="product.icon" alt="Icon" class="w-8 h-8 mr-2" />
          <h3 class="text-lg font-semibold text-gray-800">
            {{ product.name }}
          </h3>
        </div>
        <p class="text-sm text-gray-700">
          Minimum investment of {{ formatCurrency(product?.minInvestment) }}
        </p>
        <p v-if="product.description" class="text-sm text-gray-500">{{ product.description.length > 70 ? `${product.description.slice(0, 70)}...` : product.description  }}</p>
        <p v-else>Nil</p>
      </div>
    </div>

    <!-- User Profile Badge -->
    <div class="absolute top-6 right-6 flex items-center space-x-2">
      <span
        class="bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold"
        ></span
      >
      <img
        src="https://via.placeholder.com/40"
        alt="User Profile"
        class="w-10 h-10 rounded-full shadow-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import invest1 from "@/assets/icons/flexi-grow.svg";
import invest2 from "@/assets/icons/discount-note.svg";
import invest3 from "@/assets/icons/fixed-investment.svg";
import invest4 from "@/assets/icons/target-savings.svg";

import { ref, computed } from "vue";
import { formatCurrency } from '@/utils/currencyUtils';
const router = useRouter()
// // Utility function to format currency
// function formatCurrency(amount: string) {
//   return new Intl.NumberFormat("en-NG", { style: "decimal" }).format(
//     parseFloat(amount)
//   );
// }

const props = defineProps({
  loading: {
    type: Boolean,
  },
  products: {
    type: Array,
  },
});

// Arrays for icons and background colors
const icons = [invest1, invest2, invest3, invest4];
const bgColors = ["bg-[#E0EBFF]", "bg-[#E0FFE6]", "bg-[#FFE5E5]", "bg-[#FFF1E0]", "bg-[#F1F2F5]"];

// // Sample Data from Backend
// const productsFromBackend = ref([
//   {
//     id: "b7793563-99f3-4cca-be98-ee9bc0b03237",
//     name: "Fixed Investment Note",
//     slug: "fixed-investment-note",
//     description: "Minimum investment of ₦100,000. Minimum tenor of 3 months",
//     minInvestment: "100000.00",
//     interestRate: "23.00",
//     flexible: true,
//     canTopUp: true,
//     canWithdrawEarly: true,
//     preLiquidationFee: "10.00",
//     status: "active",
//   },
//   // Other product data from backend...
// ]);

// Process products to add random icon and background color
const processedProducts = computed(() => {
  return props.products.map((product) => {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    return {
      ...product,
      icon: randomIcon,
      bgColor: randomBgColor,
    };
  });
});
</script>

<style scoped>
/* Ensure Profile Badge Stays at the Top Right */
.absolute {
  position: absolute;
}
</style>
