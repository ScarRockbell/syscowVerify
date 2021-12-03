import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
  ],
  exports:[
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatInputModule,
    MatSelectModule,
    MatSortModule

    
  ]
})
export class SharedModule { }
