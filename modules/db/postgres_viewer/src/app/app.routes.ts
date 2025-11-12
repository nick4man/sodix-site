import { Routes } from '@angular/router';
import { TableViewerComponent } from './components/table-viewer.component';
import { SearchMaterialsComponent } from './components/search-materials/search-materials.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: TableViewerComponent },
  { path: 'search-materials', component: SearchMaterialsComponent },
];
