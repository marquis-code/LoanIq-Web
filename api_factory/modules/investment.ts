import { GATEWAY_ENDPOINT } from '../axios.config'

export const investment_api = {
    $_fetch_investment_products: () => {
		const url = '/investment/product'
		return GATEWAY_ENDPOINT.get(url)
	},
    $_fetch_investment_details: (id: any) => {
		const url = `/investment/product/${id}`
		return GATEWAY_ENDPOINT.get(url)
	},
	$_create_investment: (payload: any) => {
		const url = '/investment/create'
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_get_remaining_amount: (amount: string, payload: any) => {
		const url = `/investment/get-remaining-amount/${amount}`
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_get_active_investments: () => {
		const url = '/investment/active-investments'
		return GATEWAY_ENDPOINT.get(url)
	},
	$_get_investment_summary: (id: string) => {
		const url = `/investment/summary/${id}`
		return GATEWAY_ENDPOINT.get(url)
	},
	$_get_completed_investments: () => {
		const url = '/investment/completed-investments'
		return GATEWAY_ENDPOINT.get(url)
	},
}
