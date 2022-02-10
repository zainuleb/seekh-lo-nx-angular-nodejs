import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { UserService, User } from '@client-workspace/users';
import {
  City,
  State,
  Country,
  LocationService,
} from '@client-workspace/location-dropdown';

import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat,
} from 'ngx-intl-tel-input';

@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  //Form Handling
  userForm: FormGroup;
  editMode = false;
  currentUserId: string;

  //Location Handling
  countries: Country[];
  states: State[];
  cities: City[];

  //Phone Contact Variables
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private userService: UserService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      passwordHash: ['', Validators.required],
      contact: ['', Validators.required],
      isAdmin: [[false, Validators.required]],
      street: ['', Validators.required],
      house: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.checkEditMode();
    this.getCountries();
  }

  private checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.userService.getUser(params['id']).subscribe((user) => {
          this.userForm.controls['name'].setValue(user.name);
          this.userForm.controls['email'].setValue(user.email);
          this.userForm.controls['passwordHash'].setValue(user.passwordHash);
          this.userForm.controls['contact'].setValue(user.contact);
          this.userForm.controls['isAdmin'].setValue(user.isAdmin);
          this.userForm.controls['street'].setValue(user.street);
          this.userForm.controls['house'].setValue(user.house);
          this.userForm.controls['city'].setValue(user.city);
          this.userForm.controls['state'].setValue(user.state);
          this.userForm.controls['country'].setValue(user.country);
          this.userForm.controls['role'].setValue(user.role);
        });
      }
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed Adding User',
        detail: `Empty Form`,
      });
      return;
    }

    const formData = new FormData();

    Object.keys(this.userForm.controls).map((key) => {
      formData.append(key, this.userForm.controls[key].value);
    });

    if (this.editMode) {
      this.userEdit(formData);
    } else {
      this.userAdd(formData);
    }

    this.userForm.reset();
  }

  private userAdd(formData: FormData) {
    this.userService.postUser(formData).subscribe(
      (res: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'user Added Successfully',
          detail: `user:${res.name}`,
        });
        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed Adding user',
          detail: `user cannot be Added:${err} `,
        });
      }
    );
  }

  private userEdit(formData: FormData) {
    this.userService.putUser(formData, this.currentUserId).subscribe(
      (res: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'user Updated Successfully',
          detail: `Name:${res.name} has been Updated`,
        });

        timer(2000)
          .toPromise()
          .then(() => this.location.back());
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed Updating user',
          detail: `user cannot be Updated:${err} `,
        });
      }
    );
  }

  private getCountries() {
    return this.locationService.getCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  getStates() {
    return this.locationService
      .getStates(this.userForm.controls['country'].value.id)
      .subscribe((res) => {
        this.states = res;
      });
  }
  getCities() {
    return this.locationService
      .getCities(
        this.userForm.controls['country'].value.id,
        this.userForm.controls['state'].value.id
      )
      .subscribe((res) => {
        this.cities = res;
      });
  }
}
