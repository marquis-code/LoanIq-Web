<template>
  <main
    class="bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7] min-h-screen lg:p-6"
  >
    <div class="p-2 md:p-2 space-y-10 bg-white max-w-xl rounded-lg relative">
      <div class="flex items-center py-20 justify-center">
        <div
          class="bg-[#EDFFF0] py-20 rounded-lg p-8 text-center max-w-sm w-full"
        >
          <!-- Success Icon -->
          <div class="flex items-center justify-center mb-4">
            <div class="">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M31.3351 17.2748C34.5504 17.0182 37.6029 15.7538 40.0579 13.6617C45.7869 8.77944 54.2131 8.77944 59.9421 13.6617C62.3971 15.7538 65.4496 17.0182 68.6649 17.2748C76.1682 17.8735 82.1264 23.8318 82.7252 31.3351C82.9818 34.5504 84.2462 37.6029 86.3383 40.0579C91.2206 45.7869 91.2206 54.2131 86.3383 59.9421C84.2462 62.3971 82.9818 65.4496 82.7252 68.6649C82.1264 76.1682 76.1682 82.1264 68.6649 82.7252C65.4496 82.9818 62.3971 84.2462 59.9421 86.3383C54.2131 91.2206 45.7869 91.2206 40.0579 86.3383C37.6029 84.2462 34.5504 82.9818 31.3351 82.7252C23.8318 82.1264 17.8735 76.1682 17.2748 68.6649C17.0182 65.4496 15.7538 62.3971 13.6617 59.9421C8.77944 54.2131 8.77944 45.7869 13.6617 40.0579C15.7538 37.6029 17.0182 34.5504 17.2748 31.3351C17.8735 23.8318 23.8318 17.8735 31.3351 17.2748ZM68.5355 43.5355C70.4882 41.5829 70.4882 38.4171 68.5355 36.4645C66.5829 34.5118 63.4171 34.5118 61.4645 36.4645L45 52.9289L38.5355 46.4645C36.5829 44.5118 33.4171 44.5118 31.4645 46.4645C29.5118 48.4171 29.5118 51.5829 31.4645 53.5355L41.4645 63.5355C43.4171 65.4882 46.5829 65.4882 48.5355 63.5355L68.5355 43.5355Z"
                  fill="#10A83B"
                />
              </svg>
            </div>
          </div>

          <!-- Confirmation Message -->
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            Order received
          </h2>
          <p class="text-gray-600 mb-6">
            Your investment application process has been received. You will
            receive a confirmation mail from our team shortly.
          </p>

          <!-- Action Buttons -->
          <button @click="router.push('/dashboard/investments')"
            class="bg-[#2F6D67] text-white font-medium py-3.5 px-4 rounded-lg w-full mb-4 hover:bg-[#2F6D67]"
          >
            Make a new order
          </button>
<div class="flex justify-center items-center">
    <button
            class="text-[#2F6D67] font-medium flex items-center justify-center gap-1 hover:text-gray-900"
          >
            Go back home <span>&#8594;</span>
          </button>
</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const router = useRouter()
definePageMeta({
  layout: "dashboard",
});
</script>
