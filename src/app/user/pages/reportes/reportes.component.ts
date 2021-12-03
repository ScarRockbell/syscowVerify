import { Component, OnInit } from '@angular/core';
import { Abortos, EdadGanado, GanadoClasif, GastoAcum, GastosAnio, NacimientosIntervalo, PartosMedico, VentasAnio } from '../../interfaces/reportes-interfaces';
import {ReportesService} from '../../services/reportes.service';
import { MedicoService } from '../../../core/services/medico.service';
import { Medico } from 'src/app/core/interfaces/catalogs-interfaces';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporteGastosAcum:GastoAcum[]=[];
  reportePartosMedico:PartosMedico[]=[];
  reporteEdadGanado:EdadGanado[]=[];
  reporteNaciminetosIntervalo?:NacimientosIntervalo;
  reporteVentasAnio:VentasAnio[]=[];

  reporteGastosGlobales:GastosAnio[]=[];
  reporteAbortos?:Abortos;
  resporteGanadoClasificaion:GanadoClasif[]=[];

  constructor(private RepService:ReportesService, private catService : MedicoService ) { }

  ngOnInit(): void {
    this.cargarReportes();
  }

  medicos?:Medico[];

  cargarReportes(){
    const value: string | null = localStorage.getItem('jwt');
    this.RepService.getReporteGastoAcum((value ? value : ' '))
    .subscribe(resp=>{
      this.reporteGastosAcum=resp.result;
    });
    this.RepService.getPartosMedico((value ? value : ' '))
    .subscribe(resp=>{
      this.reportePartosMedico=resp.result;
    });
    // this.RepService.getEdadGanado((value ? value : ' '))
    // .subscribe(resp=>{
    //   this.reporteEdadGanado=resp.result;
    // });
    // // this.RepService.getNacimientoIntervalo((value ? value : ' ')/*Faltan el desde y hasta de tipo string en formato date YYYY-MM-DD*/ )
    // // .subscribe(resp=>{
    // //   this.reporteNaciminetosIntervalo=resp.result;
    // // });
    // this.RepService.getVentasAnio((value ? value : ' ')/* Falta anio tipo string*/)
    // .subscribe(resp=>{
    //   this.reporteVentasAnio=resp.result;
    // });
    // this.RepService.getGastosAnio((value ? value : ' ')/* Falta anio tipo string*/)
    // .subscribe(resp=>{
    //   this.reporteGastoAnio=resp.result;
    // });
    // this.RepService.getGastosGlobales((value ? value : ' ')/* Falta limit tipo number*/)
    // .subscribe(resp=>{
    //   this.reporteGastosGlobales=resp.result;
    // });
    // this.RepService.getAbortos((value ? value : ' ')/*Faltan el desde y hasta de tipo string en formato date YYYY-MM-DD*/)
    // .subscribe(resp=>{
    //   this.reporteAbortos=resp.result;
    // });
    // this.RepService.getGanadoClasificacion((value ? value : ' '))
    // .subscribe(resp=>{
    //   this.resporteGanadoClasificaion=resp.result;
    // })
  }
}
