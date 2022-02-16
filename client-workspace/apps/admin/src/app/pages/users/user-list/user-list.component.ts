import { Component, OnInit } from '@angular/core';
import { UserService, User } from '@client-workspace/users';
import { Router } from '@angular/router';

import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe((user) => {
      this.users = user;
      console.log(this.users);
    });
  }

  updateUserRedirect(userId: string) {
    this.router.navigate(['/admin/users/update', userId]);
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'User Deleted',
        });

        this.userService.deleteUser(userId).subscribe(
          (res) => {
            this.getUsers();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Failed Deleting User`,
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
