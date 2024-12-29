import { ChatOption } from '../types/chat';

export const initialOptions: ChatOption[] = [
  { id: '1', label: 'Chat with a Care Advocate', action: 'chat_advocate' },
  { id: '2', label: 'Access Medical Records', action: 'medical_records' },
  { id: '3', label: 'Billing Questions', action: 'billing_questions' },
  { id: '4', label: 'Find a provider or Care', action: 'find_provider' }
];