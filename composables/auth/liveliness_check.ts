import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";
import CryptoJS from "crypto-js";

// const payload = ref({
//   userId: "c6a45f60-e0b4-44ec-81d8-ea0b5fb804e6",
//   otp: "5178",
//   url: "https://res.cloudinary.com/deh3s35go/image/upload/v1728984119/tractor-min_ioivkd.png",
// });

const verifiedUser = ref({})
const secretKey = "LoanIQEncryption";

export const useLivelinessCheck = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const route = useRoute();
  const router = useRouter();

  const getEncryptedData = () => {
    try {
      const encryptedUserId = localStorage.getItem("userId");
      const encryptedOtp = localStorage.getItem("otp");

      if (encryptedUserId && encryptedOtp) {
        const userId = CryptoJS.AES.decrypt(
          encryptedUserId,
          secretKey
        ).toString(CryptoJS.enc.Utf8);
        const otp = CryptoJS.AES.decrypt(encryptedOtp, secretKey).toString(
          CryptoJS.enc.Utf8
        );
        return { userId, otp };
      }
      throw new Error("User ID or OTP not found in local storage.");
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to retrieve encrypted data.",
        toastType: "error",
        duration: 3000,
      });
      return null;
    }
  };

  const { userId, otp } = getEncryptedData() || {};

  const livelinessCheck = async (imageUrl: string) => {
    if (!userId || !otp) {
        showToast({
          title: "Error",
          message: "Missing user ID or OTP. Please try again.",
          toastType: "error",
          duration: 3000,
        });
        return;
      }

      const payload = {
        userId,
        otp,
        url: imageUrl || "https://res.cloudinary.com/deh3s35go/image/upload/v1728984119/tractor-min_ioivkd.png",
      };
      loading.value = true;

    const res = (await auth_api.$_liveliness_check(payload)) as any;
    console.log(res, 'error')
    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: res.data.message,
        toastType: "success",
        duration: 3000,
      });
      verifiedUser.value = res?.data?.data?.user || {}
      router.push(`/create-password?userId=${res?.data?.data?.userId}`)
      // router.push(`/verify-success?userId=${res?.data?.data?.userId}`);
    } else {
      showToast({
        title: "Error",
        message: res.data.message,
        toastType: "error",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return {
    loading,
    livelinessCheck,
    verifiedUser
  };
};
