// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchMaterialsComponent } from './components/search-materials/search-materials.component';
import { TableViewerComponent } from './components/table-viewer.component';

const routes: Routes = [
  { path: '', redirectTo: 'tables', pathMatch: 'full' },
  { path: 'tables', component: TableViewerComponent },
  { path: 'search-materials', component: SearchMaterialsComponent },
  // ... другие маршруты ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
