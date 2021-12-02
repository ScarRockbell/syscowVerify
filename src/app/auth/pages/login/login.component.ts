import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  verificar(){
    this.loginService.postLogin(this.usuario).subscribe(resp=>{
      localStorage.setItem('jwt', resp.jswt);
      if(resp.puesto==="ADMIN"){
        console.log("Ya entre");
        this.router?.navigate(['/admin']);
      }else{
        this.router?.navigate(['/user']);
      }
    },err=>{
      console.log("Ocurrio un error",err);
    });
  }
}
