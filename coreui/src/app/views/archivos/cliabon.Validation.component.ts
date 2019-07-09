import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';

import { ValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidationFormsService } from './cliabon.Validation.service';
import { FormsComponent} from '../base/forms.component';


@Component({
  templateUrl: '../forms/validation-forms/validation-forms.component.html',
  styleUrls: ['../forms/validation-forms/validation-forms.component.css'],
  providers: [ ValidationFormsService ]
})

export class CliAbonValidationFormsComponent {
  simpleForm: FormGroup;
  submitted = false;
  formErrors: any;

  constructor(
    private fb: FormBuilder,
    public vf: ValidationFormsService
  ) 
  
  {
    this.formErrors = this.vf.errorMessages;
    this.createForm();
  }

  createForm() {
    this.simpleForm = this.fb.group({
      cantidad: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      id_prod: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.simpleForm.controls; }

  onReset() {

    this.submitted = false;
    this.simpleForm.reset();

  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.simpleForm.invalid) {
      return;
    }

    // TODO: Use EventEmitter with form value
    console.warn(this.simpleForm.value);
    alert('SUCCESS!');
  }
}
