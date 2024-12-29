import React from 'react';
import { ChatHeader } from '../ChatHeader';
import { ChatContent } from '../ChatContent';
import { ChatInput } from '../ChatInput';
import { MessengerIcon } from '../MessengerIcon';
import { useChatWindow } from './hooks/useChatWindow';
import { bills } from '../../../constants/bills';

export const ChatWindow: React.FC = () => {
  const {
    isMinimized,
    showBills,
    showCustomAmount,
    selectedBill,
    isProcessing,
    showOptions,
    showPaymentSummary,
    messages,
    isTyping,
    currentOptions,
    conversationState,
    isAccountProcessing,
    isPlanProcessing,
    isLoading,
    handlers,
    setIsMinimized
  } = useChatWindow();

  return (
    <>
      <MessengerIcon onClick={() => setIsMinimized(false)} isMinimized={isMinimized} />
      {!isMinimized && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-chat">
          <ChatHeader 
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
              isLoading={isLoading}
              onBillSelect={handlers.handleBillSelect}
              onCustomAmount={handlers.handleCustomAmount}
              onOptionSelect={handlers.handleOptionSelect}
            />
            <ChatInput onSendMessage={handlers.handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
};