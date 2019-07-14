import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { RegisterModel } from './register.Model';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  private _registerservice;


  constructor(private _Route: Router, registerservice: RegisterService,  
    private ngxService: NgxUiLoaderService) { 
    this._registerservice = registerservice;

  }

  RegisterModel: RegisterModel = new RegisterModel();


  onSubmit() 
  {
    this.ngxService.start();
    this._registerservice.registerUser(this.RegisterModel).subscribe(
        response => 
        {     

            if (response != null ) 
            {

              if (this.RegisterModel.new_password == this.RegisterModel.password)  {

                alert('Se generó la nueva cuenta');
                this._Route.navigate(['/login']);
                this.ngxService.stop();   
              } 
              else
              {
                alert('Los password no coinciden');
                this.ngxService.stop(); 
              }                


            } else {

              alert('Datos incorrectos');
              this.ngxService.stop(); 
            }

        });

  }

  login() {
    this._Route.navigate(['/login']);
  }
}

