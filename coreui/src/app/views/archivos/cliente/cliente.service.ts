import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ClienteModel } from './cliente.Model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { GlobalService } from '../../../global.service';
import { LoginModel } from '../../login/Login.Model';




@Injectable({
    providedIn: 'root'
})

export class ClienteService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/cliente/";
    clienteRow: any;
    usuario: any;

    constructor(private http: HttpClient, private global: GlobalService) {
        this.clienteRow = new ClienteModel();
        this.usuario = new LoginModel();
        this.usuario = this.global.getUsuario();

    }


    // Get All Clientes by empresa
    public GetAll() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        let url = this.apiUrl + "GetAllByEmpre/" + `${this.usuario.id_empre}`;
        return this.http.get<ClienteModel[]>(url,{ headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Role By ID
    public GetById(id_cli) {
        var editUrl = this.apiUrl + id_cli;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        return this.http.get<ClienteModel>(editUrl,{ headers: headers }).pipe(tap(data =>  data),
            catchError(this.handleError)
        );
    }


    // Update Role
    public Update(clientemodel: ClienteModel) {
        var putUrl = this.apiUrl + '/' + clientemodel.id_cli;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        return this.http.put<any>(putUrl, clientemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Add Role
    public Add(clienteModel: ClienteModel) {
        clienteModel.id_empre = this.usuario.id_empre;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        return this.http.post<any>(this.apiUrl, clienteModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Delete
    public Delete(id_cli) {
        var deleteUrl = this.apiUrl + '/' + id_cli;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.usuario.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
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
