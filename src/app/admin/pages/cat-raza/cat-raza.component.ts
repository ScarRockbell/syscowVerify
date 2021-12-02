import { Component, OnInit, TemplateRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Raza } from '../../../core/interfaces/catalogs-interfaces';
import { RazaService } from '../../../core/services/raza.service';

@Component({
  selector: 'app-cat-raza',
  templateUrl: './cat-raza.component.html',
  styleUrls: ['./cat-raza.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CatRazaComponent implements OnInit {
  modalRef?: BsModalRef;
  selectClas: Raza = {
    id    : "",
    nombre: "",
    status: true
  };
  statusSelect: boolean = true;
  razas?: Raza[];
  clasTemp:Raza = {
    id    : "1223",
    nombre: "",
    status: true
  }
  
  print(){
    console.log(this.clasTemp);
  }

  constructor(private modalService: BsModalService,
              private catService: RazaService,
              private changeDetection: ChangeDetectorRef) {

      this.razas= catService.getRazas();

  }

  crear(){
    this.catService.postRazas(this.clasTemp);
    this.razas= this.catService.getRazas();
    this.modalRef?.hide();
  }

  editar(){
    this.selectClas.status = this.statusSelect;
    this.catService.putRazas(this.selectClas);
    this.razas= this.catService.getRazas();
    this.changeDetection.detectChanges();
    this.modalRef?.hide();
  }

  
  

 async openModal(template: TemplateRef<any>, clas? : Raza) {
   if(clas){
     this.selectClas= clas;
     this.statusSelect= clas.status;
   }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
