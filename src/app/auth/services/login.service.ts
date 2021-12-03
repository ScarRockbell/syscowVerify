import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserLog } from '../intrefaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  url:string="http://74.208.41.209:3242";


  postLogin(usuario:User):Observable <UserLog>{
    return this.http.post<UserLog>(`${this.url}/auth/login`,{username: usuario.username, pass: usuario.pass});
  }


}
