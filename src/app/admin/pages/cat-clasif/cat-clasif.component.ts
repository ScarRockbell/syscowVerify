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
    idClasificacion    : "",
    nombreClasificacion: "",
  };

  statusSelect: boolean = true;

  clasificaciones?: Clasificacion[];

  clasTemp:Clasificacion = {
    idClasificacion    : "1223",
    nombreClasificacion: "",
  }
  
 

  constructor(private modalService: BsModalService,
              private catService: CategoriaService,
              private changeDetection: ChangeDetectorRef) {
        
        
          

  }
  ngOnInit(): void {

  this.cargarClasificaciones();
  
  }
  
  cargarClasificaciones(){

    const value: string | null = localStorage.getItem('jwt');
      this.catService.getClasificaciones((value ? value : '' ))
      .subscribe(resp => { 
        this.clasificaciones = resp.result;
        console.log(this.clasificaciones)
      });

  }

  crear(){
    const value: string | null = localStorage.getItem('jwt');
     this.catService.postClasificaciones(this.clasTemp.nombreClasificacion,(value ? value : '' ))
     .subscribe(async resp=>{
       console.log('Clasificacion creada');
       await this.cargarClasificaciones();
       this.changeDetection.detectChanges();
       this.modalRef?.hide();
     });
  }

  editar(){
    const value: string | null = localStorage.getItem('jwt');
    
    this.catService.putClasificaciones(this.selectClas, (value ? value : '' ), this.statusSelect)
    .subscribe(async resp => { 
      console.log(resp);
      await this.cargarClasificaciones();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
    //this.clasificaciones= this.catService.getClasificaciones(JSON.stringify(localStorage.getItem("jwt")));
  }

  
  

 async openModal(template: TemplateRef<any>, clas? : Clasificacion) {
   if(clas){
     const claificacion: Clasificacion = {
      idClasificacion: clas.idClasificacion  ,
      nombreClasificacion: clas.nombreClasificacion
     }
     this.selectClas= claificacion;
     this.statusSelect= true;
   }
    this.modalRef = this.modalService.show(template);
  }


}

