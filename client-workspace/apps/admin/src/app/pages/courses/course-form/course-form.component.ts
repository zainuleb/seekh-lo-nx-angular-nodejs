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
  imageDisplay: string | ArrayBuffer | null;

  featureOpt = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  langOpt = [
    { label: 'English', value: 'english' },
    { label: 'Urdu', value: 'urdu' },
  ];

  ratingOpt = [
    { label: '5', value: 5 },
    { label: '4', value: 4 },
    { label: '3', value: 3 },
    { label: '2', value: 2 },
    { label: '1', value: 1 },
  ];

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
      richDescription: ['', Validators.required],
      image: ['', Validators.required],
      images: [['']],
      category: [Category, Validators.required],
      price: ['', Validators.required],
      language: ['', Validators.required],
      rating: [0, Validators.required],
      isFeatured: [false, Validators.required],
    });

    this.getCategories();
    this.checkEditMode();
  }

  private getCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentCourseId = params['id'];
        this.courseService.getCourse(params['id']).subscribe((course) => {
          this.courseForm.controls['title'].setValue(course.title);
          this.courseForm.controls['category'].setValue(course.category._id);
          this.courseForm.controls['language'].setValue(course.language);
          this.courseForm.controls['price'].setValue(course.price);
          this.courseForm.controls['rating'].setValue(course.rating);
          this.courseForm.controls['isFeatured'].setValue(course.isFeatured);
          this.courseForm.controls['description'].setValue(course.description);
          this.courseForm.controls['richDescription'].setValue(
            course.richDescription
          );
          this.imageDisplay = course.image;
          this.courseForm.controls['image'].setValidators([]);
          this.courseForm.controls['image'].updateValueAndValidity();
        });
      }
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

    const formData = new FormData();

    Object.keys(this.courseForm.controls).map((key) => {
      formData.append(key, this.courseForm.controls[key].value);
    });

    if (this.editMode) {
      this.courseEdit(formData);
    } else {
      this.courseAdd(formData);
    }

    this.courseForm.reset();
    this.imageDisplay = null;
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      this.courseForm.patchValue({ image: file });
      this.courseForm!.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private courseAdd(formData: FormData) {
    this.courseService.postCourse(formData).subscribe(
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
    );
  }

  private courseEdit(formData: FormData) {
    this.courseService.putCourse(formData, this.currentCourseId).subscribe(
      (res: Course) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Course Updated Successfully',
          detail: `Name:${res.title} has been Updated`,
        });

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
  }
}
