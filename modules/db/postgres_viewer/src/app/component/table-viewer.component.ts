import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table-viewer',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule
  ],
  template: `
    <div class="container">
      <h2>Просмотр таблиц PostgreSQL</h2>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Выберите таблицу</mat-label>
        <mat-select (selectionChange)="onTableChange($event)">
          <mat-option *ngFor="let table of tables" [value]="table.name">
            {{ table.name }} ({{ table.columns }} колонок)
          </mat-option>
        </mat-select>
      </mat-form-field>

      <div *ngIf="selectedTable">
        <mat-card class="schema-card">
          <mat-card-header>
            <mat-card-title>Структура таблицы: {{ selectedTable }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="schemaData">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Колонка</th>
                <td mat-cell *matCellDef="let column">{{ column.name }}</td>
              </ng-container>
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Тип</th>
                <td mat-cell *matCellDef="let column">{{ column.type }}</td>
              </ng-container>
              <ng-container matColumnDef="nullable">
                <th mat-header-cell *matHeaderCellDef>NULL?</th>
                <td mat-cell *matCellDef="let column">{{ column.nullable ? 'Да' : 'Нет' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedSchemaColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedSchemaColumns;"></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <mat-card class="data-card">
          <mat-card-header>
            <mat-card-title>Данные ({{ tableData?.data?.length || 0 }} записей)</mat-card-title>
            <mat-card-subtitle>
              <mat-form-field appearance="outline">
                <mat-label>Лимит записей</mat-label>
                <mat-select [(value)]="limit" (selectionChange)="loadTableData()">
                  <mat-option [value]="10">10</mat-option>
                  <mat-option [value]="50">50</mat-option>
                  <mat-option [value]="100">100</mat-option>
                  <mat-option [value]="500">500</mat-option>
                </mat-select>
              </mat-form-field>
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="tableData?.data">
                <ng-container *ngFor="let column of displayedDataColumns" [matColumnDef]="column">
                  <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
                  <td mat-cell *matCellDef="let row">{{ row[column] }}</td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="displayedDataColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedDataColumns;"></tr>
              </table>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .full-width { width: 100%; margin-bottom: 20px; }
    .schema-card, .data-card { margin-bottom: 20px; }
    .table-container { max-height: 500px; overflow: auto; }
    table { width: 100%; }
  `]
})
export class TableViewerComponent implements OnInit {
  tables: any[] = [];
  selectedTable: string = '';
  tableData: any = null;
  schemaData: any[] = [];
  limit: number = 100;
  displayedDataColumns: string[] = [];
  displayedSchemaColumns = ['name', 'type', 'nullable'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.apiService.getTables().subscribe(
      data => {
        this.tables = data;
      },
      error => console.error('Error loading tables:', error)
    );
  }

  onTableChange(event: any): void {
    this.selectedTable = event.value;
    this.loadTableData();
  }

  loadTableData(): void {
    if (!this.selectedTable) return;

    this.apiService.getTableData(this.selectedTable, this.limit).subscribe(
      data => {
        this.tableData = data;
        this.schemaData = data.schema;
        if (data.data.length > 0) {
          this.displayedDataColumns = Object.keys(data.data[0]);
        }
      },
      error => console.error('Error loading table data:', error)
    );
  }
}
