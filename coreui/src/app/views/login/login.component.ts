import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './Login.Model';
import { LoginService } from './login.service';


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


    constructor(private _Route: Router, loginservice: LoginService) 
    {
        this._loginservice = loginservice;
    }

    LoginModel: LoginModel = new LoginModel();

    onSubmit() 
    {
        this._loginservice.validateLoginUser(this.LoginModel).subscribe(
            response => 
            {     
                //alert(response);

                if (response != null ) 
                {

                  this._Route.navigate(['/dashboard']);

                } else {

                  alert('usuario inválido');
                  this._Route.navigate(['/login']);

                }

            });

    }
}