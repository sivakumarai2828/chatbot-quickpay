import { useState } from 'react';
import { Bill } from '../../../../types/chat';

export const useChatState = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [showBills, setShowBills] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showPaymentSummary, setShowPaymentSummary] = useState(true);

  return {
    isMinimized,
    showBills,
    showCustomAmount,
    selectedBill,
    isProcessing,
    showOptions,
    showPaymentSummary,
    setIsMinimized,
    setShowBills,
    setShowCustomAmount,
    setSelectedBill,
    setIsProcessing,
    setShowOptions,
    setShowPaymentSummary
  };
};