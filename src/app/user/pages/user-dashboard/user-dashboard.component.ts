import { Component, OnInit } from '@angular/core';
import { EdadGanado } from '../../interfaces/reportes-interfaces';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  reporteEdadGanado?:EdadGanado[];
  basicOptions : any;
  dataGraficaEdadPorAnimal : any;

  columnasEdadPorAnima: any;
  filasEdadPorAnima: any;

  constructor(
    private repService : ReportesService
  ) { }

  ngOnInit(): void {
    this.edadPorAnimal();
    this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: 'black'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: 'black'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          },
          y: {
              ticks: {
                  color: 'black'
              },
              grid: {
                  color: 'rgba(255,255,255,0.2)'
              }
          }
      }
  };
  }


  edadPorAnimal(){
    const value: string | null = localStorage.getItem('jwt');
    this.repService.getEdadGanado((value ? value : ' '))
    .subscribe(resp=>{
      this.reporteEdadGanado=resp.result;
      this.columnasEdadPorAnima = this.reporteEdadGanado?.map(animal=> {return animal.Anios} );
      this.filasEdadPorAnima = this.reporteEdadGanado?.map(animal=> {return animal.Total} );
      this.configurarEdadPorAnimal();
    });
  }

  configurarEdadPorAnimal(){
    this.dataGraficaEdadPorAnimal = {
      labels: this.columnasEdadPorAnima,
      datasets: [
          {
              label: 'Años',
              backgroundColor: '#42A5F5',
              data: this.filasEdadPorAnima
          }
      ]
  };
  }

}
