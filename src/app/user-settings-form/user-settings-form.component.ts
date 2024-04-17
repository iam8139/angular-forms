import { Component, OnInit } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';

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

  userSettings: UserSettings = {...this.originalUserSettings};

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log("in onSubmit: " + form.valid);
  }

  onBlur(field: NgModel) {
    console.log("in onBlur: ", field.valid);
  }

}
