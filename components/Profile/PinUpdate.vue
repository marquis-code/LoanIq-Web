<template>
    <div class="max-w-md mt-8">
      <!-- Update Your Pin Section -->
      <section class="mb-8">
        <h2 class="text- font-medium text-gray-700 mb-4">Update your pin</h2>
        <form @submit.prevent="savePin">
          <div class="space-y-4">
            <div>
              <label for="otpCode" class="text-gray-600 text-sm">OTP Code</label>
              <div class="flex items-center gap-x-3 mt-2">
                <input
                  v-for="(value, index) in otpCode"
                  :key="'otp-' + index"
                  type="password"
                  class="pin-input"
                  v-model="otpCode[index]"
                  maxlength="1"
                  inputmode="numeric"
                  @input="moveToNext(index, otpCode)"
                  :ref="(el) => otpCodeRefs[index] = el"
                  :disabled="processing" 
                />
              </div>
            </div>
            <div>
              <label for="newPin" class="text-gray-600 text-sm">New Pin</label>
              <div class="flex items-center gap-x-3 mt-2">
                <input
                  v-for="(value, index) in newPin"
                  :key="'new-' + index"
                  type="password"
                  class="pin-input"
                  v-model="newPin[index]"
                  maxlength="1"
                  inputmode="numeric"
                  @input="moveToNext(index, newPin)"
                  :ref="(el) => newPinRefs[index] = el"
                />
              </div>
            </div>
            <div>
              <label for="repeatNewPin" class="text-gray-600 text-sm">Repeat New Pin</label>
              <div class="flex items-center gap-x-3 mt-2">
                <input
                  v-for="(value, index) in repeatNewPin"
                  :key="'repeat-' + index"
                  type="password"
                  class="pin-input"
                  v-model="repeatNewPin[index]"
                  maxlength="1"
                  inputmode="numeric"
                  @input="moveToNext(index, repeatNewPin)"
                  :ref="(el) => repeatNewPinRefs[index] = el"
                />
              </div>
            </div>
          </div>
  
          <p class="text-sm text-gray-500 mt-2">
            Forgot your pin? 
            <button
              :disabled="processing"
              @click="forgotTransactionPin"
              class="text-[#2F6D67] disabled:cursor-not-allowed disabled:opacity-25"
            >
              {{ processing ? 'processing...' : 'Reset it now' }}
            </button>
          </p>
          <button
            :disabled="!isFormValid || loading"
            type="submit"
            class="mt-4 disabled:cursor-not-allowed disabled:opacity-25 text-sm px-4 py-2 bg-[#2F6D67] text-white rounded-md"
          >
            {{ loading ? 'processing..' : 'Save changes' }}
          </button>
        </form>
      </section>
  
      <!-- Login with Biometrics Section -->
      <section>
        <h2 class="text- font-medium text-gray-700 mb-4">Login with biometrics</h2>
        <!-- Biometric login details (not changed) -->
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useForgotTransactionPin } from '@/composables/auth/forgotPin';
  import { useResetPin } from '@/composables/modules/profile/resetTransactionPin';
  
  const { resetTransactionPin, loading, setPayload } = useResetPin();
  const { forgotTransactionPin, loading: processing } = useForgotTransactionPin();
  
  const otpCode = ref(['', '', '', '']);
  const newPin = ref(['', '', '', '']);
  const repeatNewPin = ref(['', '', '', '']);
  const isFaceIdEnabled = ref(false);
  const isTouchIdEnabled = ref(false);
  
  // Ref arrays to access the individual input elements
  const otpCodeRefs = ref([]);
  const newPinRefs = ref([]);
  const repeatNewPinRefs = ref([]);
  
  // Check if the form is valid (all required fields are filled)
  const isFormValid = computed(() => {
    return (
      otpCode.value.every((digit) => digit !== '') &&
      newPin.value.every((digit) => digit !== '') &&
      repeatNewPin.value.every((digit) => digit !== '')
    );
  });
  
  // Function to automatically move to the next input when a digit is entered
  const moveToNext = (index: number, pinArray: any[]) => {
    // If the current field is filled and it's not the last one, move focus to the next input
    if (pinArray[index] !== '' && index < pinArray.length - 1) {
      const nextField = pinArray === otpCode.value
        ? otpCodeRefs.value[index + 1]
        : pinArray === newPin.value
        ? newPinRefs.value[index + 1]
        : repeatNewPinRefs.value[index + 1];
      nextField?.focus();
    }
  };
  
  // Save the pin (when the form is valid)
  const savePin = () => {
    const otpCodeInfo = otpCode.value.join('');
    const newPinCodeInfo = newPin.value.join('');
    const payload = {
      otp: otpCodeInfo,
      newPin: newPinCodeInfo,
    };
  
    setPayload(payload);
    resetTransactionPin();
  };
  </script>
  
  <style scoped>
  .pin-input {
    @apply w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-green-500;
  }
  
  .toggle-checkbox {
    @apply relative inline-block w-10 h-6 rounded-full border-2 transition-colors cursor-pointer;
    background-color: var(--tw-bg-opacity, 1) #e5e7eb; /* Light gray for off state */
    border-color: transparent;
  }
  
  .toggle-checkbox:checked {
    background-color: var(--tw-bg-opacity, 1) #10b981; /* Green for on state */
  }
  </style>
  