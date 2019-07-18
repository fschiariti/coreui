import { Injectable, Directive } from '@angular/core';
@Injectable()
export class GlobalService {
    private id_empre;
    private token;
    constructor() { }
    setId_Empre(val) {
      localStorage.setItem("id_empre", val);
      this.id_empre = val;
    }
    getId_Empre() {
      this.id_empre = localStorage.getItem("id_empre");
      return this.id_empre;
    }

    setToken(val) {
      localStorage.setItem("token", val);
      this.token = val;
   }
    getToken() {
      this.token = localStorage.getItem("token");
      return this.token;
    }

}