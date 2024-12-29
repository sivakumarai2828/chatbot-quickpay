import { ConversationState } from '../../../types/interfaces';
import { createBotMessage, createUserMessage } from '../../../utils/messageUtils';
import { validateEmail } from '../../../utils/validation';
import { delay } from '../../../utils/delay';

export const handleEmailReceipt = async (
  email: string,
  addMessages: (messages: any[]) => Promise<void>,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void,
  setCurrentOptions: (options: any[]) => void
) => {
  if (!validateEmail(email)) {
    await addMessages([
      createBotMessage("Please enter a valid email address.")
    ]);
    return;
  }

  await addMessages([
    createUserMessage(email)
  ]);

  // Simulate sending email
  await delay(1500);
  
  await addMessages([
    createBotMessage("Sent receipt email Successfully")
  ]);

  // Show follow-up options
  await delay(500);
  
  await addMessages([
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
};