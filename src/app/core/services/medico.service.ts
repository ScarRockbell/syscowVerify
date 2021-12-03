import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatCat, Medico, ResponseGetMedicos } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url:string="http://74.208.41.209:3242";

  constructor(private http:HttpClient){}
  getMedicos(jwt:string):Observable<ResponseGetMedicos>{
    return this.http.post<ResponseGetMedicos>(`${this.url}/admin/medicoview`,{'jwt':jwt});
  }

  postMedicos(nombreMedico:string,especialidadMedico:string,jwt:string):Observable<CreatCat>{
    return this.http.post<CreatCat>(`${this.url}/admin/medico`,{'jwt':jwt,'nombre':nombreMedico,'especialidad':especialidadMedico});
  }

  putMedicos(clas:Medico,jwt:string,status:boolean):Observable<any>{
    return this.http.put<any>(`${this.url}/admin/medico`,{idMedico:clas.idMedico,especialidad:clas.especialidad,nombre:clas.nombre,jwt,status});
  }
}
