import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { OverlayBoxComponent } from './overlay-box/overlay-box.component';

@NgModule({
  declarations: [
    NavbarComponent,
    OverlayBoxComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavbarComponent,
    OverlayBoxComponent
  ]
})
export class ComponentsModule { }
