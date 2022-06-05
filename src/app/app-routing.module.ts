import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: 'user',
    loadChildren: './pages/user/user.module#UserModule'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: './pages/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
