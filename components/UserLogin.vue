<template>
<main>
  <div class="flex flex-col items-center justify-center w-full h-screen">
    <div class="lg:w-[500px] p-4  flex flex-col justify-start items-start">
     <div class="flex justify-start items-start">
      <img src="@/assets/img/logo.png" alt="LoaniQ Logo" class="mx-auto mb-4 w-24" />
     </div>
      <h2 class="text-3xl font-medium text-[#323740] text-center mb-2">Welcome back</h2>
      <p class="text-[#687181] leading-relaxed pb-4">
          Please fill in your information below to access your account.
      </p>
      <form class="w-full space-y-6" @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-[#7D8799] font-medium mb-1 text-sm" for="phone">Enter Your Email Address</label>
          <input type="text" id="email" v-model="credential.email.value" class="w-full px-4 py-4  bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500" />
        </div>
        <div class="mb-4 relative">
       <div class="flex items-center justify-between">
        <label class="block text-[#7D8799] font-medium mb-1 text-sm" for="passcode">Enter Your six-digit passcode</label>
          <div class="text-sm">
            <NuxtLink to="/recover-password" class="font-semibold text-[#2F6D67] hover:text-[#2F6D67]">Forgot password?</NuxtLink>
          </div>
       </div>
          <input :type="showPassword ? 'text' : 'password'" id="passcode" v-model="credential.passcode.value" class="w-full px-4 py-4  bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:outline-none focus:border-green-500" />
          <div
          @click="toggleShowPassword"
          class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer"
        >
          <svg
            v-if="!showPassword"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669"
              stroke="#1D2739"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M12.5 11.25L13.75 13.3333"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.6665 9.16669L18.3332 10.8334"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.6665 10.8334L3.33317 9.16669"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 11.25L6.25 13.3333"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-if="showPassword"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z"
              stroke="#1D2739"
              stroke-width="2"
            />
            <path
              d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z"
              stroke="#1D2739"
              stroke-width="1.5"
            />
          </svg>
        </div>
        </div>
        <div class="pt-6">
          <button :disabled="loading || isFormDisabled" type="submit" class="w-full bg-[#2F6D67] text-white py-3.5 disabled:cursor-not-allowed disabled:opacity-25 rounded-md hover:bg-[#2F6D67] transition">{{loading ? 'processing...' :  'Login'}}</button>
        </div>
      </form>
      <div class="text-center mt-4">
        <p class="text-[#687181] flex gap-x-2">Don't have an account? <NuxtLink to="/signup" class="text-[#2F6D67] hover:underline">Sign up here</NuxtLink> 
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 4.86165L13.3333 10.695L7.5 16.5283" stroke="#2F6D67" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </p>
      </div>
    </div>
  </div>
  <CoreFullScreenLoader
      :visible="loading"
      text="Authenticating..."
      logo="/path-to-your-logo.png"
    />
</main>
  </template>
  
  <script setup lang="ts">
  import { use_auth_login } from '@/composables/auth/login'
  const { credential, login, loading, isFormDisabled } = use_auth_login()
  const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
  const showPassword = ref(false);
  </script>
  