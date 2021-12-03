import { ChangeDetectionStrategy, ChangeDetectorRef, Component,TemplateRef,OnInit,NgModule } from '@angular/core';
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
    idMedico: "",
    nombre: "",
    especialidad: ""
  };

  statusSelect : boolean = true;

  medicos?:Medico[];

  clasTemp:Medico={
    idMedico:"1234",
    nombre:"",
    especialidad:""
  };

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.getMedicos((value ? value:'')).subscribe(resp=>{
      this.medicos=resp.result;
    })
  }
  constructor(private modalService: BsModalService,
              private catService: MedicoService,
              private changeDetection: ChangeDetectorRef) { 
  }

  crear(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.postMedicos(this.clasTemp.nombre,this.clasTemp.especialidad,(value?value:''))
    .subscribe(async resp =>{
      await this.cargarMedicos();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    })

  }

  editar(){
    const value: string | null = localStorage.getItem('jwt');
    this.catService.putMedicos(this.selectClas,(value?value:''),this.statusSelect)
    .subscribe(async resp => {
      await this.cargarMedicos();
      this.changeDetection.detectChanges();
      this.modalRef?.hide();
    });
  }

  async openModal(template: TemplateRef<any>, clas? : Medico) {
    if(clas){
      const med:Medico={
        idMedico: clas.idMedico,
        nombre: clas.nombre,
        especialidad: clas.especialidad
      }
      this.selectClas= med;
      this.statusSelect= true;
    }
     this.modalRef = this.modalService.show(template);
   }

  

}
