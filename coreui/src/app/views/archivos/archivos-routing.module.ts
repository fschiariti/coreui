import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { CliAbonComponent } from './cliabon/cliabon.component';
import { FacturasComponent } from './facturas/facturas.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Archivos'
    },
    children: [
      {
        path: 'cliente',
        component: ClienteComponent,
        data: {
          title: 'Cliente'
        }
      },
      {
        path: 'cliabon',
        component: CliAbonComponent,
        data: {
          title: 'Abonos'
        }
      },
      {
        path: 'facturas',
        component: FacturasComponent,
        data: {
          title: 'Facturas'
        }
      },
    ],    

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivosRoutingModule {}
