export interface SearchResult {
  id: number;
  name: string;
  description: string;
  table: string;
  column: string;
  row_data: Record<string, any>;
  // Добавьте другие поля, которые необходимы для вашего SearchResult
}
