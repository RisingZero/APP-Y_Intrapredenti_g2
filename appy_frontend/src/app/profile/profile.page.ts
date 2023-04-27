import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { User} from '../../_models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  @ViewChild('userProgressBar') userProgressBar: any;

  user: User;

  constructor(private sanitizer: DomSanitizer,) {
    this.user = {
      name: '',
      surname: '',
      username: '',
      level: -1,
      levelChall1: 0,
      levelChall2: 0,
      levelChall3: 0,
      boostTimeRemaining: 100,
      boostTimeRemainingHuman: '0s',
      experience: -1
    };
   }

  ngOnInit():void {
  }

  async ionViewWillEnter() {
    // Fetch user data and update ui bars
    this.user = {
      name: 'Lorenzo',
      surname: 'Rossi',
      username: 'lorenzo.rossi',
      level: 3,
      levelChall1: 43,
      levelChall2: 87,
      levelChall3: 100,
      boostTimeRemaining: 23,
      boostTimeRemainingHuman: '45m',
      experience: 7000
    }
    this.updateUserProgressBar(
      1/3 * this.user.levelChall1 +
      1/3 * this.user.levelChall2 +
      1/3 * this.user.levelChall3
    );
  }

  updateUserProgressBar(value: number) {
    const meters = this.userProgressBar.nativeElement.querySelectorAll('.meter');
    this.userProgressBar.nativeElement.setAttribute('data-value', value.toString());
    meters.forEach((path: any) => {
      // Get the length of the path
      let length = path.getTotalLength();
      // Get the value of the meter
      let value = parseInt(path.parentNode.getAttribute('data-value'));
      // Calculate the percentage of the total length
      let to = length * ((100 - value) / 100);
      path.getBoundingClientRect();
      // Set the Offset
      path.style.strokeDashoffset = Math.max(0, to);
    });
  }

  
}
