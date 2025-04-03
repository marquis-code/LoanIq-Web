import { auth_api } from "@/api_factory/modules/auth";
import CryptoJS from "crypto-js"; 
import { useCustomToast } from "@/composables/core/useCustomToast";
const credential = {
  bvn: ref(""),
  phoneNumber: ref(""),
  email: ref(""),
};

const secretKey = "LoanIQEncryption";

export const use_auth_register = () => {
  const loading = ref(false);
  const router = useRouter();
  const { showToast } = useCustomToast();

  const register = async () => {
    loading.value = true;

    const payload = {
      bvn: credential.bvn.value,
      phone: credential.phoneNumber.value,
      email: credential.email.value,
    };

    localStorage.setItem('userEmail', credential.email.value)

    try {
      const res = (await auth_api.$_register(payload)) as any;

      loading.value = false;
      console.log(res, 'tes hee')

      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: res.data.message,
          toastType: "success",
          duration: 3000,
        });


        // Encrypt and store userId and otp in localStorage
        const encryptedUserId = CryptoJS.AES.encrypt(res.data.data.userId, secretKey).toString();
        const encryptedOtp = CryptoJS.AES.encrypt(res.data.data.otp, secretKey).toString();
        const encryptedTrackingId = CryptoJS.AES.encrypt(res.data.data.trackingId, secretKey).toString();
        localStorage.setItem("userId", encryptedUserId);
        localStorage.setItem("otp", encryptedOtp);
        localStorage.setItem("trackingId", encryptedTrackingId);

        // Corrected statusMap that only stores paths, without executing router.push
        const statusMap = {
          'LIVELINESS_CHECK': `/verify?userId=${res.data.data.userId}`,
          'SET_PASSCODE': '/create-password',
          'WEMA_OTP_SCREEN': '/verify-wema-otp',
        };

        // Check the status and redirect accordingly
        const statusCode = res.data.data.statusCode;

        if (statusCode in statusMap) {
          router.push(statusMap[statusCode]);
        } else {
          router.push('/verify-account');
        }

      } else {
        console.log(res.data, 'error here')
        showToast({
          title: "Error",
          message: res.data.message,
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      loading.value = false;
      showToast({
        title: "Error",
        message: "Registration failed. Please try again.",
        toastType: "error",
        duration: 3000,
      });
    }
  };

  const isFormDisabled = computed(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential.email.value);
    const bvnValid = /^\d{11}$/.test(credential.bvn.value); // Checks if it's a string of 11 digits
    return loading.value || !emailValid || !bvnValid;
  });
  

  return { credential, register, loading, isFormDisabled };
};
