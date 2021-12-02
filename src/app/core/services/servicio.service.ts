import { Injectable } from '@angular/core';
import { Servicio } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicios?: Servicio[] = [];

  constructor() {
    this.servicios =[
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

  getServicios(){
    return this.servicios;
  }
  postServicios(clas: Servicio){
    this.servicios?.unshift(clas);
  }
  putServicios(clas: Servicio){
    if(this.servicios){
      for(let i of this.servicios){
        if(clas.id === i.id){
          clas.nombre=i.nombre;
        }
      }
    }
  }

}
