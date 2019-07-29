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
import { FacturasComponent } from './facturas/list/facturas.component';
import { FacturasPrintComponent } from './facturas/print/facturasprint.component';
import { FacturasEditComponent } from './facturas/edit/edit.component';
import { ClienteValidationFormsComponent } from '../archivos/cliente/cliente.Validation.component';
import { CliAbonValidationFormsComponent } from '../archivos/cliabon/cliabon.Validation.component';
import { FacturasEditValidationFormsComponent } from '../archivos/facturas/edit/edit.Validation.component';





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
    FacturasEditComponent,
    ClienteValidationFormsComponent,
    CliAbonValidationFormsComponent,
    FacturasEditValidationFormsComponent,
  ],
  exports: [ 
    ClienteValidationFormsComponent,
    CliAbonValidationFormsComponent,
    FacturasEditValidationFormsComponent
  ]
})

export class ArchivosModule { 
}
