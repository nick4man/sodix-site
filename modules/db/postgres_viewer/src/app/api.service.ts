import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

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
}
