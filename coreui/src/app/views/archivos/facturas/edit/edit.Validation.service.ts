import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 6,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    cod_cli: '',
    nombre: '',
    fecha: ''
  };

  constructor() {
    this.errorMessages = {
      cod_cli: {
        required: 'Codigo de cliente requerido',
      },
      fecha: {
        required: 'Fecha requerida',
      },
      nombre: {
        required: 'Cantidad requerida',
      }      
    };
  }
}
