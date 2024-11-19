import { Message } from './message.type';
import { TemplateHistory } from './template-history.type';

export interface Conversation {
  conversation_id: number;
  template_history_id: number;
  user_id: number;
  messages?: Partial<Message>[];
  template_history?: Partial<TemplateHistory>;
}
