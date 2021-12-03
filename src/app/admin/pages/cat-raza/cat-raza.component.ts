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


  selectRaza: Raza = {
    id    : "",
    nombre: "",
  };

  statusSelect: boolean = true;

  razas?: Raza[];

  razaTemp:Raza = {
    id    : "1223",
    nombre: "",
  }
  


  constructor(private modalService: BsModalService,
              private razaService: RazaService,
              private changeDetection: ChangeDetectorRef) {



  }
  ngOnInit(): void {

    this.cargarRazas();
  }

  cargarRazas(){
    const value: string | null = localStorage.getItem('jwt');
    this.razaService.getRazas((value ? value : '' ))
    .subscribe(resp => { 
      this.razas = resp.result;
      console.log(this.razas);
    });
  }

  crear(){
    const value: string | null = localStorage.getItem('jwt');
    this.razaService.postRazas(this.razaTemp.nombre,(value ? value : '' ))
    .subscribe(async resp=>{
      console.log('Raza creada');
      await this.cargarRazas();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
  }

  editar(){
    const value: string | null = localStorage.getItem('jwt');

    this.razaService.putRazas(this.selectRaza, (value ? value : '' ), this.statusSelect )
    .subscribe(async resp => { 
      console.log(resp);
      await this.cargarRazas();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
  }

  
  

 async openModal(template: TemplateRef<any>, raza? : Raza) {
   if(raza){
     const raz: Raza = {
       id: raza.id,
       nombre: raza.nombre 
     }
     this.selectRaza=raz;
     this.statusSelect= true;
   }
    this.modalRef = this.modalService.show(template);
  }

  

}
