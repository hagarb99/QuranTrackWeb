import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import ('./pages/login/login.component/login.component')
            .then(m => m.LoginComponent)
    }
    ,
    {
        path: 'dashboard',
        loadComponent: () =>
            import ('./pages/dashboard/dashboard')
            .then(m => m.Dashboard),
        canActivate: [AuthGuard]
     }

];
