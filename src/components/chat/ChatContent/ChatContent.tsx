import React from 'react';
import { Bill, ConversationState } from '../../../types/interfaces';
import { ChatMessages } from '../ChatMessages';
import { BillOption } from '../../BillOption';
import { CustomAmountInput } from '../../CustomAmountInput/CustomAmountInput';
import { PaymentSummary } from '../../PaymentSummary';
import { QuickOptions } from '../../QuickOptions';
import { LoadingSpinner } from '../../LoadingSpinner';

interface ChatContentProps {
  messages: any[];
  isTyping: boolean;
  isProcessing: boolean;
  isAccountProcessing: boolean;
  isPlanProcessing: boolean;
  showBills: boolean;
  showCustomAmount: boolean;
  selectedBill: Bill | null;
  showOptions: boolean;
  showPaymentSummary: boolean;
  conversationState: ConversationState;
  currentOptions: any[];
  bills: Bill[];
  isLoading: boolean;
  onBillSelect: (billId: string) => void;
  onCustomAmount: (amount: number) => void;
  onOptionSelect: (option: any) => void;
}

export const ChatContent: React.FC<ChatContentProps> = ({
  messages,
  isTyping,
  isProcessing,
  isAccountProcessing,
  isPlanProcessing,
  showBills,
  showCustomAmount,
  selectedBill,
  showOptions,
  showPaymentSummary,
  conversationState,
  currentOptions,
  bills,
  isLoading,
  onBillSelect,
  onCustomAmount,
  onOptionSelect
}) => {
  const shouldShowOptions = !isProcessing && 
                          !isAccountProcessing && 
                          !isPlanProcessing && 
                          !showBills && 
                          !showCustomAmount && 
                          currentOptions.length > 0 && 
                          showOptions && 
                          conversationState.context !== 'completed';

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-chat-bg">
      <div className="flex flex-col space-y-4">
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          isProcessing={isProcessing}
          isAccountProcessing={isAccountProcessing}
          isPlanProcessing={isPlanProcessing}
        />
        {isLoading && (
          <div className="my-4 ml-auto mr-4 w-[85%]">
            <LoadingSpinner message="Retrieving your bills..." />
          </div>
        )}
        {showBills && !isLoading && (
          <div className="flex flex-col gap-2 my-4 ml-auto mr-4 w-[85%]">
            {bills.map((bill) => (
              <BillOption key={bill.id} bill={bill} onSelect={onBillSelect} />
            ))}
          </div>
        )}
        {showCustomAmount && selectedBill && (
          <div className="my-4 ml-auto mr-4 w-[85%]">
            <CustomAmountInput
              maxAmount={selectedBill.amount}
              onCustomAmount={onCustomAmount}
            />
          </div>
        )}
        {showPaymentSummary && 
         conversationState.context === 'payment_confirmation' && 
         conversationState.paymentFlow?.paymentSummary && (
          <div className="my-4 ml-auto mr-4 w-[85%]">
            <PaymentSummary summary={conversationState.paymentFlow.paymentSummary} />
          </div>
        )}
        {shouldShowOptions && !isLoading && (
          <QuickOptions options={currentOptions} onSelect={onOptionSelect} />
        )}
      </div>
    </div>
  );
};