import { Injectable } from '@angular/core';
import { Raza } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RazaService {

  razas?: Raza[] = [];

  constructor() {
    this.razas =[
      {
        id: "1a2421",
        nombre: "Clas1",
        status: false
      },
      {
        id: "1a2422",
        nombre: "Clas2",
        status: false
      },
      {
        id: "1a2423",
        nombre: "Clas3",
        status: false
      },
    ]
   }

  getRazas(){
    return this.razas;
  }
  postRazas(clas: Raza){
    this.razas?.unshift(clas);
  }
  putRazas(clas: Raza){
    if(this.razas){
      for(let i of this.razas){
        if(clas.id === i.id){
          clas.nombre=i.nombre;
        }
      }
    }
  }

}
