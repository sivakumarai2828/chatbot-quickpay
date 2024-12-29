import { useState } from 'react';
import { CareAccount } from '../types/chat';
import { searchAccounts, AccountSearchParams } from '../services/accountService';
import { createBotMessage } from '../utils/messageUtils';
import { useLoadingState } from './useLoadingState';

interface UseAccountLookupProps {
  addMessages: (messages: any[]) => Promise<void>;
  setCurrentOptions: (options: any[]) => void;
  setCareAccounts: (accounts: CareAccount[]) => void;
}

export const useAccountLookup = ({
  addMessages,
  setCurrentOptions,
  setCareAccounts
}: UseAccountLookupProps) => {
  const { isLoading, startLoading, stopLoading } = useLoadingState();
  const [error, setError] = useState<string | null>(null);

  const lookupAccounts = async (params: AccountSearchParams) => {
    try {
      startLoading();
      setError(null);
      
      await addMessages([
        createBotMessage("Searching for accounts...")
      ]);

      const result = await searchAccounts(params);
      
      if (result.accounts.length > 0) {
        setCareAccounts(result.accounts);
        
        const accountOptions = result.accounts.map(acc => ({
          id: acc.id,
          label: `Account ending in ${acc.lastFour}${acc.type === 'primary' ? ' (Primary)' : ''}`,
          action: `select_account_${acc.id}`
        }));

        await addMessages([
          createBotMessage(`Found ${result.totalAccounts} account${result.totalAccounts > 1 ? 's' : ''} associated with your information:`)
        ]);

        setCurrentOptions(accountOptions);
      } else {
        await addMessages([
          createBotMessage("No accounts found with the provided information. Would you like to apply for a new CareCredit card?")
        ]);
        
        setCurrentOptions([{
          id: 'apply_new',
          label: 'Apply for a new card',
          action: 'apply_carecredit'
        }]);
      }
    } catch (err) {
      setError('Unable to retrieve account information. Please try again.');
      await addMessages([
        createBotMessage("I'm having trouble retrieving your account information. Please try again or contact support if the issue persists.")
      ]);
    } finally {
      stopLoading();
    }
  };

  return {
    lookupAccounts,
    isLoading,
    error
  };
};