import api from '../api';

interface UserBalance {
    sol_balance: number;
    domo_balance: number;
}

interface DepositResponse {
    status: string;
}

export class BalanceService {
    static async getUserBalance(): Promise<UserBalance> {
        try {
            const response = await api.post<{ msg: UserBalance }>('/user/balance');
            return response.data.msg;
        } catch (error) {
            console.error('Error fetching balance:', error);
            throw error;
        }
    }

    static async depositDomo(tokenAmount: number): Promise<DepositResponse> {
        try {
            const response = await api.post<{ msg: DepositResponse }>('/user/balance/deposit/domo', {
                token_amount: tokenAmount
            });
            return response.data.msg;
        } catch (error) {
            console.error('Error depositing DOMO:', error);
            throw error;
        }
    }
} 