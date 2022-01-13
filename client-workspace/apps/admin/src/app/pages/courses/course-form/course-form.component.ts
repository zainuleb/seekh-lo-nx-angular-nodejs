import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CourseService, Course } from '@client-workspace/courses';
import { CategoriesService, Category } from '@client-workspace/courses';

@Component({
  selector: 'admin-course-form',
  templateUrl: './course-form.component.html',
  styles: [],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  editMode = false;
  currentCourseId: string;
  categories: Category[] = [];
  selectedCategory: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      language: ['', Validators.required],
      rating: [0, Validators.required],
      isFeatured: [false, Validators.required],
    });

    this._getCategories();
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed Adding Category',
        detail: `Empty Form`,
      });
      return;
    }

    const course: Course = {
      id: this.currentCourseId,
      title: this.courseForm.controls['title'].value,
      description: this.courseForm.controls['description'].value,
      category: this.courseForm.controls['category'].value,
      price: this.courseForm.controls['price'].value,
      language: this.courseForm.controls['language'].value,
      rating: this.courseForm.controls['rating'].value,
      isFeatured: this.courseForm.controls['isFeatured'].value,
    };

    console.log(course);

    /*     if (this.editMode) {
      this.courseService.putCourse(course).subscribe(
        (res: Course) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Course Updated Successfully',
            detail: `Name:${res.title} has been Updated`,
          });
          console.log(res);

          timer(2000)
            .toPromise()
            .then(() => this.location.back());
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed Updating Course',
            detail: `Course cannot be Updated:${err} `,
          });
        }
      );
      return;
    }

    this.courseService.postCourse(course).subscribe(
      (res: Course) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Course Added Successfully',
          detail: `Course:${res.title}`,
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed Adding Course',
          detail: `Course cannot be Added:${err} `,
        });
      }
    ); */
  }
}
