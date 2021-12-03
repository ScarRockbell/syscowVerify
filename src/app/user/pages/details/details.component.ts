import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Animal, AnimalResponse, Baja, BajaTemp, Venta } from '../../interfaces/interfaces';
import { RazaService } from '../../../core/services/raza.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Clasificacion, Raza } from 'src/app/core/interfaces/catalogs-interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: any  = 123 ;
  modalRef?: BsModalRef;
  allComplete : boolean = false;
  ventaSelect: boolean = false;
  changeVenta(event : any){
    
    this.ventaSelect = event;

  }


  miFormulario: FormGroup = this.fb.group({
    id: ['123', [Validators.required]],
    areteInterno: ['', [Validators.required]],
    areteSiniiga: ['', [Validators.required]],
    fechaNacimiento: [new Date() , [Validators.required]],
    sexo: ['', [Validators.required]],
    idRaza: ['', [Validators.required]],
    idClasificacion: ['', [Validators.required]],
  })

  formularioBaja : FormGroup = this.fb.group({
    fecha: [new Date(), [Validators.required]],
    descripcion: ['', [Validators.required]],
  })
  formularioVenta : FormGroup = this.fb.group({
    comprador: ['', [Validators.required]],
    precio: [new Date() , [Validators.required]],
  })

  animal?: AnimalResponse ;
  animales: AnimalResponse[] =[];
  baja?: BajaTemp = {
    fechaBaja: new Date(),
    descripcion: '' 
  }

  mostrarDetalles: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, 
    private animalService : AnimalService,
    private razaService : RazaService,
    private clasService : CategoriaService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')?.toString();
    this.cargarAnimal();
    this.cargarRazas();
    this.cargarClasificaciones();
  }
  clasificaciones?: Clasificacion[];
  razas?: Raza[];


  cargarAnimal(){
    
      const value: string | null = localStorage.getItem('jwt');
      this.animalService.getAnimales((value ? value : ''), "1")
      .subscribe(
        resp=>{
          this.animales= resp.result;
          for(let animal of this.animales){
            if(animal.animalID.toString() == this.id){
              this.animal = animal;
              this.resetAnimal();
            }
          }
          if(!this.animal){
            this.router.navigateByUrl('/user/animales');
          }else{
            if(this.animal.sexo === 'H'){
              this.mostrarDetalles = true;
            }
          }
        }
      );
    
  }
  cargarRazas() {
    const value: string | null = localStorage.getItem('jwt');
    this.razaService.getRazas((value ? value : ''))
      .subscribe(resp => {
        this.razas = resp.result;
        console.log(this.razas);
      });
  }
  cargarClasificaciones() {

    const value: string | null = localStorage.getItem('jwt');
    this.clasService.getClasificaciones((value ? value : ''))
      .subscribe(resp => {
        this.clasificaciones = resp.result;
        console.log(this.clasificaciones)
      });

  }
  resetAnimal(){
    this.miFormulario.reset(
      {
        id: this.animal?.animalID,
        areteInterno: this.animal?.areteInter,
        areteSiniiga: this.animal?.areteSIINIGA,
        fechaNacimiento: this.animal?.fechaNac,
        sexo: this.animal?.sexo,
        idRaza: this.animal?.idRaza, 
        idClasificacion: this.animal?.idClasific
      }
    )
  }

  redirect(route: string){
    console.log(`${route}/${this.id}`);
    this.router.navigate(['/user/servicio/aasa'], {relativeTo: this.route});  
  }

  editar(){
    this.miFormulario.markAllAsTouched();
    if(this.miFormulario.valid){
      if(this.animal?.animalID){
        const animal : Animal = {
          id: this.animal?.animalID,
          areteinterno:  this.miFormulario.get('areteInterno')?.value,
          areteSIINIGA:  this.miFormulario.get('areteSiniiga')?.value,
          fechaNacimiento: this.construirFecha(this.miFormulario.get('fechaNacimiento')?.value),
          sexo :  this.miFormulario.get('sexo')?.value,
          idRaza: this.miFormulario.get('idRaza')?.value,
          idClasificacion : this.miFormulario.get('idClasificacion')?.value
        }
        const value: string | null = localStorage.getItem('jwt');
        this.animalService.postAnimal((value ? value : ''), animal)
        .subscribe(resp=>{
          this.router.navigateByUrl('/user/animales');
        })
      }
    }
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

  

async openModal(template: TemplateRef<any>) {
 
   this.modalRef = this.modalService.show(template);
 }


 async registrarBaja(){

  if(this.animal){
    const baja : Baja = {
      idAnimal: this.animal?.animalID,
      fechaBaja: this.construirFecha(this.formularioBaja.get('fecha')?.value),
      descripcion: this.formularioBaja.get('descripcion')?.value
    }
    const value: string | null = localStorage.getItem('jwt');
    this.animalService.postBajaAnimal((value ? value : ''), baja )
    .subscribe(
      resp=>{
        if(this.ventaSelect){
          if(this.animal){
            const venta : Venta = {
              idBaja: this.animal?.animalID,
              comprador: this.formularioVenta.get('comprador')?.value,
              precio: this.formularioVenta.get('precio')?.value,
            }
            this.animalService.postVentaAnimal((value ? value : ''), venta )
            .subscribe(resp=>{
              console.log('Venta registrada');
              this.modalRef?.hide();
              this.router.navigateByUrl('/user/animales');
            })
          }
        }else{
           this.modalRef?.hide();
          this.router.navigateByUrl('/user/animales');
          
        }
      }
    )
      
  }
 }


}
