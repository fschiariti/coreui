// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Theme Routing
import { ArchivosRoutingModule } from './archivos-routing.module';
import { DemoMaterialModule} from '../../material-module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

//Archivos components
import { CliAbonComponent } from '../archivos/cliabon/cliabon.component';
import { ClienteComponent } from '../archivos/cliente/cliente.component';
import { FacturasComponent } from '../archivos/facturas/facturas.component';
import { FacturasPrintComponent } from '../archivos/facturas/facturasprint.component';
import { ClienteValidationFormsComponent } from '../archivos/cliente/cliente.Validation.component';
import { CliAbonValidationFormsComponent } from '../archivos/cliabon/cliabon.Validation.component';





@NgModule({
  imports: [
    CommonModule,
    ArchivosRoutingModule,
    DemoMaterialModule,
    ModalModule.forRoot(),
    FormsModule,
    NgxUiLoaderModule,
    ReactiveFormsModule
  ],
  declarations: [
    ClienteComponent,
    CliAbonComponent,
    FacturasComponent,
    FacturasPrintComponent,
    ClienteValidationFormsComponent,
    CliAbonValidationFormsComponent
  ],
  exports: [ 
    ClienteValidationFormsComponent,
    CliAbonValidationFormsComponent
  ]
})

export class ArchivosModule { 
}
