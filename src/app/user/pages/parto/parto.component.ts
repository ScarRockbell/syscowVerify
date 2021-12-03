import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalResponse, Parto } from '../../interfaces/interfaces';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-parto',
  templateUrl: './parto.component.html',
  styleUrls: ['./parto.component.scss']
})
export class PartoComponent implements OnInit {


  id: any  = 123 ;
  animal?: AnimalResponse ;
  animales: AnimalResponse[] =[];
  mostrarDetalles: boolean = false;
  partos: Parto[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animalService : AnimalService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cargarAnimal();
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
          console.log('No se encontro el animal');
          this.router.navigateByUrl('/user/animales');
        }else{
          this.cargarPartos();
          if(this.animal.sexo === 'H'){
            this.cargarPartos();
            this.mostrarDetalles = true;
          }else{
            this.router.navigateByUrl('/user/animales');
          }
        }
      }
    );
  }
  cargarPartos(){
    const value: string | null = localStorage.getItem('jwt');
    this.animalService.getPartos((value ? value : ''),(this.animal?.animalID ? this.animal?.animalID : 0 ))
      .subscribe(resp => {
        this.partos = resp.result;
      });
  }

}
