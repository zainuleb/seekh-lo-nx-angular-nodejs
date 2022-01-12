import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

//Pages Components
import { CourseListComponent } from './pages/course-list/course-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

//Imports from MonoRepo Shared Library
import { UiModule } from '@client-workspace/ui';
import { AccordionModule } from 'primeng/accordion';

//Specifing Routes
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'courses', component: CourseListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,

    CourseListComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    UiModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
