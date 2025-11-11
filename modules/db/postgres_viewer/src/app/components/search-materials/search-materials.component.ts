// src/app/components/search-materials/search-materials.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { SearchResult } from '../../models/search-result.model';

// Расширяем интерфейс SearchResult для этого компонента
interface ExtendedSearchResult extends SearchResult {
  table: string;
  column: string;
  row_data: Record<string, any>;
}

@Component({
  selector: 'app-search-materials',
  templateUrl: './search-materials.component.html',
  styleUrls: ['./search-materials.component.scss'],
})
export class SearchMaterialsComponent implements OnInit {
  // Чипы с терминами
  termCtrl = new FormControl();
  terms: string[] = ['арматура', 'труба', 'балка', 'швеллер', 'уголок', 'лист'];

  // Результаты поиска
  results: ExtendedSearchResult[] = [];
  displayedColumns: string[] = []; // Динамические колонки таблицы
  isLoading = false;
  error: string | null = null;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {}

  // Удалить термин из списка
  removeTerm(term: string): void {
    this.terms = this.terms.filter((t) => t !== term);
  }

  // Добавить термин по Enter
  addTerm(): void {
    const value = this.termCtrl.value?.trim();
    if (value && !this.terms.includes(value)) {
      this.terms.push(value);
    }
    this.termCtrl.setValue(null);
  }

  // Кнопка «Найти»
  search(): void {
    if (this.terms.length === 0) {
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.api.searchMaterials(this.terms).subscribe({
      next: (data: ExtendedSearchResult[]) => {
        this.results = data;
        // Собираем уникальный набор полей row_data для колонок
        const allKeys = new Set<string>();
        this.results.forEach((r) => {
          Object.keys(r.row_data).forEach((k) => allKeys.add(k));
        });
        this.displayedColumns = ['table', 'column', ...Array.from(allKeys)];
      },
      error: (err) => {
        this.error = err.message || 'Ошибка при поиске';
        this.results = [];
      },
      complete: () => (this.isLoading = false),
    });
  }
}
