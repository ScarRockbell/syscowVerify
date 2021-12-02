import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  medicos?: Medico[];
  constructor() { 
    this.medicos=[
      {
        id:"123",
        nombre:"Pedro",
        especialidad:"Vacas",
        status:true
      },
      {
        id:"945",
        nombre:"Juan",
        especialidad:"Ganado",
        status:false
      },
      {
        id:"654",
        nombre:"Angel",
        especialidad:"Becerros",
        status:true
      }
    ]
  }
  getMedicos(){
    return this.medicos;
  }

  postMedicos(clas:Medico){
    this.medicos?.unshift(clas);
  }

  putMedicos(clas:Medico){
    if(this.medicos){
      for(let i of this.medicos){
        if(clas.id===i.id){
          clas.nombre=i.nombre;
          clas.especialidad=i.especialidad;
        }
      }
    }
  }
}
