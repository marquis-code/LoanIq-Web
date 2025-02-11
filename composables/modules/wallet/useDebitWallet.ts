import { ref } from "vue";
import { wallet_api } from "@/api_factory/modules/wallet";
import { useCustomToast } from "@/composables/core/useCustomToast";

const payload = ref({
  amount: "",
  destinationBankCode: "",
  destinationBankName: "",
  destinationAccountNumber: "",
  destinationAccountName: "",
  narration: "",
});
const loading = ref(false);

export const useDebitWallet = () => {
  const { showToast } = useCustomToast();

  const debitWallet = async () => {
    loading.value = true;

    try {
      const res = await wallet_api.$_debit_wallet(payload.value);
      console.log(res, "tres here");

      if (res.status === 201 || res.status === 201) {
        // showToast({
        //   title: "Success",
        //   message: res?.data?.message,
        //   toastType: "success",
        //   duration: 3000,
        // });
      } else {
        showToast({
          title: "Error",
          message: res.data?.message || "Transfer Failed",
          toastType: "error",
          duration: 3000,
        });
      }

      return res;
    } catch (error) {
      console.error("Error debiting wallet:", error);
      showToast({
        title: "Error",
        message: "An error occurred. Please try again.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false; // Ensures loading is reset
    }
  };

  const setPayload = (data: any) => {
    payload.value = { ...data };
  };

  return {
    debitWallet,
    loading,
    payload,
    setPayload,
  };
};
