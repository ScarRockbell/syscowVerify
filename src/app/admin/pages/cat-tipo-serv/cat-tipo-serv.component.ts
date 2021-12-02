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
    nombre: "",
    status: true
  };
  statusSelect: boolean = true;
  servicios?: Servicio[];
  clasTemp:Servicio = {
    id    : "1223",
    nombre: "",
    status: true
  }
  
  print(){
    console.log(this.clasTemp);
  }

  constructor(private modalService: BsModalService,
              private catService: ServicioService,
              private changeDetection: ChangeDetectorRef) {

      this.servicios= catService.getServicios();

  }

  crear(){
    this.catService.postServicios(this.clasTemp);
    this.servicios= this.catService.getServicios();
    this.modalRef?.hide();
  }

  editar(){
    this.selectClas.status = this.statusSelect;
    this.catService.putServicios(this.selectClas);
    this.servicios= this.catService.getServicios();
    this.changeDetection.detectChanges();
    this.modalRef?.hide();
  }

  
  

 async openModal(template: TemplateRef<any>, clas? : Servicio) {
   if(clas){
     this.selectClas= clas;
     this.statusSelect= clas.status;
   }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
