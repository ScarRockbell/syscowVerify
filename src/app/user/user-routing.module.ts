import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { DetailsComponent } from './pages/details/details.component';
import { ServicioComponent } from './pages/servicio/servicio.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { PartoComponent } from './pages/parto/parto.component';
import { AnimalesComponent } from './pages/animales/animales.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [

  {
    path:'',
    component: UserHomeComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: UserDashboardComponent},
      { path: 'details/:id', component: DetailsComponent},
      { path: 'servicios/:id', component: ServicioComponent},
      { path: 'diagnosticos/:id', component: DiagnosticoComponent},
      { path: 'partos/:id', component: PartoComponent},
      { path: 'animales', component: AnimalesComponent},
      { path: 'reportes', component: ReportesComponent},
      { path: 'add', component: AddComponent},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
