import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./component/table-viewer.component').then((m) => m.TableViewerComponent)
    }
];
