import { ref } from "vue";
import { investment_api } from '@/api_factory/modules/investment';
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useFetchInvestmentProducts = () => {
    const loading = ref(false);
    const products = ref([]);
    const { showToast } = useCustomToast();

    const fetchInvestmentProducts = async () => {
        loading.value = true;
        try {
            const res = await investment_api.$_fetch_investment_products();
            console.log(res, 'res here')
            products.value = res?.data?.data?.investmentProducts || [];
        } catch (error: any) {
            showToast({
                title: "Error",
                message: error.response.data.message || "Failed to fetch cards",
                toastType: "error",
                duration: 3000,
            });
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchInvestmentProducts()
    })

    return {
        fetchInvestmentProducts,
        products,
        loading,
    };
};
