export interface Relation {
  source: string;
  target: string;
  type:
    | 'grounds'
    | 'enables'
    | 'requires'
    | 'produces'
    | 'decomposes_to'
    | 'applies'
    | 'evaluates_to';
  name: string;
}
