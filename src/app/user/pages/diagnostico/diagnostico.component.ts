import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Medico } from 'src/app/core/interfaces/catalogs-interfaces';
import { MedicoService } from 'src/app/core/services';
import { AnimalResponse, Diagnostico, NewDiagnostico, ServicioCompleto, NewParto } from '../../interfaces/interfaces';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss']
})
export class DiagnosticoComponent implements OnInit {

  id: any  = 123 ;
  animal?: AnimalResponse ;
  animales: AnimalResponse[] =[];
  mostrarDetalles: boolean = false;
  diagnosticos: Diagnostico[] = [];
  modalRef?: BsModalRef;
  medicos?: Medico[] ;
  servicios : ServicioCompleto[] = [];
  diagnosticoPositivo :boolean = false;
  idDiagnostico : number = 0;

  miFormulario: FormGroup = this.fb.group({
    Fecha: [new Date() , [Validators.required]],
    IDMedico: ['', [Validators.required]],
    Descripcion: ['', [Validators.required]],
    DiasDeCarga: ['', [Validators.required]],
    CostoDiagnostico: ['', [Validators.required]],
    statusDiagnostico: ['', [Validators.required]],
  })

  partoForm: FormGroup = this.fb.group({
    fecha: [new Date() , [Validators.required]],
    tipoParto: ['', [Validators.required]],
    observaciones: ['**'],
  })


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService : AnimalService,
    private fb: FormBuilder, 
    private modalService: BsModalService,
    private medicoService : MedicoService,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarAnimal();
    this.cargarMedicos();
  }

  cargarMedicos(){
    const value: string | null = localStorage.getItem('jwt');
    this.medicoService.getMedicos((value ? value : ''))
      .subscribe(resp => {
        this.medicos = resp.result;
      });
  }


  
  cargarAnimal(){
    
    const value: string | null = localStorage.getItem('jwt');
    this.animalService.getAnimales((value ? value : ''), "1")
    .subscribe(
      resp=>{
        this.animales= resp.result;
        for(let animal of this.animales){
          if(animal.animalID.toString() == this.id){
            this.animal = animal;
          }
        }
        if(!this.animal){
          this.router.navigateByUrl('/user/animales');
        }else{
          if(this.animal.sexo === 'H'){
            this.cargarDiagnostico();
            this.mostrarDetalles = true;
          }else{
            this.router.navigateByUrl('/user/animales');
          }
        }
      }
    );
  }

  cargarDiagnostico(){
    if(this.animal){
      const value: string | null = localStorage.getItem('jwt');
      this.animalService.getDiagnostico((value ? value : '' ),this.animal.animalID)
      .subscribe(resp=>{
        console.log(resp);
        this.diagnosticos = resp.result;
      });
    }
  }

 async openModal(template: TemplateRef<any>, idDiagnostico ?: number) {
   if(idDiagnostico){
     this.idDiagnostico= idDiagnostico;
   }
  // if(clas){
  //   const claificacion: Clasificacion = {
  //    idClasificacion: clas.idClasificacion  ,
  //    nombreClasificacion: clas.nombreClasificacion
  //   }
  //   this.selectClas= claificacion;
  //   this.statusSelect= true;
  // }
  this.modalRef = this.modalService.show(template);
  this.modalRef?.setClass('modal-lg');
 }

 construirFecha(fecha : Date): string {
  var d = new Date(fecha),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

registrarParto(){
  this.partoForm.markAllAsTouched();
    if(this.partoForm.valid){
      if(this.idDiagnostico !== 0){
        const parto : NewParto = {
          idDiagnostico: this.idDiagnostico,
          observaciones: this.partoForm.get('observaciones')?.value,
          fecha: this.construirFecha(this.partoForm.get('fecha')?.value),
          tipoParto: this.partoForm.get('tipoParto')?.value,        }
          console.log(parto);
        const value: string | null = localStorage.getItem('jwt');
        this.animalService.postParto((value ? value : ''), parto)
        .subscribe( async resp=>{
          this.miFormulario.reset();
          await this.cargarDiagnostico();
          this.changeDetection.detectChanges();
          this.modalRef?.hide();
        })
      }
    }
}

 crear(){

  this.miFormulario.markAllAsTouched();
    if(this.miFormulario.valid){
      if(this.animal?.animalID){
        const diagnostico : NewDiagnostico = {
          idAnimal: this.animal?.animalID,
          fecha: this.construirFecha(this.miFormulario.get('Fecha')?.value),
          idMedico: this.miFormulario.get('IDMedico')?.value,
          descDiagnostico: this.miFormulario.get('Descripcion')?.value,
          diasDeCarga: this.miFormulario.get('DiasDeCarga')?.value,
          costo: this.miFormulario.get('CostoDiagnostico')?.value,
          statusDiagnostico: this.miFormulario.get('statusDiagnostico')?.value,
        }
        const value: string | null = localStorage.getItem('jwt');
        this.animalService.postDiagnostico((value ? value : ''), diagnostico)
        .subscribe( async resp=>{
          this.miFormulario.reset();
          await this.cargarDiagnostico();
          this.changeDetection.detectChanges();
          this.modalRef?.hide();
        })
      }
    }

 }

//  {
//   "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjEsImlhdCI6MTYzODU0NTA1MywiZXhwIjoxNjM4NTYzMDUzfQ.sSkbh3eo7hcDjW4KBJToXM32hQt1gyK_KLUs_BbFGpA",
//   "idAnimal":3,
//   "fecha":"2021-01-12",
//   "idMedico":1,
//   "descDiagnostico":"La vaca esta enferma",
//   "statusDiagnostico":"1",
//   "diasDeCarga":43,
//   "costo":45334.12
// }

}
