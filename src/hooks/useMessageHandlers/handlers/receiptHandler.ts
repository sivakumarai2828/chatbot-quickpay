import { ConversationState } from '../../../types/interfaces';
import { createBotMessage } from '../../../utils/messageUtils';
import { validateEmail, validatePhoneNumber } from '../../../utils/validation';
import { logger } from '../../../utils/logger';

export const handleReceiptInput = async (
  text: string,
  conversationState: ConversationState,
  addMessages: (messages: any[]) => Promise<void>,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setCurrentOptions: (options: any[]) => void
) => {
  try {
    logger.info('Processing receipt input');
    
    if (conversationState.context === 'email_input') {
      if (!validateEmail(text)) {
        await addMessages([
          createBotMessage("Please enter a valid email address.")
        ]);
        return;
      }
    } else if (conversationState.context === 'phone_input') {
      if (!validatePhoneNumber(text)) {
        await addMessages([
          createBotMessage("Please enter a valid phone number.")
        ]);
        return;
      }
    }

    // Process the input
    await addMessages([
      createBotMessage("Receipt sent successfully!"),
      createBotMessage("Is there anything else I can help you with today?")
    ]);

    setConversationState(prev => ({
      ...prev,
      context: 'follow_up'
    }));

    setCurrentOptions([
      {
        id: 'yes_more_help',
        label: 'Yes',
        action: 'yes_more_help'
      },
      {
        id: 'no_more_help',
        label: 'No',
        action: 'no_more_help'
      }
    ]);
  } catch (error) {
    logger.error('Receipt handler error');
    await addMessages([
      createBotMessage("I'm having trouble processing your request. Please try again later.")
    ]);
  }
};