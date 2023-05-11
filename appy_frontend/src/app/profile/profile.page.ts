import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { User} from '../../_models';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  @ViewChild('userProgressBar') userProgressBar: any;
  @ViewChild('levelProgressBar') levelProgressBar: any;

  user: User;
  progress=0;

  constructor(
    private sanitizer: DomSanitizer,
    private api: ApiService
  ) {
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
    this.user = this.api.getUser('filippo.rossi');
    
    await new Promise(r => setTimeout(r, 1000));

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
    this.levelProgressBar.nativeElement.style.width = `${value}%`;
  }
  
}
