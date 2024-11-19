import { Visibility } from './enum/visibility.enum';
import { TemplateHistory } from './template-history.type';

export interface Template {
  template_id: number;
  slug: string;
  user_id: number;
  logo_url: string;
  name: string;
  description: string;
  prompt: string;
  visibility: Visibility;
  created_at: Date;
  updated_at: Date;
  template_history?: TemplateHistory[];
  categories_on_template: [
    {
      category_id: number;
      template_id: number;
      category: {
        category_id: number;
        name: string;
      };
    }
  ];
}
