import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RepGastoAcum, ResponseEdadGanado, ResponsePartosMedico} from '../interfaces/reportes-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url:string="http://74.208.41.209:3242/";

  constructor(private http:HttpClient) { }


  getReporteGastoAcum(jwt:string):Observable<RepGastoAcum>{
    return this.http.post<RepGastoAcum>(`${this.url}reports/costo_por_animal`,{'jwt':jwt});
  }

  getPartosMedico(jwt:string):Observable<ResponsePartosMedico>{
    return this.http.post<ResponsePartosMedico>(`${this.url}reports/partos_por_medico`,{'jwt':jwt});
  }

  getEdadGanado(jwt:string):Observable<ResponseEdadGanado>{
    return this.http.post<ResponseEdadGanado>(`${this.url}reports/edad_del_ganado`,{'jwt':jwt});
  }


}
