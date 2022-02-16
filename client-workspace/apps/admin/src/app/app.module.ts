import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Services
import { CategoriesService } from '@client-workspace/courses';
import { MessageService } from 'primeng/api';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NxWelcomeComponent } from './nx-welcome.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import { AppMainComponent } from './pages/app-main/app-main.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { CourseFormComponent } from './pages/courses/course-form/course-form.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';
import { AppConfigComponent } from './pages/app-main/app.config.component';
import { MenuService } from './shared/side-menu/app.menu.service';
import { ConfigService } from './pages/app-main/app.config.service';

//Modules
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CurrencyConvertPipe } from './currency-convert.pipe';
import { EnrollmentDetailComponent } from './pages/enrollment/enrollment-detail/enrollment-detail.component';
import { EnrollmentListComponent } from './pages/enrollment/enrollment-list/enrollment-list.component';
import { EnrollmentComponent } from './pages/enrollment/enrollment.component';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  DropdownModule,
  InputNumberModule,
  InputTextareaModule,
  EditorModule,
  InputSwitchModule,
  PanelMenuModule,
  FileUploadModule,
];

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    NxWelcomeComponent,
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    CoursesListComponent,
    UserListComponent,
    UserFormComponent,
    CourseFormComponent,
    CurrencyConvertPipe,
    TopBarComponent,
    FooterComponent,
    SideMenuComponent,
    AppConfigComponent,
    EnrollmentDetailComponent,
    EnrollmentListComponent,
    EnrollmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    ...UX_MODULE,
  ],
  providers: [
    MenuService,
    ConfigService,
    CategoriesService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
