import { Injectable } from '@angular/core';
import { Clasificacion } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  clasificaciones?: Clasificacion[] = [];

  constructor() {
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

  getClasificaciones(){
    return this.clasificaciones;
  }
  postClasificaciones(clas: Clasificacion){
    this.clasificaciones?.unshift(clas);
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
