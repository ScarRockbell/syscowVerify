import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { DetailsComponent } from './pages/details/details.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { PartoComponent } from './pages/parto/parto.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { ReportesComponent } from './pages/reportes/reportes.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserHomeComponent,
    DetailsComponent,
    ServicioComponent,
    DiagnosticoComponent,
    PartoComponent,
    AnimalesComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
