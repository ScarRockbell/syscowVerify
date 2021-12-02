import { ChangeDetectionStrategy, ChangeDetectorRef, Component,TemplateRef,OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medico } from 'src/app/core/interfaces/catalogs-interfaces';
import { MedicoService } from 'src/app/core/services';

@Component({
  selector: 'app-cat-medicos',
  templateUrl: './cat-medicos.component.html',
  styleUrls: ['./cat-medicos.component.scss'],
  changeDetection : ChangeDetectionStrategy.Default
})
export class CatMedicosComponent implements OnInit {
  modalRef?:BsModalRef;
  selectClas: Medico = {
    id: "",
    nombre: "",
    especialidad: "",
    status: true
  };
  statusSelect:boolean=true;
  medicos?:Medico[];
  clasTemp:Medico={
    id:"1234",
    nombre:"",
    especialidad:"",
    status:true
  };

  print(){
    console.log(this.clasTemp);
  }
  constructor(private modalService: BsModalService,
              private catService: MedicoService,
              private changeDetection: ChangeDetectorRef) { 
              
                this.medicos=catService.getMedicos();
  }

  crear(){
    this.catService.postMedicos(this.clasTemp);
    this.medicos= this.catService.getMedicos();
    this.modalRef?.hide();
  }

  editar(){
    this.selectClas.status = this.statusSelect;
    this.catService.putMedicos(this.selectClas);
    this.medicos= this.catService.getMedicos();
    this.changeDetection.detectChanges();
    this.modalRef?.hide();
  }

  async openModal(template: TemplateRef<any>, clas? : Medico) {
    if(clas){
      this.selectClas= clas;
      this.statusSelect= clas.status;
    }
     this.modalRef = this.modalService.show(template);
   }

  ngOnInit(): void {
  }

}
