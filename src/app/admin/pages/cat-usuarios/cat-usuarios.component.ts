import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Usuario } from 'src/app/core/interfaces/catalogs-interfaces';
import { UsuarioService } from 'src/app/core/services';

@Component({
  selector: 'app-cat-usuarios',
  templateUrl: './cat-usuarios.component.html',
  styleUrls: ['./cat-usuarios.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatUsuariosComponent implements OnInit {

  modalRef?:BsModalRef;

  selectClas:Usuario= {
    idUsuario:"",
    nombreUsuario:"",
    puesto:"",
    telefono:"",
    contraseniaUsuario:""
  };
  statusSelect:boolean=true;
  usuarios?:Usuario[];
  clasTemp:Usuario={
    idUsuario:"1234",
    nombreUsuario:"",
    puesto:"",
    telefono:"",
    contraseniaUsuario:""
  }
  constructor(private modalService:BsModalService,
              private catService: UsuarioService,
              private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarUsusario();
  }

  cargarUsusario(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.getUsuarios((value ? value : '')).subscribe(resp=>{
      this.usuarios=resp.result;
    })
  }

  crear(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.postUsuarios(this.clasTemp,(value ? value : '')).subscribe(async resp=>{
      await this.cargarUsusario();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    })
  }

  editar(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.putUsuarios(this.selectClas,(value ? value : ''),this.statusSelect)
    .subscribe(async resp=>{
      await this.cargarUsusario();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    })
  }

  async openModal(template: TemplateRef<any>, user? : Usuario) {
    if(user){
      const usua: Usuario = {
        idUsuario:user.idUsuario,
        nombreUsuario:user.nombreUsuario,
        puesto:user.puesto,
        telefono:user.telefono,
        contraseniaUsuario:user.contraseniaUsuario
      }
      this.selectClas= usua;
      this.statusSelect=true;
    }
     this.modalRef = this.modalService.show(template);
   }
   

}
