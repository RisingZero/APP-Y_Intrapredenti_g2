import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ComponentsModule
  ],
})
export class AppComponent {

  constructor() {}
}
