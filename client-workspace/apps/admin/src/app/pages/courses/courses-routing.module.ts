import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseFormComponent } from './course-form/course-form.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
  },
  {
    path: `form`,
    component: CourseFormComponent,
  },
  {
    path: `form/:id`,
    component: CourseFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
