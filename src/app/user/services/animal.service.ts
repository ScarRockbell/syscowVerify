import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Animal, GetAnimalsResponse, Baja, Venta, GetServiciosResponse, NewServicio, GetDiagnosticoResponse, NewDiagnostico, NewParto, GetPartosResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  url : string  = 'http://74.208.41.209:3242/';
  constructor(private http : HttpClient) { }

  postAnimal(jwt: string, animal :Animal) : Observable <any>{
    return  this.http.post<any>(`${this.url}ranch/newanimal`,{...animal,jwt});
  }

  getAnimales(jwt : string, filtro : string) : Observable <GetAnimalsResponse>{
    return this.http.post<GetAnimalsResponse>(`${this.url}ranch/animales`,{jwt,filtroBaja: filtro});
  }

  postBajaAnimal(jwt: string, baja: Baja): Observable <any>{
    return this.http.post<any>(`${this.url}ranch/animales/baja`,{jwt,...baja});
  }
  postVentaAnimal(jwt: string, venta: Venta): Observable <any>{
    return this.http.post<any>(`${this.url}ranch/opensale`,{jwt,...venta});
  }
  
  getServicios(jwt: string, idAnimal: string): Observable <GetServiciosResponse>{
    return this.http.post<GetServiciosResponse>(`${this.url}ranch/getserviciosbyanimal`,{jwt,idAnimal});
  }

  postServicio(jwt: string, servicio : NewServicio): Observable <any> {
    return this.http.post<any>(`${this.url}ranch/createservicio`,{jwt,...servicio});
  }
  
  getDiagnostico(jwt : string,  idAnimal: number): Observable <GetDiagnosticoResponse>{
    return this.http.post<any>(`${this.url}ranch/getDiagnostico`,{jwt, idAnimal});
    
  }
  postDiagnostico(jwt: string, diagnostico : NewDiagnostico): Observable <any> {
    return this.http.post<any>(`${this.url}ranch/animales/diagnostico`,{jwt,...diagnostico});
  }
  postParto(jwt: string, parto : NewParto): Observable <any> {
    return this.http.post<any>(`${this.url}ranch/registroparto`,{jwt,...parto});
  }
  getPartos (jwt: string, idAnimal: number) : Observable <GetPartosResponse>{
    return this.http.post<GetPartosResponse>(`${this.url}ranch/getpartosbyanimal`,{jwt, idAnimal});
      }

  



}
