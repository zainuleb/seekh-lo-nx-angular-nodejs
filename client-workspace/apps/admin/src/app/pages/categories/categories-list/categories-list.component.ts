import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@client-workspace/courses';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;

  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
      this.loading = false;
    });
  }

  updateCategoryRedirect(categoryId: string) {
    this.router.navigate([`categories/form/${categoryId}`]);
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Category Deleted',
        });

        this.categoriesService.deleteCategory(categoryId).subscribe(
          (res) => {
            this.getCategories();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed Deleting Category`,
            });
          }
        );
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Unsuccessful',
              detail: 'You have cancelled',
            });

            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
