import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings : UserSettings = {
    name: 'Kargil',
    emailOffers: true,
    interfaceStyles: 'dark',
    subscriptionType: 'Annual',
    notes: 'My name is kargil...'
  }

  singleModel = 'ON';
  startDate!: Date;
  startTime!: Date;
  userRating: number = 0;
  maxRating: number = 10;
  isReadonly: boolean = false;
  userSettings: UserSettings = {...this.originalUserSettings};
  postError: boolean = false;
  postErrorMessage: string = '';
  // subscriptionType: string[] = ["Monthly", "Annual", "Lifetime"];
  subscriptionType!: Observable<string[]>;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionType = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }

  onSubmit(form: NgForm) {
    console.log("in onSubmit: " + form.valid);
    console.log("form values: ", form.value);
    if (form.valid) {
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log('sucess', result),
        error => this.onHttpError(error)
      );
    } else {
      this.postError = true;
      this.postErrorMessage = "Form is Invalid";
    }
  }

  onHttpError(errorResponse: any) {
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error;
  }

  onBlur(field: NgModel) {
    console.log("in onBlur: ", field.valid);
  }

}
