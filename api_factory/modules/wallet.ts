import { GATEWAY_ENDPOINT } from '../axios.config'

export const wallet_api = {
    $_fetch_transaction_history: () => {
		const url = '/wallet/transaction-history'
		return GATEWAY_ENDPOINT.get(url)
	},
	$_fetch_bank_list: () => {
		const url = '/wallet/get-bank-list'
		return GATEWAY_ENDPOINT.get(url)
	},
	$_update_bank_list: () => {
		const url = '/update-bank-list'
		return GATEWAY_ENDPOINT.get(url)
	},
	$_resolve_account_number: (bankCode: string | number, accountNumber: string | number) => {
		const url = `/wallet/resolve-account/${bankCode}/${accountNumber}`;
		return GATEWAY_ENDPOINT.get(url)
	},
	$_debit_wallet: (payload: any) => {
		const url = '/wallet/debit-wallet';
		return GATEWAY_ENDPOINT.post(url, payload)
	}
}
