import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { CliAbonComponent } from './cliabon.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivosRoutingModule {}
