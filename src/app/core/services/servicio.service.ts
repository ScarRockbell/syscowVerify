import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatCat, ResponseGetServicios, Servicio } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  url:string="http://74.208.41.209:3242";

  constructor(private http:HttpClient) {

   }

  getServicios(jwt:string): Observable<ResponseGetServicios>{
    return this.http.post<ResponseGetServicios>(`${this.url}/admin/tiposervview`,{'jwt':jwt});
  }
  postServicios(descripcionServicio:string, jwt:string):Observable<CreatCat>{
    return this.http.post<CreatCat>(`${this.url}/admin/tiposerv`,{'jwt':jwt,'descripcion':descripcionServicio});

  }
  putServicios(clas: Servicio,jwt:string,status:boolean): Observable<any>{
    return this.http.put<any>(`${this.url}/admin/tiposerv`,{descripcion: clas.descripcion, id: clas.id, jwt, status});

  }
}