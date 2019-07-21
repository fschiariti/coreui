import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { LoginModel } from './Login.Model';
import { Router } from '@angular/router';
import { environment} from '../../../environments/environment';
import { GlobalService } from '../../global.service';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public token: string;
    constructor(private _http: HttpClient, private _Route: Router, public global: GlobalService)
    {

    }
    private apiUrl = environment.apiEndpoint + "/api/Authenticate";
    

    public validateLoginUser(loginmodel: LoginModel)
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this._http.post<any>(this.apiUrl, loginmodel, { headers: headers })
            .pipe(tap(data =>
            {
                console.log(data);

                if (data.token != null)
                {
                    //Set id_empre of user logged in
                    this.global.setUsuario(data);

                    //this.global.setId_Empre(data.id_empre);
                    // return true to indicate successful login
                    return data;
                } else {
                    // return false to indicate failed login
                    this.global.setUsuario(null);
                    return null;
                }
            }),
                catchError(this.handleError)
            );
    }

    LogoutUser() {
        localStorage.removeItem('usuario');
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
}
