import { VariableType } from './enum/variable-type.enum';

export type Variable = {
  variable_id: number;
  name: string;
  value: string;
  placeholder: string;
  tip: string;
  template_id: number | null;
  type: VariableType;
  template_history_id: number | null;
};
