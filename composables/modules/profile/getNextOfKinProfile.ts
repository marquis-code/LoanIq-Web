import { profile_api } from '@/api_factory/modules/profile'
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();

export const useFetchNextOfKinProfile = () => {
    const loading = ref(false);
    const profileObj = ref({} as any);
    const { $_get_next_of_kin_profile } = profile_api
    const getNextOfKinProfileObj = async () => {
        loading.value = true;
        const res = await $_get_next_of_kin_profile() as any;
        console.log(res, 'res here')
        if (res.type !== 'ERROR') {
            profileObj.value = res?.data?.data || {}
        } else {
            showToast({
                title: "Error",
                message: res?.data?.message ?? 'Something went wrong',
                toastType: "error",
                duration: 3000,
              });
        }
        loading.value = false
    };

    onMounted(() => {
        getNextOfKinProfileObj()
    })

    return {
        getNextOfKinProfileObj,
        loading,
        profileObj
    };
};
