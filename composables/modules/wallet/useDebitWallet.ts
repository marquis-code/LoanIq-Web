import { ref } from "vue";
import { wallet_api } from "@/api_factory/modules/wallet";
import { useCustomToast } from "@/composables/core/useCustomToast";

const payload = ref({
  amount: '',
  destinationBankCode: "",
  destinationBankName: "",
  destinationAccountNumber: "",
  destinationAccountName: "",
  narration: "",
});

export const useDebitWallet = () => {
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const debitWallet = async () => {
    loading.value = true;
    
      const res = await  wallet_api.$_debit_wallet(payload.value)
       console.log(res, 'tres here')
      if(res.status === 201 || res.status === 201){
        showToast({
          title: "Success",
          message: res?.data?.message,
          toastType: "success",
          duration: 3000,
        });
        return res;
      } else {
        showToast({
          title: "Error",
          message: res.data.message || "Transfer Failed",
          toastType: "error",
          duration: 3000,
        });
        return res;
      }

      loading.value = false

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
