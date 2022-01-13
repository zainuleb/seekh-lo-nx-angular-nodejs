import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '@client-workspace/courses';

import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'admin-courses-list',
  templateUrl: './courses-list.component.html',
  styles: [],
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCourses();
  }

  private _getCourses() {
    this.courseService.getCourses().subscribe((course) => {
      this.courses = course;
    });
  }

  updateCourseRedirect(courseId: string) {
    this.router.navigateByUrl(`courses/form/${courseId}`);
  }

  deleteCourse(courseId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Course?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Course Deleted',
        });

        this.courseService.deleteCourse(courseId).subscribe(
          (res) => {
            this._getCourses();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed Deleting Course`,
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
