import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from "@/composables/core/useCustomToast";
import CryptoJS from "crypto-js"; 

const secretKey = "LoanIQEncryption";

export const useResendWemaOtp = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();
  const route = useRoute();
  const router = useRouter();

  const getEncryptedData = () => {
    try {
      const encryptedUserId = localStorage.getItem("userId");

      if (encryptedUserId) {
        const userId = CryptoJS.AES.decrypt(
          encryptedUserId,
          secretKey
        ).toString(CryptoJS.enc.Utf8);
        return { userId };
      }
      throw new Error("User ID or Tracking Id not found in local storage.");
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

  const { userId } = getEncryptedData() || {};

  const resendWemaOtp = async () => {
    const router = useRouter();
    loading.value = true;

    const payload = {
      userId
    };

    try {
      const res = (await auth_api.$_resend_wema_otp(payload)) as any;
      console.log(res, 'here');
      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: res.data.message,
          toastType: "success",
          duration: 3000,
        });


         // Encrypt and store userId and otp in localStorage
         const encryptedUserId = CryptoJS.AES.encrypt(res.data.data.userId, secretKey).toString();
         const encryptedTrackingId = CryptoJS.AES.encrypt(res.data.data.trackingId, secretKey).toString();
         localStorage.setItem("userId", encryptedUserId);
         localStorage.setItem("trackingId", encryptedTrackingId);

        router.push('/verify-wema-otp');
      } else {
        showToast({
          title: "Error",
          message: res.data.errors[0]?.msg || "Something went wrong",
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      showToast({
        title: "Error",
        message: "An unexpected error occurred. Please try again later.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    resendWemaOtp,
  };
};
