import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../../services/animal.service';
import { Animal, AnimalResponse } from '../../interfaces/interfaces';
import {Sort} from '@angular/material/sort';



@Component({
  selector: 'app-animales',
  templateUrl: './animales.component.html',
  styleUrls: ['./animales.component.scss']
})
export class AnimalesComponent implements OnInit {

  constructor(private animalService : AnimalService) { }

  filtro: string = '1';
  animales : AnimalResponse[] = [];
  sortedData: AnimalResponse[] = [];
  dataAnimales: AnimalResponse[] = [];
  selectedValue : string = 'val1  '

  ngOnInit(): void {

    this.obtenerAnimales();

  }

  obtenerAnimales(){
    const value: string | null = localStorage.getItem('jwt');
    this.animalService.getAnimales((value ? value : ''), this.filtro)
    .subscribe(
      resp=>{
        this.animales = resp.result;
        this.dataAnimales = resp.result;
      }
    );
  }

  sortData(sort: Sort ) {
    const data = this.animales;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.animalID, b.animalID, isAsc);
        case 'arete':
          return this.compare(a.areteInter, b.areteInter, isAsc);
        case 'siniiga':
          return this.compare(a.areteSIINIGA, b.areteSIINIGA, isAsc);
        case 'sexo':
          return this.compare(a.sexo, b.sexo, isAsc);
        case 'clasificacion':
          return this.compare(a.clasifiacion, b.clasifiacion, isAsc);
        case 'raza':
          return this.compare(a.raza, b.raza, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }



}
