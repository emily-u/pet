import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  { path: 'new',component: AddComponent },
  { path: 'edit/:id',component: EditComponent },
  { path: '',component: HomeComponent },
  { path: 'details/:id',component: ShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
