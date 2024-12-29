import { CareAccount } from '../types/interfaces';
import { delay } from '../utils/delay';

export interface AccountSearchParams {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface AccountSearchResult {
  accounts: CareAccount[];
  totalAccounts: number;
  primaryAccount?: CareAccount;
}

export const searchAccounts = async (_searchParams: AccountSearchParams): Promise<AccountSearchResult> => {
  // Simulate API call with delay
  await delay(4000);

  // Mock data - in a real app this would come from an API
  const accounts: CareAccount[] = [
    {
      id: "acc_1",
      lastFour: "5678",
      type: "primary"
    },
    {
      id: "acc_2",
      lastFour: "4321",
      type: "secondary"
    },
    {
      id: "acc_3",
      lastFour: "9876",
      type: "secondary"
    }
  ];

  const primaryAccount = accounts.find(acc => acc.type === "primary");

  return {
    accounts,
    totalAccounts: accounts.length,
    primaryAccount
  };
};