import { visibility } from '../services/template.service';

export interface TemplateHistory {
  template_history_id: number;
  name: string;
  description: string;
  prompt: string;
  visibility: visibility.PUBLIC;
  created_at: Date;
  template_id: number;
}
