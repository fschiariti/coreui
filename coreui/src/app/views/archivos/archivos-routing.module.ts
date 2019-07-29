import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { CliAbonComponent } from './cliabon/cliabon.component';
import { FacturasComponent } from './facturas/list/facturas.component';
import { FacturasPrintComponent } from './facturas/print/facturasprint.component';
import { FacturasEditComponent } from './facturas/edit/edit.component';

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
      {
        path: 'facturas/print/:id_comp',
        component: FacturasPrintComponent,
        data: {
          title: 'Facturas / Imprimir:id_comp'
        }
      },
      {
        path: 'facturas/edit/:id_comp',
        component: FacturasEditComponent,
        data: {
          title: 'Facturas / Editar:id_comp'
        }
      }
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivosRoutingModule {}
