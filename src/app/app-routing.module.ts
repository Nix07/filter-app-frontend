import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDataFormComponent } from './user-data-form/user-data-form.component';

const routes: Routes = [
  {path: '**', component: UserDataFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
