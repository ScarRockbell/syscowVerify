import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clasificacion, CreatCat, ResponseGetClasificaciones } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url:string="http://74.208.41.209:3242";

  constructor(private http:HttpClient) {
    
   }


  getClasificaciones(jwt : string):Observable<ResponseGetClasificaciones>{ 
    return this.http.post<ResponseGetClasificaciones>(`${this.url}/admin/clasifview`, {'jwt': jwt});
  }

  postClasificaciones(nombreClasificacion:string,jwt:string): Observable <CreatCat>{
    return this.http.post<CreatCat>(`${this.url}/admin/clasif`,{nombreClasificacion,jwt});
  }
  putClasificaciones(clas: Clasificacion, jwt : string, status: boolean): Observable <any>{
    return this.http.put<any>(`${this.url}/admin/clasif`,{nombre: clas.nombreClasificacion, id: clas.idClasificacion, jwt, status});
  }

}
