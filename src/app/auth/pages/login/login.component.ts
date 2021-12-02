import { Component, OnInit } from '@angular/core';
import { User } from '../../intrefaces/usuario';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:User={
    username:"",
    pass:""
  }
  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  verificar(){
    this.loginService.postLogin(this.usuario).subscribe(resp=>{
      localStorage.setItem('jwt', resp.jswt);
    },err=>{
      console.log("Ocurrio un error");
    });
  }
}
