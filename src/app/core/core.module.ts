import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";


@NgModule({
  declarations: [
    StatusPipe,
    
  ],
  imports: [
    CommonModule,

  ],

})
export class CoreModule { }
