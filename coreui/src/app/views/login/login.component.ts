import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './Login.Model';
import { LoginService } from './login.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService



@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})


export class LoginComponent implements OnInit
{
    
    ngOnInit(): void {
        localStorage.clear();
    }
    private _loginservice;
    output: any;

    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;


    constructor(private _Route: Router, loginservice: LoginService,  private ngxService: NgxUiLoaderService) 
    {
        this._loginservice = loginservice;
    }

    LoginModel: LoginModel = new LoginModel();

    register() {
      this._Route.navigate(['/register']);
    }

    onSubmit() 
    {
        this.ngxService.start();
        this._loginservice.validateLoginUser(this.LoginModel).subscribe(
            response => 
            {     
                //alert(response);

                if (response != null ) 
                {

                  if (response.usuario == this.LoginModel.usuario)  {
                    localStorage.setItem('usuario', JSON.stringify(this.LoginModel));

                    this._Route.navigate(['/dashboard']);
                    this.ngxService.stop();   
                  } 
                  else
                  {
                    alert('usuario inválido');
                    this._Route.navigate(['/login']);
                    this.ngxService.stop(); 
  
                  }                


                } else {

                  alert('usuario inválido');
                  this._Route.navigate(['/login']);
                  this.ngxService.stop(); 

                }

            });

    }
}