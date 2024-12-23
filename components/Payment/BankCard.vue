<template>
  <div class="w-full max-w-lg py-4 space-y-3">
    <!-- Display the list of accounts or the add bank account form based on query parameter -->
    <div v-if="!isAddingAccount" class="space-y-3">
      <div class="">
          <button
            @click="goToAddAccount"
            class="text-sm py-2.5 outline-none border-none px-6 bg-teal-700 text-white rounded-lg border"
          >
           Add new account
          </button>
        </div>
      <div
        v-if="!loading && accounts?.length"
        v-for="(account, index) in accountsWithColors"
        :key="index"
        class="relative p-6 rounded-lg h-44 text-white"
        :class="account.bgColor"
      >
        <div class="flex flex-col space-y-2">
          <p class="text-xl font-semibold">
            {{ account?.accountName || "Nil" }}
          </p>
          <p class="text-base">{{ account?.accountNumber || "Nil" }}</p>
          <p class="text-base">{{ account?.bankName || "Nil" }}</p>
        </div>
        <div class="absolute bottom-0 right-0 opacity-20">
          <div
            class="w-32 h-32 rounded-full"
            :class="account.circleClass"
          ></div>
        </div>
        <div class="absolute bottom-2 right-2 opacity-20">
          <div
            class="w-20 h-20 rounded-full"
            :class="account.circleClass"
          ></div>
        </div>
      </div>
      <section
        class="w-full rounded-lg max-w-lg"
        v-else-if="loading && !accounts.length"
      >
        <div
          class="rounded-md h-24 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"
        ></div>
      </section>
      <div
        v-else
        class="border rounded-lg py-10 flex justify-center items-center gap-y-3 flex-col border-gray-50 w-full"
      >
        <img src="@/assets/img/empty-state.png" class="h-20 w-20" />
        <h2 class="text-gray-800 text-sm">No transactions available</h2>
      </div>
      <div>
        <!-- <h2 class="text-lg font-semibold mb-4 text-center">Add bank account</h2> -->
        <!-- <div class="flex justify-center">
          <button
            @click="goToAddAccount"
            class="text-sm py-2.5 outline-none border-none px-6 bg-teal-700 text-white rounded-lg border"
          >
           Add new account
          </button>
        </div> -->
      </div>
    </div>

    <!-- Add Bank Account Form -->
    <div v-else>
      <button @click="router.back()">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="4" fill="#EEEFF2" />
          <path
            d="M19 23L12 16L19 9"
            stroke="#323740"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div class="flex items-center my-4">
        <button @click="goBack" class="text-gray-500">
          <i class="fa fa-arrow-left"></i>
        </button>
        <h2 class="text-lg font-semibold ml-2">Add bank account</h2>
      </div>

      <form @submit.prevent="submitAccountForm" class="space-y-4">
    <!-- Account Number Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Account Number</label>
      <input
        v-model="accountNumber"
        type="text"
        class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
        placeholder="Enter account number"
        @input="validateAccountNumber"
      />
      <p v-if="accountValidationError" class="text-red-500 text-xs">{{ accountValidationError }}</p>
    </div>

    <!-- Bank Selection Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Your Bank</label>
      <!-- <select
        v-if="!fetchingBankList && isAccountValid"
        v-model="selectedBank"
        class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
        :disabled="!isAccountValid"
      > -->
      <select
        v-if="!fetchingBankList"
        v-model="selectedBank"
        :disabled="accountNumber?.length < 10"
        class="w-full border border-gray-300 disabled:cursor-not-allowed disabled:opacity-25 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
      >
        <option value="" disabled>Select bank</option>
        <option v-for="item in banksList" :key="item.bankCode" :value="item.bankCode">
          {{ item.bankName }}
        </option>
      </select>

      <!-- Loading spinner while fetching bank list -->
      <div v-else class="rounded-md h-10 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"></div>
    </div>

    <!-- Account Holder Name Preview -->
    <div v-if="accountObj?.accountName" class="bg-green-100 text-sm text-green-700 px-4 py-3 rounded-lg">
      {{  accountObj?.accountName }}
    </div>

    <!-- Password Field -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Your Password</label>
      <div class="relative">
        <input
          v-model="password"
          type="password"
          class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
          placeholder="**********"
        />
        <button
          type="button"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          @click="togglePasswordVisibility"
        >
          <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </button>
      </div>
    </div>

    <p class="text-gray-600 text-sm">
      LoaniQ apply for a loan today, hassle free, with very low interest rate. 
      <a href="#" class="text-red-500">Learn more</a>
    </p>

    <!-- Submit Button -->
    <button
      type="submit"
      class="w-full py-3.5 bg-teal-700 disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-md transition"
      :disabled="!isFormValid || processing"
    >
    {{ processing ? 'processing...' : 'Add bank account' }}
    </button>
  </form>

      <!-- <form @submit.prevent="submitAccountForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Account Number</label
          >
          <input
            v-model="accountNumber"
            type="text"
            class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
            placeholder="Enter account number"
            @blur="validateAccountNumber"
          />
          <p v-if="accountValidationError" class="text-red-500 text-xs">
            {{ accountValidationError }}
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Your Bank</label
          >
          <select
            v-if="!fetchingBankList"
            v-model="selectedBank"
            class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
          >
            <option value="" disabled>Select bank</option>
            <option
              v-for="item in banksList"
              :key="item.bankCode"
              :value="item.bankCode"
            >
              {{ item.bankName }}
            </option>
          </select>
          <div
            v-else
            class="rounded-md h-10 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"
          ></div>
        </div>

        <div
          v-if="accountHolderName"
          class="bg-green-100 text-green-700 px-4 py-2 rounded-lg"
        >
          {{ accountHolderName }}
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Your Password</label
          >
          <div class="relative">
            <input
              v-model="password"
              type="password"
              class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
              placeholder="**********"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
            </button>
          </div>
        </div>

        <p class="text-gray-600 text-sm">
          LoaniQ apply for a loan today, hassle free, with very low interest
          rate.
          <a href="#" class="text-red-500">Learn more</a>
        </p>

        <button
          type="submit"
          class="w-full py-3.5 bg-teal-700 text-white rounded-md transition"
          :disabled="!isFormValid || processing"
        >
          Add bank account <i class="fa fa-plus ml-1"></i>
        </button>
      </form> -->

      <!-- <form @submit.prevent="submitAccountForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              v-model="accountNumber"
              type="text"
             class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
              placeholder=""
            />
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Your Bank</label>
            <select
              v-model="selectedBank"
              class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
            >
              <option value="" disabled>Select bank</option>
              <option v-for="item in banksList" :key="item.bankCode" :value="item.bankCode">{{ item.bankName }}</option>
            </select>
          </div>
  
          <div v-if="accountHolderName" class="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
            {{ accountHolderName }}
          </div>
  
          <div>
            <label class="block text-sm font-medium text-gray-700">Your Password</label>
            <div class="relative">
              <input
                v-model="password"
                type="password"
                class="w-full border border-gray-300 rounded-md py-3.5 bg-gray-50 text-sm border-none outline-none px-3"
                placeholder="**********"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                @click="togglePasswordVisibility"
              >
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </button>
            </div>
          </div>
  
          <p class="text-gray-600 text-sm">
            LoaniQ apply for a loan today, hassle free, with very low interest rate. 
            <a href="#" class="text-red-500">Learn more</a>
          </p>
  
          <button
            type="submit"
            class="w-full py-3.5 bg-teal-700 text-white rounded-md 0 transition"
          >
            Add bank account <i class="fa fa-plus ml-1"></i>
          </button>
        </form> -->
    </div>
  </div>

  <CoreFullScreenLoader
      :visible="resolving"
      text="Please wait while we resolve your account number.."
      logo="/path-to-your-logo.png"
    />
</template>

<script setup lang="ts">
import { useResolveAccountNumber } from "@/composables/modules/wallet/useResolveAccountNumber";
import { useAddBankAccount } from "@/composables/modules/payment/useAddBankAccount";
import { useFetchBankList } from "@/composables/modules/wallet/useFetchBankList";
import { useFetchSavedAccounts } from "@/composables/modules/payment/useFetchSavedAccounts";
const { accounts, loading } = useFetchSavedAccounts();
const {
  addBankAccount,
  loading: processing,
  payload,
  setPayload,
} = useAddBankAccount();
const { banksList, loading: fetchingBankList } = useFetchBankList();
const {
  resolveAccountNumber,
  loading: resolving,
  accountObj,
} = useResolveAccountNumber();
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

// Define an array of possible colors
const colorOptions = [
  { bgColor: "bg-teal-700", circleClass: "bg-teal-600" },
  // { bgColor: "bg-rose-500", circleClass: "bg-rose-400" },
  // { bgColor: "bg-blue-500", circleClass: "bg-blue-400" },
  // { bgColor: "bg-green-500", circleClass: "bg-green-400" },
  // { bgColor: "bg-yellow-500", circleClass: "bg-yellow-400" },
];

// Function to assign random colors
const assignRandomColors = (accounts) => {
  return accounts.map((account) => {
    const randomColor =
      colorOptions[Math.floor(Math.random() * colorOptions.length)];
    return {
      ...account,
      bgColor: randomColor.bgColor,
      circleClass: randomColor.circleClass,
    };
  });
};

// Computed accounts with random colors assigned
const accountsWithColors = computed(() => {
  if (accounts.value) {
    return assignRandomColors(accounts.value);
  }
  return [];
});

const accountNumber = ref<string>("");
const selectedBank = ref<string>("");
const accountHolderName = ref<string>("Chinedu Ndukife");
const password = ref<string>("");
const showPassword = ref<boolean>(false);
const accountValidationError = ref<string>("");

const router = useRouter();
const route = useRoute();

const isAddingAccount = computed(() => route.query.adding === "true");

function goToAddAccount() {
  router.push({ query: { ...route.query, adding: "true" } });
}

function goBack() {
  router.push({ query: { adding: null } });
}

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

// Function to validate account number
const validateAccountNumber = async () => {
  if (accountNumber.value.length < 10) {
    accountValidationError.value = "Invalid account number";
    accountHolderName.value = "";
    return;
  }
  accountValidationError.value = ''; // Clear error if valid
};


// Watch for changes in the selected bank and call resolveAccountNumber
watch([accountNumber, selectedBank], async ([newAccountNumber, newBank]) => {
  // Only call resolveAndPreviewAccount when both accountNumber and selectedBank are valid
  if (newAccountNumber.length >= 10 && newBank) {
    await resolveAndPreviewAccount();
  }
});

// Function to resolve the account number and fetch account holder's name
const resolveAndPreviewAccount = async () => {
  accountValidationError.value = ""; // Reset validation error if account is valid
  try {
    // Show loading spinner
     await resolveAccountNumber(selectedBank.value, accountNumber.value);
    if (Object.keys(accountObj?.value).length) {
      accountHolderName.value = accountObj?.value.accountName
    } else {
      accountValidationError.value = "Account number is not valid";
      accountHolderName.value = "";
    }
  } catch (error) {
    accountValidationError.value = "Failed to resolve account number";
    accountHolderName.value = "";
  }
};




// Check if form is valid
const isFormValid = computed(() => {
  return (
    accountNumber.value &&
    selectedBank.value && 
    password.value &&
    !accountValidationError.value
  );
});

const computedBankName = computed(() => {
  return banksList.value.find((item) => item.bankCode === accountObj?.value?.bankCode)
})

// Submit the account form
const submitAccountForm = async () => {
  processing.value = true;
  const payload = {
    accountNumber: accountNumber?.value || accountObj?.value?.accountNumber,
    accountName: accountObj?.value?.accountName,
    bankCode: selectedBank.value || accountObj?.value?.bankCode,
    bankName: computedBankName?.value?.bankName,
    password: password.value,
  };

  setPayload(payload);
  await addBankAccount();
};
</script>
