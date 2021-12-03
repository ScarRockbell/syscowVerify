import { Component, OnInit, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Servicio } from '../../../core/interfaces/catalogs-interfaces';
import { ServicioService } from '../../../core/services/servicio.service';

@Component({
  selector: 'app-cat-tipo-serv',
  templateUrl: './cat-tipo-serv.component.html',
  styleUrls: ['./cat-tipo-serv.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatTipoServComponent implements OnInit {

  modalRef?: BsModalRef;
  selectClas: Servicio = {
    id    : "",
    descripcion: "",
  };
  statusSelect: boolean = true;
  servicios?: Servicio[];
  clasTemp:Servicio = {
    id    : "1223",
    descripcion: "",
  }

  constructor(private modalService: BsModalService,
              private catService: ServicioService,
              private changeDetection: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.getServicios((value ? value : '' ))
    .subscribe(resp => { 
        this.servicios = resp.result;
        console.log(this.servicios);
      });
  }

  crear(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.postServicios(this.clasTemp.descripcion, (value ? value : '' ))
    .subscribe(async resp=>{
      console.log('Tipo Servicio creado');
      await this.cargarServicios();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
   
    this.modalRef?.hide();
  }

  editar(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.putServicios(this.selectClas, (value ? value : '' ),this.statusSelect)
    .subscribe(async resp=>{
      await this.cargarServicios();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
  }

  
  

 async openModal(template: TemplateRef<any>, service? : Servicio) {
   if(service){
     const serv: Servicio={
       id: service.id,
       descripcion: service.descripcion
     }
     this.selectClas= serv;
   }
    this.modalRef = this.modalService.show(template);
  }

  

}
