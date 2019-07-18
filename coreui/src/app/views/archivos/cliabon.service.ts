import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CliAbonModel } from './cliabon.Model';
import { CliAbonListModel } from './cliabonList.Model';
import { Router } from '@angular/router';
import{ environment } from '../../../environments/environment';
import { GlobalService } from '../../global.service';


@Injectable({
    providedIn: 'root'
})

export class CliAbonService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/cliabon/";
    private apiListUrl = environment.apiEndpoint + "/api/compvta/";
    token: any;
    id_empre: any;
    username: any;
    clienteRow: any;

    constructor(private http: HttpClient, private global: GlobalService) {
        this.token = this.global.getToken();
        this.id_empre = this.global.getId_Empre();
        this.clienteRow = new CliAbonModel();
    }


    // Get All 
    public GetAll() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        let url = this.apiUrl + "GetAllByEmpre/" + `${this.id_empre}`;
        return this.http.get<CliAbonModel[]>(url,{ headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get  By ID
    public GetById(id_abon) {
        var editUrl = this.apiUrl + id_abon;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<CliAbonModel>(editUrl,{ headers: headers }).pipe(tap(data =>  data),
            catchError(this.handleError)
        );
    }


    // Update
    public Update(clientemodel: CliAbonModel) {
        var putUrl = this.apiUrl + '/' + clientemodel.id_abon;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(putUrl, clientemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Add 
    public Add(clienteModel: CliAbonModel) {
        clienteModel.id_empre = this.id_empre;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, clienteModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // AddList
    public AddList(cliabonList:  CliAbonListModel[]) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiListUrl, cliabonList, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    // Delete
    public Delete(id_abon) {
        var deleteUrl = this.apiUrl + '/' + id_abon;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
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
