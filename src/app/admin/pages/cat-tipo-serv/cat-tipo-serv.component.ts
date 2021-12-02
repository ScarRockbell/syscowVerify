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
  };
  statusSelect: boolean = true;
  servicios?: Servicio[];
  clasTemp:Servicio = {
    id    : "1223",
    nombre: "",
  }
  
  print(){
    console.log(this.clasTemp);
  }

  constructor(private modalService: BsModalService,
              private catService: ServicioService,
              private changeDetection: ChangeDetectorRef) {

      

  }

  crear(){
    this.catService.postServicios(this.clasTemp);
   
    this.modalRef?.hide();
  }

  editar(){

    this.catService.putServicios(this.selectClas);
   
    this.changeDetection.detectChanges();
    this.modalRef?.hide();
  }

  
  

 async openModal(template: TemplateRef<any>, clas? : Servicio) {
   if(clas){
     this.selectClas= clas;
   }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
