<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebitWallet } from '@/composables/modules/wallet/useDebitWallet'
import { useFetchSavedAccounts } from '@/composables/modules/payment/useFetchSavedAccounts'
import { useMaskAccount } from '@/composables/core/useMaskAccount'
// const showAccountDetails = ref(false);
const showTransferFailed = ref(false);
const showTransferSuccess = ref(false);

const emit = defineEmits(['close'])

// const openAccountDetails = () => (showAccountDetails.value = true);
const openTransferFailed = () => (showTransferFailed.value = true);
const openTransferSuccess = () => (showTransferSuccess.value = true);

const closeModals = () => {
  // showAccountDetails.value = false;
  showTransferFailed.value = false;
  showTransferSuccess.value = false;
  emit('close')
};

// Mock data for demonstration
const { accounts, loading } = useFetchSavedAccounts()
const { maskAccount } = useMaskAccount()
const { debitWallet,
    loading: processing,
    payload,
    setPayload } = useDebitWallet()

interface BeneficiaryAccount {
  id: string
  accountName: string
  accountNumber: string
  bankName: string
  lastFourDigits: string
}

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  }
})


// Transfer Flow States
const amount = ref('')
const selectedBeneficiary = ref<BeneficiaryAccount | null>(null)
const transactionPin = ref('')
const narration = ref('')
// const isProcessing = ref(false)
const currentStep = ref(1)
const totalSteps = 4 // Amount -> Recipient -> PIN -> Narration

const formattedAmount = computed(() => {
  if (!amount.value) return ''
  const numericValue = amount.value.replace(/[^0-9.]/g, '')
  const parsedValue = parseFloat(numericValue)
  if (isNaN(parsedValue)) return ''
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN'
  }).format(parsedValue)
})

const handleAmountInput = async (event: Event) => {
  const input = event.target as HTMLInputElement
  amount.value = input.value.replace(/[^0-9.]/g, '')
}

const selectBeneficiary = (beneficiary: BeneficiaryAccount) => {
  selectedBeneficiary.value = beneficiary
}

const handleTransfer = async () => {
  if (!selectedBeneficiary.value || !amount.value || !transactionPin.value || !narration.value) return

  // isProcessing.value = true
  const payloadObj = ref({
  amount: amount?.value,
  destinationBankCode: selectedBeneficiary?.value?.bankCode,
  destinationBankName: selectedBeneficiary?.value?.bankName,
  destinationAccountNumber: selectedBeneficiary?.value?.accountNumber,
  destinationAccountName: selectedBeneficiary?.value?.accountName,
  narration: narration?.value,
  pin: transactionPin?.value
})
  setPayload(payloadObj.value)
  await debitWallet().then((res) => {
     console.log(res, 'tes  here')
     showTransferSuccess.value = true
  }).catch((err) => {
    showTransferFailed.value = true
    console.log(err, 'tes  here')
  })
  // Simulate API call
  // await new Promise(resolve => setTimeout(resolve, 2000))
  // isProcessing.value = false
  // props.isModalOpen = false
  emit('close')

  // Reset all states
  amount.value = ''
  selectedBeneficiary.value = null
  transactionPin.value = ''
  narration.value = ''
  currentStep.value = 1
}

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
</script>

<template>
  <div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden relative">
        <!-- Header with Back Button and Step Counter -->
        <div class="border-b border-gray-100">
          <div class="flex items-center px-4 py-4">
            <button v-if="currentStep > 1" @click="prevStep" class="p-2 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex-1 text-center">
              <p class="text-sm text-center">Send Money</p>
              <h2 class="text-lg font-semibold">
                {{ `${currentStep} / ${totalSteps} ${currentStep === 1 ? 'Amount' : currentStep === 2 ? 'Recipient' :
                  currentStep === 3 ? 'PIN' : 'Narration'}` }}
              </h2>
            </div>
            <button @click="emit('close')" class="p-2 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="h-1 bg-blue-600 transition-all duration-300"
            :style="{ width: `${(currentStep / totalSteps) * 100}%` }" />
        </div>

        <!-- Body Content -->
        <div class="p-6">
          <!-- Step 1: Amount -->
          <div v-if="currentStep === 1">
            <label class="block text-lg font-semibold mb-4">
              Enter Amount
            </label>
            <div class="relative">
              <span class="absolute left-4 top-6 text-gray-500">₦</span>
              <input type="text" v-model="amount" @input="handleAmountInput"
                class="w-full pl-8 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                placeholder="0.00" />
            </div>
            <p class="mt-2 text-gray-600">{{ formattedAmount }}</p>
          </div>

          <!-- Step 2: Select Beneficiary -->
          <div v-if="currentStep === 2">
            <h2 class="text-lg font-semibold mb-6">Select recipient bank destination</h2>
            <fieldset>
              <legend class="sr-only">Select a Beneficiary</legend>
              <div class="space-y-4">
                <label v-for="(account, idx) in accounts" :key="account.accountNumber"
                  class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  :class="selectedBeneficiary?.accountNumber === account.accountNumber
                    ? 'border-indigo-600 ring-2 ring-indigo-600'
                    : 'border-gray-300'">
                  <input type="radio" class="h-4 w-4 mr-3 sr-only" name="beneficiary" :value="account" v-model="selectedBeneficiary"
                     />
                  <span class="flex flex-1">
                    <span class="flex flex-col">
                      <span class="block text-sm font-medium text-gray-900">{{ account.accountName }}</span>
                      <span class="mt-1 flex items-center text-sm text-gray-500">{{ account.bankName }}</span>
                      <span class="mt-6 text-sm font-medium text-gray-900">{{ maskAccount(account.accountNumber)
                        }}</span>
                    </span>
                  </span>
                  <!-- Green tick if selected -->
                  <svg v-if="selectedBeneficiary?.accountNumber === account.accountNumber" class="absolute top-2 right-2 w-6 h-6 text-indigo-600"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clip-rule="evenodd" />
                  </svg>
                </label>
              </div>
            </fieldset>

          </div>

          <!-- Step 3: Transaction PIN -->
          <div v-if="currentStep === 3">
            <label class="block text-lg font-semibold mb-4">
              Enter Transaction PIN
            </label>
            <input type="password" v-model="transactionPin" maxlength="4"
              class="w-full px-4 py-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              placeholder="Enter 4-digit PIN" />
          </div>

          <!-- Step 4: Narration -->
          <div v-if="currentStep === 4">
            <label class="block text-xl font-semibold mb-4">
              Transaction Narration
            </label>
            <textarea v-model="narration" rows="4"
              class="w-full px-4 py-4 text-lg border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
              placeholder="Enter transaction description"></textarea>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-6 border-t border-gray-100">
          <div class="flex gap-3">
            <button v-if="currentStep > 1" @click="prevStep"
              class="flex-1 py-4 border text-sm border-gray-200 rounded-xl font-medium hover:bg-gray-50">
              Back
            </button>

            <button v-if="currentStep < totalSteps" @click="nextStep" :disabled="(currentStep === 1 && !amount) ||
              (currentStep === 2 && !selectedBeneficiary) ||
              (currentStep === 3 && (!transactionPin || transactionPin.length !== 4))
              "
              class="flex-1 py-4 bg-blue-600 text-sm text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Continue
            </button>
            <button v-else @click="handleTransfer" :disabled="!narration || processing"
              class="flex-1 py-4 bg-blue-600 text-sm text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="processing">Processing...</span>
              <span v-else>Transfer {{ formattedAmount }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <PaymentTransferFailedModal :isOpen="showTransferFailed" @close="closeModals" />
    <PaymentTransferSuccessModal :isOpen="showTransferSuccess" @close="closeModals" />
    <CoreFullScreenLoader
      :visible="processing"
      text="Processing Transfer Transaction..."
      logo="/path-to-your-logo.png"
    />
  </div>
</template>
