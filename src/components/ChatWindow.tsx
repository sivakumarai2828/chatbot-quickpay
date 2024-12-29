import { useState, useEffect } from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatContent } from './ChatContent';
import { ChatInput } from './ChatInput';
import { MessengerIcon } from './MessengerIcon';
import { Bill } from '../types/chat';
import { bills } from '../constants/bills';
import { useChat } from '../hooks/useChat';
import { useChatHooks } from '../hooks/useChatHooks';
import { useMessageHandlers } from '../hooks/useMessageHandlers';

export const ChatWindow: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [showBills, setShowBills] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showPaymentSummary, setShowPaymentSummary] = useState(true);

  const {
    messages,
    isTyping,
    currentOptions,
    conversationState,
    careAccounts,
    setCurrentOptions,
    setConversationState,
    setCareAccounts,
    addMessages,
    initializeChat
  } = useChat();

  const {
    isAccountProcessing,
    isPlanProcessing,
    handleAccountLookup,
    handleCardLookup,
    handleConfirmation,
    handleFollowUp,
    handleBillSelect,
    handleCustomAmount,
    handlePaymentMethodSelect,
    handleAccountSelection,
    handlePlanSelection
  } = useChatHooks(
    addMessages,
    setCurrentOptions,
    setConversationState,
    setCareAccounts,
    setShowOptions,
    setShowPaymentSummary,
    setIsProcessing,
    setShowBills,
    setShowCustomAmount,
    setSelectedBill,
    bills
  );

  const { handleSendMessage, handleOptionSelect } = useMessageHandlers({
    conversationState,
    selectedBill,
    careAccounts,
    setIsProcessing,
    setCurrentOptions,
    setShowBills,
    setShowCustomAmount,
    setShowPaymentSummary,
    addMessages,
    handleAccountLookup,
    handleCardLookup,
    handleAccountSelection,
    handlePlanSelection,
    handleConfirmation,
    handleFollowUp,
    handlePaymentMethodSelect,
    setConversationState
  });

  useEffect(() => {
    if (!isMinimized) {
      initializeChat();
    }
  }, [isMinimized]);

  return (
    <>
      <MessengerIcon onClick={() => setIsMinimized(false)} isMinimized={isMinimized} />
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-chat">
          <ChatHeader 
            title="CareCredit QuickPayBot"
            onClose={() => setIsMinimized(true)}
            onMinimize={() => setIsMinimized(true)}
          />
          <div className="h-[600px] flex flex-col">
            <ChatContent
              messages={messages}
              isTyping={isTyping}
              isProcessing={isProcessing}
              isAccountProcessing={isAccountProcessing}
              isPlanProcessing={isPlanProcessing}
              showBills={showBills}
              showCustomAmount={showCustomAmount}
              selectedBill={selectedBill}
              showOptions={showOptions}
              showPaymentSummary={showPaymentSummary}
              conversationState={conversationState}
              currentOptions={currentOptions}
              bills={bills}
              onBillSelect={handleBillSelect}
              onCustomAmount={handleCustomAmount}
              onOptionSelect={handleOptionSelect}
            />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
};