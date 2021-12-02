import { Component, OnInit, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Clasificacion } from '../../../core/interfaces/catalogs-interfaces';
import { CategoriaService } from '../../../core/services/categoria.service';

@Component({
  selector: 'app-cat-clasif',
  templateUrl: './cat-clasif.component.html',
  styleUrls: ['./cat-clasif.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatClasifComponent implements OnInit {

  modalRef?: BsModalRef;
  selectClas: Clasificacion = {
    id    : "",
    nombre: "",
    status: true
  };
  statusSelect: boolean = true;
  clasificaciones?: Clasificacion[];
  clasTemp:Clasificacion = {
    id    : "1223",
    nombre: "",
    status: true
  }
  
  print(){
    console.log(this.clasTemp);
  }

  constructor(private modalService: BsModalService,
              private catService: CategoriaService,
              private changeDetection: ChangeDetectorRef) {

      this.clasificaciones= catService.getClasificaciones();

  }

  crear(){
    this.catService.postClasificaciones(this.clasTemp);
    this.clasificaciones= this.catService.getClasificaciones();
    this.modalRef?.hide();
  }

  editar(){
    this.selectClas.status = this.statusSelect;
    this.catService.putClasificaciones(this.selectClas);
    this.clasificaciones= this.catService.getClasificaciones();
    this.changeDetection.detectChanges();
    this.modalRef?.hide();
  }

  
  

 async openModal(template: TemplateRef<any>, clas? : Clasificacion) {
   if(clas){
     this.selectClas= clas;
     this.statusSelect= clas.status;
   }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}

