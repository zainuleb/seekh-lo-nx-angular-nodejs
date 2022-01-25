import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  apiURLCourses = environment.apiURL + 'courses';

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiURLCourses);
  }

  getCourse(courseId: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiURLCourses}/${courseId}`);
  }

  postCourse(course: FormData): Observable<Course> {
    return this.http.post<Course>(this.apiURLCourses, course);
  }

  putCourse(course: FormData, courseId: string): Observable<Course> {
    return this.http.put<Course>(`${this.apiURLCourses}/${courseId}`, course);
  }

  deleteCourse(courseId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLCourses}/${courseId}`);
  }
}
