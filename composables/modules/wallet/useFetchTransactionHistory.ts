import { ref, watch, onMounted } from "vue";
import { wallet_api } from '@/api_factory/modules/wallet';
import { useCustomToast } from "@/composables/core/useCustomToast";

// Get today's date in YYYY-MM-DD format
const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};

const query = ref({
    startDate: getCurrentDate(),
    endDate: getCurrentDate()
});

export const useFetchTransactionHistory = () => {
    const loading = ref(false);
    const transactionHistory = ref([]);
    const { showToast } = useCustomToast();

    const fetchTransactionHistory = async () => {
        loading.value = true;
        try {
            const res = await wallet_api.$_fetch_transaction_history(query.value);
            console.log(res, 'res here');
            transactionHistory.value = res.data.data || [];
        } catch (error) {
            showToast({
                title: "Error",
                message: error.response?.data?.message || "Failed to fetch transactions",
                toastType: "error",
                duration: 3000,
            });
        } finally {
            loading.value = false;
        }
    };

    watch(query, fetchTransactionHistory, { deep: true });

    onMounted(() => {
        fetchTransactionHistory();
    });

    return {
        fetchTransactionHistory,
        transactionHistory,
        loading,
        query
    };
};
