import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResult } from './models/search-result.model';

// Расширяем интерфейс SearchResult для API
interface ExtendedSearchResult extends SearchResult {
  table: string;
  column: string;
  row_data: Record<string, any>;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tables`);
  }

  getTableData(tableName: string, limit: number = 100): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tables/${tableName}?limit=${limit}`);
  }

  executeQuery(query: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/query`, { query });
  }

  getDatabaseInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/database/info`);
  }

  searchMaterials(terms: string[], tables?: string[]): Observable<ExtendedSearchResult[]> {
    let params = new HttpParams().set('terms', terms.join(','));
    if (tables && tables.length > 0) {
      params = params.set('tables', tables.join(','));
    }
    return this.http.get<ExtendedSearchResult[]>(`${this.baseUrl}/search_materials`, { params });
  }
}
