import { user_api } from "@/api_factory/modules/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();

const payloadObj = ref({
  otp: "",
  newPin: "",
});

export const useResetPin = () => {
  const loading = ref(false);
  const { $_reset_transaction_pin } = user_api;
  const resetTransactionPin = async () => {
    loading.value = true;
    try {
      const res = (await $_reset_transaction_pin(payloadObj.value)) as any;

      if (res.type !== "ERROR") {
        showToast({
          title: "Success",
          message: "Transaction Pin changed successfully",
          toastType: "success",
          duration: 3000,
        });
      }
    } catch (error: any) {
      showToast({
        title: "Error",
        message: error.response.data.message,
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };

  const setPayload = (data: any) => {
    payloadObj.value.otp = data.otp
    payloadObj.value.newPin = data.newPin
  }
  return {
    resetTransactionPin,
    loading,
    payloadObj,
    setPayload
  };
};
