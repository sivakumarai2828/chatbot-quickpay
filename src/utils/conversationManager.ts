import { ConversationState } from '../types/chat';

export const identifyIntent = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('pay') && lowerMessage.includes('bill')) {
    return 'pay_bill';
  }
  if (lowerMessage.includes('balance') || lowerMessage.includes('owe')) {
    return 'check_balance';
  }
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return 'get_help';
  }
  return 'unknown';
};

export const generateBotResponse = (
  message: string,
  state: ConversationState
): { response: string; newState: ConversationState } => {
  const intent = identifyIntent(message);
  const newState = { ...state, lastIntent: intent };

  switch (intent) {
    case 'pay_bill':
      return {
        response: "Here are your outstanding bills. Please select a payment option for each.",
        newState: { ...newState, context: 'billing', pendingAction: 'select_bill' }
      };
    
    case 'check_balance':
      return {
        response: "I'll help you check your balance. Which provider's bill would you like to check?",
        newState: { ...newState, context: 'balance', pendingAction: 'select_provider' }
      };
    
    case 'get_help':
      return {
        response: "I'm here to help! Would you like assistance with:\n1. Bill Payment\n2. Finding a Provider\n3. Medical Records\n4. Speaking to a Representative",
        newState: { ...newState, context: 'help', pendingAction: 'select_help_option' }
      };
    
    default:
      if (state.context === 'billing' && state.pendingAction === 'select_bill') {
        return {
          response: "Please select one of the bills shown above to proceed with payment.",
          newState
        };
      }
      return {
        response: "I'm not sure I understood. Would you like help with bill payment, checking your balance, or speaking with a representative?",
        newState: { ...newState, context: 'clarification' }
      };
  }
};