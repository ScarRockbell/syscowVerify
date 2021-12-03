import { Component, OnInit } from '@angular/core';
import { ChartData, DataSets, EdadGanado, GanadoClasif, GastosAnio, VentasAnio } from '../../interfaces/reportes-interfaces';
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


  //GRAFICA GASTOS POR AÑO
  reporteGastoAnio:GastosAnio[]=[];
  gastosAnio: number =0;
  dataGastosPorAnio : any;
  totalGastos: any;
  totalventas: any;
  dataGastos: any;
  
  //GraficaVentas
  reporteVentasAnio: VentasAnio[] =  [];
  dadaVentasPorAnio : any;
  
  //Combinada
  dataVentasGastos:any;
  
  //Clasificacion
  reporteClasificacion:GanadoClasif[]=[];
  dataClasificacion: any;

  constructor(
    private repService : ReportesService
  ) { }

  ngOnInit(): void {
    this.edadPorAnimal();
    this.gastosPorAnio();
    this.ventasPorAnio();
    this.generarClasificacion();
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

  configurarCombinada(){
    let gastos =0;
    let ventas =0;
    if(this.totalGastos ){
       for(let i of this.totalGastos) gastos+=i;
    }
    if(this.totalventas){
       for(let i of this.totalventas) ventas+=i;
    }
    this.dataVentasGastos = this.formatoGrafica(['Ventas','Gastos'],[ventas,gastos],'Cantidad');
    console.log(ventas,gastos);
  };

  generarClasificacion(){
    const value: string | null = localStorage.getItem('jwt');
    this.repService.getGanadoClasificacion((value ? value : ' '))
    .subscribe(resp=>{
      this.reporteClasificacion = resp.result[0];
      let clasificaciones = this.reporteClasificacion.map(animal => animal.nombreClasificacion);
      let datos = this.reporteClasificacion.map(animal => animal.total);

      this.dataClasificacion = {
        labels: clasificaciones,
        datasets: [
            {
                data: datos,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }
        ]
    };
      this.columnasEdadPorAnima = this.reporteEdadGanado?.map(animal=> {return animal.Anios} );
      this.filasEdadPorAnima = this.reporteEdadGanado?.map(animal=> {return animal.Total} );
      this.configurarEdadPorAnimal();
    });
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

  gastosPorAnio(){
    const value: string | null = localStorage.getItem('jwt');
    this.repService.getGastosAnio((value ? value : ' '), '2021'/* Falta anio tipo string*/)
    .subscribe(resp=>{
      this.reporteGastoAnio=resp.result[0];
      this.totalGastos = this.reporteGastoAnio.map(mes => mes.Gastos);
      this.configurarGastoPorAnio(this.reporteGastoAnio.map(mes => {return mes.Mes}),
                                  this.reporteGastoAnio.map(mes => {return mes.Gastos}),
                                  'Meses'); 

    });
  }
  ventasPorAnio(){
    const value: string | null = localStorage.getItem('jwt');
    this.repService.getVentasAnio((value ? value : ' '), '2021'/* Falta anio tipo string*/)
    .subscribe(resp=>{
      this.reporteVentasAnio=resp.result[0];
      this.totalventas = this.reporteVentasAnio.map(mes => mes.Ventas);
      if(this.totalGastos){
        this.configurarCombinada();
      }
      this.configurarVentasPorAnio(this.reporteVentasAnio.map(mes => {return mes.Mes}),
                                  this.reporteVentasAnio.map(mes => {return mes.Ventas}),
                                  'Meses'); 

    });
  }


  formatoGrafica(labels : any, data : any, label : string){
    let dataset : DataSets = {
      label,
      backgroundColor: '#42A5F5',
      data
    }
    let chartData : ChartData = {
      labels,
      datasets: [dataset]
    }

    return chartData;
    
   }
  formatoGraficaLinear(labels : any, data : any, label : string){
    let dataset = {
      label,
      data,
      fill: false,
      borderColor: '#42A5F5',
      tension: .4
    }
    let chartData = {
      labels,
      datasets: [dataset],
    }

    return chartData;
    
   }

  configurarEdadPorAnimal(){
     this.dataGraficaEdadPorAnimal = this.formatoGrafica(this.columnasEdadPorAnima,this.filasEdadPorAnima,'Años'); 
  }
  configurarGastoPorAnio(labels : any, data : any, label : string){
    this.dataGastosPorAnio = this.formatoGraficaLinear(labels,data,label);

  }
  configurarVentasPorAnio(labels : any, data : any, label : string){
    this.dadaVentasPorAnio = this.formatoGraficaLinear(labels,data,label);

  }

  mesesEntreFechas(desde :Date , hasta: Date){
    desde = new Date('2000-09-20');
    hasta = new Date('2000-11-20');
    
    let mesesLabel = [];

    for(let i = desde.getMonth(); i < hasta.getMonth(); i++){
      mesesLabel.push()
    }
    
  }

}
