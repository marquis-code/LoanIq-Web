import { GATEWAY_ENDPOINT } from '../axios.config'
export const dashboard_api = {
    $_get_dashboard_stats: () => {
        let url = `/dashboard/profile`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_update_profile: (payload: any) => {
        const url = '/dashboard/profile/update'
        return GATEWAY_ENDPOINT.post(url, payload)
      },
      $_get_notifications: () => {
        let url = `/dashboard/notifications`;
        return GATEWAY_ENDPOINT.get(url);
      },
}
