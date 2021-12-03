import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalResponse, ServicioCompleto, NewServicio } from '../../interfaces/interfaces';
import { AnimalService } from '../../services/animal.service';
import { Medico, Servicio } from '../../../core/interfaces/catalogs-interfaces';
import { MedicoService } from '../../../core/services/medico.service';
import { ServicioService } from 'src/app/core/services';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {
  id: any  = 123 ;
  animal?: AnimalResponse ;
  animales: AnimalResponse[] =[];
  mostrarDetalles: boolean = false;
  medicos?: Medico[] ;
  tipoServicios?: Servicio[];


  miFormulario: FormGroup = this.fb.group({
    IDTipoServicio: ['', [Validators.required]],
    FechaServicio: [new Date() , [Validators.required]],
    IDMedico: ['', [Validators.required]],
    Costo: ['', [Validators.required]],
  })


  cargarMedicos(){
    const value: string | null = localStorage.getItem('jwt');
    this.medicoService.getMedicos((value ? value : ''))
      .subscribe(resp => {
        this.medicos = resp.result;
      });
  }
  cargarTipoServicios(){
    const value: string | null = localStorage.getItem('jwt');
    this.tipoServService.getServicios((value ? value : ''))
      .subscribe(resp => {
        this.tipoServicios = resp.result;
      });
  }

  servicios : ServicioCompleto[] = [];
  modalRef?: BsModalRef;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private router: Router,
    private animalService : AnimalService,
    private medicoService : MedicoService,
    private tipoServService : ServicioService,
    private modalService: BsModalService,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarAnimal();
    this.cargarMedicos();
    this.cargarTipoServicios();
    
  }

  redirect(route: string){
    console.log(`${route}/${this.id}`);
    this.router.navigate(['/user/servicio/aasa'], {relativeTo: this.route});  
  }

  cargarServicios(){
    if(this.animal){
      const value: string | null = localStorage.getItem('jwt');
      this.animalService.getServicios((value ? value : '' ),this.animal.animalID.toString())
      .subscribe(resp=>{
        this.servicios = resp.result;
      });
    }
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
          this.cargarServicios();
          if(this.animal.sexo === 'H'){
            this.mostrarDetalles = true;
          }
        }
      }
    );
  }

 async openModal(template: TemplateRef<any>) {
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


 crear(){

  this.miFormulario.markAllAsTouched();
    if(this.miFormulario.valid){
      if(this.animal?.animalID){
        const servicio : NewServicio = {
          idAnimal: this.animal?.animalID.toString(),
          idTipoServicio: this.miFormulario.get('IDTipoServicio')?.value,
          fecha: this.construirFecha(this.miFormulario.get('FechaServicio')?.value),
          idMedico:  this.miFormulario.get('IDMedico')?.value,
          costo:  this.miFormulario.get('Costo')?.value,
        }
        const value: string | null = localStorage.getItem('jwt');
        this.animalService.postServicio((value ? value : ''), servicio)
        .subscribe( async resp=>{
          this.miFormulario.reset();
          await this.cargarServicios();
          this.changeDetection.detectChanges();
          this.modalRef?.hide();
        })
      }
    }

 }

}
