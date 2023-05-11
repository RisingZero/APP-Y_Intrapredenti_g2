import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NavbarComponent } from './navbar/navbar.component';
import { OverlayBoxComponent } from './overlay-box/overlay-box.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    NavbarComponent,
    OverlayBoxComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavbarComponent,
    OverlayBoxComponent,
    RatingComponent
  ]
})
export class ComponentsModule { }
