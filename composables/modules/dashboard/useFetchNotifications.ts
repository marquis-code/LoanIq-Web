import { dashboard_api } from '@/api_factory/modules/dashboard'

export const useFetchNotifications = () => {
    const loading = ref(false);
    const notificationsList = ref({} as any);
    const { $_get_notifications } = dashboard_api;
    const getNotifications = async () => {
        loading.value = true;
        try {
            const res = await $_get_notifications() as any;
            if (res.type !== 'ERROR') {
                notificationsList.value = res?.data?.data
            }
        } catch (error) {
            console.error('Error getting profile object', error);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        getNotifications()
    })

    return {
        getNotifications,
        loading,
        notificationsList
    };
};
