import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';

export const routes: Routes = [
    // Paginas privadas
    {
        path: "", pathMatch: "prefix", loadChildren: () => import('./private/private.routes').then(m => m.privateRoutes),
    },
    // Paginas públicas
    {
        path: "login", pathMatch: "full", component: LoginComponent
    },
];
