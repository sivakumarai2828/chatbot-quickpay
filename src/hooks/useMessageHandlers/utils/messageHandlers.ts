import { ConversationState } from '../../../types/chat';
import { createBotMessage, createUserMessage } from '../../../utils/messageUtils';
import { mainMenuOptions } from '../../../constants/quickOptions';

export const handleFollowUpResponse = async (
  wantsMoreHelp: boolean,
  addMessages: (messages: any[]) => Promise<void>,
  setCurrentOptions: (options: any[]) => void,
  setConversationState: (state: (prev: ConversationState) => ConversationState) => void
) => {
  if (wantsMoreHelp) {
    await addMessages([
      createUserMessage("Yes"),
      createBotMessage("What would you like help with?")
    ]);
    
    setConversationState(prev => ({
      ...prev,
      context: 'main_menu'
    }));
    
    setCurrentOptions(mainMenuOptions);
  } else {
    await addMessages([
      createUserMessage("No"),
      createBotMessage("Thank you for using CareCredit QuickPayBot. Have a great day!")
    ]);
    
    setConversationState(prev => ({
      ...prev,
      context: 'completed'
    }));
    
    setCurrentOptions([]);
  }
};