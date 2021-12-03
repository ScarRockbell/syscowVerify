import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CatClasifComponent } from './pages/cat-clasif/cat-clasif.component';
import { CatMedicosComponent } from './pages/cat-medicos/cat-medicos.component';
import { CatRazaComponent } from './pages/cat-raza/cat-raza.component';
import { CatTipoServComponent } from './pages/cat-tipo-serv/cat-tipo-serv.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { StatusPipe } from '../core/pipes/status.pipe';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    CatClasifComponent,
    CatMedicosComponent,
    CatRazaComponent,
    CatTipoServComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxBootstrapIconsModule.pick(allIcons),
    RouterModule,
    FormsModule,
    CoreModule
  ]
})
export class AdminModule { }
