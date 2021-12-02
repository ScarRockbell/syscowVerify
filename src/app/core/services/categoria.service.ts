import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clasificacion, CreatCat, getCat } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url:string="http://74.208.41.209:3242";

  clasificaciones?: Clasificacion[] = [];

  constructor(private http:HttpClient) {
    this.clasificaciones =[
      {
        id: "1a2421",
        nombre: "Clas1",
        status: true
      },
      {
        id: "1a2422",
        nombre: "Clas2",
        status: false
      },
      {
        id: "1a2423",
        nombre: "Clas3",
        status: true
      },
    ]
   }

  getClasificaciones(jwt:string):Observable<getCat>{
    return this.http.post<getCat>(`${this.url}/admin/clasifview`,jwt);
  }
  postClasificaciones(nombre:string,jwt:string): Observable <CreatCat>{
    return this.http.post<CreatCat>(`${this.url}/admin/clasif`,{nombre,jwt});
  }
  putClasificaciones(clas: Clasificacion){
    if(this.clasificaciones){
      for(let i of this.clasificaciones){
        if(clas.id === i.id){
          clas.nombre=i.nombre;
        }
      }
    }
  }

}
