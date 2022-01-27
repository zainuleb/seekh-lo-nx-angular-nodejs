import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '@client-workspace/courses';
import { CurrencyService, CurrencyAPI } from '@client-workspace/courses';
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
  currencyData: CurrencyAPI;
  currencyId: 'PKR';
  currentCurrency: { code: string; rate: number };
  currencyOpt = ['USD', 'GBP', 'PKR'];

  constructor(
    private courseService: CourseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private currencyService: CurrencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.setCurrencyData();
    this.currentCurrency = { code: 'PKR', rate: 1 };
  }

  private setCurrencyData() {
    this.currencyService.currencyAPI().subscribe((result) => {
      this.currencyData = result;
      this.currencyOpt = Object.keys(this.currencyData.rates);
    });
  }

  getCurrency() {
    const entries = Object.entries(this.currencyData.rates);
    const value = entries.find((key) => key[0] === this.currencyId);
    this.currentCurrency = {
      code: value[0],
      rate: parseFloat(JSON.stringify(value[1])),
    };
  }

  private getCourses() {
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
            this.getCourses();
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
