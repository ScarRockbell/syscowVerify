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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './pages/add/add.component';
import { SharedModule } from '../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserHomeComponent,
    DetailsComponent,
    ServicioComponent,
    DiagnosticoComponent,
    PartoComponent,
    AnimalesComponent,
    ReportesComponent,
    AddComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MatCheckboxModule

  ],

})
export class UserModule { }
