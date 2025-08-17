export interface Entity {
  id: string;
  name: string;
  label: string;
  type:
    | 'axiom'
    | 'definition'
    | 'step'
    | 'operation'
    | 'conclusion'
    | 'problem';
  start: boolean;
  end: boolean;
}
