import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { RepGastoAcum, ResponseAbortos, ResponseEdadGanado, ResponseGanadoClasif, ResponseGastosAnio, ResponseNacimientoIntervalo, ResponsePartosMedico, ResponseVentasAnio} from '../interfaces/reportes-interfaces';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url:string="http://74.208.41.209:3242/";

  constructor(private http:HttpClient) { }

  //Costos de servicio por animal
  getReporteGastoAcum(jwt:string):Observable<RepGastoAcum>{
    return this.http.post<RepGastoAcum>(`${this.url}reports/costo_por_animal`,{'jwt':jwt});
  }

  //Partos por medico
  getPartosMedico(jwt:string):Observable<ResponsePartosMedico>{
    return this.http.post<ResponsePartosMedico>(`${this.url}reports/partos_por_medico`,{'jwt':jwt});
  }

  //Total de animales de cierta edad
  getEdadGanado(jwt:string):Observable<ResponseEdadGanado>{
    return this.http.post<ResponseEdadGanado>(`${this.url}reports/edad_del_ganado`,{'jwt':jwt});
  }

  //Nacimientos por intervalo
  getNacimientoIntervalo(jwt:string,desde:string,hasta:string):Observable<ResponseNacimientoIntervalo>{
    return this.http.post<ResponseNacimientoIntervalo>(`${this.url}nacimientos_por_intervalo`,{'jwt':jwt,'desde':desde,'hasta':hasta});
  }

  //Ventas por anio
  getVentasAnio(jwt:string,anio:string):Observable<ResponseVentasAnio>{
    return this.http.post<ResponseVentasAnio>(`${this.url}reports/ventas_por_anio`,{'jwt':jwt,'year':anio});

  }

  //Ventas por anio
  getGastosAnio(jwt:string,anio:string):Observable<ResponseGastosAnio>{
    return this.http.post<ResponseGastosAnio>(`${this.url}reports/gastos_por_anio`,{'jwt':jwt,'year':anio})
  }

  //Gastos globales por mes dado un limite
  getGastosGlobales(jwt:string,limit:number):Observable<ResponseGastosAnio>{
    return this.http.post<ResponseGastosAnio>(`${this.url}/reports/gastos_globales_limite`,{'jwt':jwt,'limite':limit});
  }

  //Cantidad de abortos por mes
  getAbortos(jwt:string,desde:string,hasta:string):Observable<ResponseAbortos>{
    return this.http.post<ResponseAbortos>(`${this.url}reports/abortos_por_intervalo`,{'jwt':jwt,'desde':desde,'hasta':hasta});
  }

  //Get ganado por clasificacion
  getGanadoClasificacion(jwt:string):Observable<ResponseGanadoClasif>{
    return this.http.post<ResponseGanadoClasif>(`${this.url}reports/ganado_por_clasifiacion`,{'jwt':jwt});
  }
}
