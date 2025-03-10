import { ref } from "vue";
import { payment_api } from '@/api_factory/modules/payment';
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useFetchCards = () => {
    const loading = ref(false);
    const cards = ref([]);
    const { showToast } = useCustomToast();

    const fetchCards = async () => {
        loading.value = true;
        try {
            const res = await payment_api.$_fetch_cards();
            cards.value = res?.data?.data || [];
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
        fetchCards()
    })

    return {
        fetchCards,
        cards,
        loading,
    };
};
