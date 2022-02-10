import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Importing Core Routes
import { CoreRoute } from './shared/utils/core-routes';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: CoreRoute.DASHBOARD,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: CoreRoute.CATEGORIES,
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: CoreRoute.COURSES,
    loadChildren: () =>
      import('./pages/courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: CoreRoute.USERS,
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy',
      useHash: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
