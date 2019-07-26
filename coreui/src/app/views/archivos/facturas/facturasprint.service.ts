import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FacturasModel } from './facturas.Model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlobalService } from '../../../global.service';
import { LoginModel } from '../../login/Login.Model';



@Injectable({
    providedIn: 'root'
})

export class FacturasPrintService {
    private apiUrl = environment.apiEndpoint + "/api/hventa/";
    row: any;
    usuario: any;

    constructor(private http: HttpClient, private global: GlobalService) {
        this.row = new FacturasModel();
        this.usuario = new LoginModel();
        this.usuario = this.global.getUsuario();
    }

    // Get  By ID
    public GetById(id_comp) {
        var editUrl = this.apiUrl + id_comp;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        return this.http.get<FacturasModel>(editUrl,{ headers: headers }).pipe(tap(data =>  data),
            catchError(this.handleError)
        );
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
