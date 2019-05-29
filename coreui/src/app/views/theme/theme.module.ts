// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { ClienteComponent } from './cliente.component';
import { FormsModule } from '@angular/forms';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { DemoMaterialModule} from '../../material-module';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    DemoMaterialModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ClienteComponent,
    ColorsComponent,
    TypographyComponent
  ]
})
export class ThemeModule { }
