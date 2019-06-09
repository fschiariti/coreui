// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
// Theme Routing
import { ArchivosRoutingModule } from './archivos-routing.module';
import { DemoMaterialModule} from '../../material-module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

//Archivos components
import { CliAbonComponent } from './cliabon.component';
import { ClienteComponent } from './cliente.component';



@NgModule({
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    DemoMaterialModule,
    ModalModule.forRoot(),
    FormsModule,
    NgxUiLoaderModule

  ],
  declarations: [
    ClienteComponent,
    CliAbonComponent
  ]
})
export class ArchivosModule { }
