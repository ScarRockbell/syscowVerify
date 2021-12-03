import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CatClasifComponent } from './pages/cat-clasif/cat-clasif.component';
import { CatMedicosComponent } from './pages/cat-medicos/cat-medicos.component';
import { CatRazaComponent } from './pages/cat-raza/cat-raza.component';
import { CatTipoServComponent } from './pages/cat-tipo-serv/cat-tipo-serv.component';
import { CatUsuariosComponent } from './pages/cat-usuarios/cat-usuarios.component';

const routes: Routes = [

  {
    path:'',
    component: AdminHomeComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'razas', component: CatRazaComponent},
      { path: 'clasificaciones', component: CatClasifComponent},
      { path: 'medicos', component: CatMedicosComponent},
      { path: 'servicios', component: CatTipoServComponent},
      { path: 'usuarios', component: CatUsuariosComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
