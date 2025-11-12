// src/app/components/search-materials/search-materials.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '../../api.service';
import { SearchResult } from '../../models/search-result.model';
import { HighlightPipe } from '../../pipe/highlight.pipe';

// Расширяем интерфейс SearchResult для этого компонента
interface ExtendedSearchResult extends SearchResult {
  table: string;
  column: string;
  row_data: Record<string, any>;
}

@Component({
  selector: 'app-search-materials',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    HighlightPipe,
  ],
  templateUrl: './search-materials.component.html',
  styleUrls: ['./search-materials.component.scss'],
})
export class SearchMaterialsComponent implements OnInit {
  // Чипы с терминами
  termCtrl = new FormControl();
  tableCtrl = new FormControl<string[]>([]);
  terms: string[] = ['арматура', 'труба', 'балка', 'швеллер', 'уголок', 'лист'];

  // Список таблиц
  availableTables: { name: string; columns: number }[] = [];
  selectedTables: string[] = [];
  searchAllTables = true;

  // Результаты поиска
  results: ExtendedSearchResult[] = [];
  displayedColumns: string[] = []; // Динамические колонки таблицы
  isLoading = false;
  error: string | null = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadTables();
  }

  // Загрузка списка таблиц
  loadTables(): void {
    this.api.getTables().subscribe({
      next: (tables) => {
        this.availableTables = tables;
        console.log('Загружены таблицы:', tables);
      },
      error: (err) => {
        console.error('Ошибка загрузки таблиц:', err);
      },
    });
  }

  // Обработка изменения выбора таблиц
  onTableSelectionChange(selected: string[] | null): void {
    if (selected === null || selected.length === 0) {
      // Если выбран "Все таблицы" или ничего не выбрано
      this.searchAllTables = true;
      this.selectedTables = [];
      this.tableCtrl.setValue([]);
    } else {
      // Если выбраны конкретные таблицы
      this.searchAllTables = false;
      this.selectedTables = selected.filter(t => t !== null);
    }
  }

  // Удалить термин из списка
  removeTerm(term: string): void {
    console.log('Удаление термина:', term);
    this.terms = this.terms.filter((t) => t !== term);
  }

  // Добавить термин по Enter
  addTerm(): void {
    const value = this.termCtrl.value?.trim();
    console.log('Добавление термина:', value);
    if (value && !this.terms.includes(value)) {
      this.terms = [...this.terms, value]; // Создаем новый массив для триггера change detection
    }
    this.termCtrl.setValue(null);
  }

  // Кнопка «Найти»
  search(): void {
    console.log('Поиск с терминами:', this.terms);
    console.log('Выбранные таблицы:', this.searchAllTables ? 'Все' : this.selectedTables);
    if (this.terms.length === 0) {
      console.warn('Нет терминов для поиска');
      return;
    }
    this.isLoading = true;
    this.error = null;

    const tablesToSearch = this.searchAllTables ? undefined : this.selectedTables;
    this.api.searchMaterials(this.terms, tablesToSearch).subscribe({
      next: (data: ExtendedSearchResult[]) => {
        console.log('Результаты поиска:', data);
        this.results = data;
        // Собираем уникальный набор полей row_data для колонок
        const allKeys = new Set<string>();
        this.results.forEach((r) => {
          Object.keys(r.row_data).forEach((k) => allKeys.add(k));
        });
        this.displayedColumns = ['table', 'column', ...Array.from(allKeys)];
        console.log('Отображаемые колонки:', this.displayedColumns);
      },
      error: (err) => {
        console.error('Ошибка поиска:', err);
        this.error = err.error?.detail || err.error?.message || err.message || 'Ошибка при поиске';
        this.results = [];
        this.isLoading = false;
      },
      complete: () => {
        console.log('Поиск завершен');
        this.isLoading = false;
      },
    });
  }
}
