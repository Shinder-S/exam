import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

export const privateRoutes: Routes = [
    {
        path: "", pathMatch: "prefix", component: LayoutComponent
    },
];
