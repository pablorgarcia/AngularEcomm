import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCrudComponent } from 'src/app/components/user/user-crud/user-crud.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'new',
        component: UserCrudComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
