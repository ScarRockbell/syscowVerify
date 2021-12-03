import { Component, OnInit } from '@angular/core';
import { EdadGanado, GastoAcum, PartosMedico } from '../../interfaces/reportes-interfaces';
import {ReportesService} from '../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  reporteGastosAcum?:GastoAcum[];
  reportePartosMedico?:PartosMedico[];
  reporteEdadGanado?:EdadGanado[];

  constructor(private RepService:ReportesService) { }

  ngOnInit(): void {
    this.cargarReportes();
  }

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
    this.RepService.getEdadGanado((value ? value : ' '))
    .subscribe(resp=>{
      this.reporteEdadGanado=resp.result;
    });
  }
}
