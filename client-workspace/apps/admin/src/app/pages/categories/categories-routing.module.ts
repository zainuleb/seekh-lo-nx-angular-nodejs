import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRoute } from '../../shared/utils/core-routes';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent,
  },
  {
    path: `form`,
    component: CategoriesFormComponent,
  },
  {
    path: `form/:id`,
    component: CategoriesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
