import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@client-workspace/courses';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit {
  categoriesForm: FormGroup;
  editMode = false;
  currentCategoryId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoriesForm = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff'],
    });

    this.checkEditMode();
  }

  onSubmit() {
    if (this.categoriesForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed Adding Category',
        detail: `Empty Form`,
      });
      return;
    }

    const category: Category = {
      _id: this.currentCategoryId,
      name: this.categoriesForm.controls['name'].value,
      icon: this.categoriesForm.controls['icon'].value,
      color: this.categoriesForm.controls['color'].value,
    };

    if (this.editMode) {
      this.categoriesService.putCategory(category).subscribe(
        (res: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Category Updated Successfully',
            detail: `Name:${res.name} has been Updated`,
          });
          console.log(res);

          timer(2000)
            .toPromise()
            .then(() => this.location.back());
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed Updating Category',
            detail: `Category cannot be Updated:${err} `,
          });
        }
      );
      return;
    }

    this.categoriesService.postCategory(category).subscribe(
      (res: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Category Added Successfully',
          detail: `Name:${res.name}`,
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed Adding Category',
          detail: `Category cannot be Added:${err} `,
        });
      }
    );
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService
          .getCategory(this.currentCategoryId)
          .subscribe((cat) => {
            this.categoriesForm.controls['name'].setValue(cat.name);
            this.categoriesForm.controls['icon'].setValue(cat.icon);
            this.categoriesForm.controls['color'].setValue(cat.color);
          });
      }
    });
  }
}
