import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatCat, ResponseGetUsuarios, Usuario } from '../interfaces/catalogs-interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string="http://74.208.41.209:3242";
  constructor(private http:HttpClient) { }

  getUsuarios(jwt:string):Observable<ResponseGetUsuarios>{
    return this.http.post<ResponseGetUsuarios>(`${this.url}/admin/userview`,{'jwt':jwt});
  }

  postUsuarios(usuario:Usuario,jwt:string):Observable<CreatCat>{
    return this.http.post<CreatCat>(`${this.url}/admin/user`,{'jwt':jwt,'nombreUsuario':usuario.nombreUsuario,
    'puesto':usuario.puesto,'contraseniaUsuario':usuario.contraseniaUsuario,'telefono':usuario.telefono});
  }

  putUsuarios(usuario:Usuario,jwt:string,status:boolean):Observable<any>{
    return this.http.put<any>(`${this.url}/admin/user`,{'jwt':jwt,'nombreUsuario':usuario.nombreUsuario,
    'puesto':usuario.puesto,'idUsuario':usuario.idUsuario,'telefono':usuario.telefono,'status':status});

  }
}
