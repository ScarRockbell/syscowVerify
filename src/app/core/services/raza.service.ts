import { Injectable } from '@angular/core';
import { Raza, ResponseGetRazas } from '../interfaces/catalogs-interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  url:string="http://74.208.41.209:3242";

  constructor(private http:HttpClient) {
    
   }


  getRazas(jwt : string):Observable<ResponseGetRazas>{ 
    return this.http.post<ResponseGetRazas>(`${this.url}/admin/razaview`, {'jwt': jwt});
  }

  postRazas(nombre:string,jwt:string): Observable <any>{
    return this.http.post<any>(`${this.url}/admin/raza`,{nombre,jwt});
  }

  putRazas(raza: Raza, jwt : string, status: boolean): Observable <any>{
    return this.http.put<any>(`${this.url}/admin/clasif`,{nombre: raza.nombre, id: raza.id, jwt, status});
  }

}
