import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaswordValidators } from './password.validators';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder){
    this.form = fb.group({
      oldPassword: ['',
        Validators.required,
        PaswordValidators.checkOldPassword],
      newPassword: ['', Validators.required],
      cnfPassword: ['', Validators.required]
    }, {
      validators: PaswordValidators.checkMatchPassword
    })
  }
  
  login(){
    console.log('Submit');
  }

  get oldPassword(){
    return this.form.get('oldPassword');
  }
  get newPassword(){
    return this.form.get('newPassword');
  }
  get cnfPassword(){
    return this.form.get('cnfPassword');
  }

}
