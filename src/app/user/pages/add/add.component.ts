import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clasificacion, Raza } from '../../../core/interfaces/catalogs-interfaces';
import { RazaService } from '../../../core/services/raza.service';
import { CategoriaService } from '../../../core/services/categoria.service';
import { Animal } from '../../interfaces/interfaces';
import { AnimalService } from '../../services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    id: ['123', [Validators.required]],
    areteInterno: ['', [Validators.required]],
    areteSiniiga: ['', [Validators.required]],
    fechaNacimiento: [new Date() , [Validators.required]],
    sexo: ['', [Validators.required]],
    idRaza: ['', [Validators.required]],
    idClasificacion: ['', [Validators.required]],
  })

  clasificaciones?: Clasificacion[];
  razas?: Raza[];

  constructor(
    private fb: FormBuilder,
    private razaService: RazaService,
    private clasService: CategoriaService,
    private animalService : AnimalService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.cargarRazas();
    this.cargarClasificaciones();
    
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

  crear(){
    this.miFormulario.markAllAsTouched();
    if(this.miFormulario.valid){

      const animal : Animal = {
        id: 0,
        areteinterno:  this.miFormulario.get('areteInterno')?.value,
        areteSIINIGA:  this.miFormulario.get('areteSiniiga')?.value,
        fechaNacimiento: this.construirFecha(this.miFormulario.get('fechaNacimiento')?.value),
        sexo :  this.miFormulario.get('sexo')?.value,
        idRaza: this.miFormulario.get('idRaza')?.value,
        idClasificacion : this.miFormulario.get('idClasificacion')?.value
      }
      console.log(animal);
      const value: string | null = localStorage.getItem('jwt');
      this.animalService.postAnimal((value ? value : ''), animal)
      .subscribe(resp=>{
        this.router.navigateByUrl('/user/animales');
      })

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
}

