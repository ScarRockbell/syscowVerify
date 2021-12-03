import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalResponse, Servicio } from '../../interfaces/interfaces';
import { AnimalService } from '../../services/animal.service';

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


  servicios : Servicio[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService : AnimalService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarAnimal();
    
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
  //  this.modalRef = this.modalService.show(template);
 }

}
