import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { User, DailyChallengeCard } from '../../_models';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    IonicModule
  ],
})
export class HomePage implements OnInit {

  @ViewChild('expProgress') expProgressBar: any;
  @ViewChild('sfideProgress') sfideProgressBar: any;
  @ViewChild('challProgress') challProgressBar: any;
  @ViewChild('boostProgressBar') boostProgressBar: any;

  user: User;
  dailyChallengeCards: DailyChallengeCard[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private api: ApiService
  ) {
    this.user = {
      name: '',
      surname: '',
      username: '',
      level: -1,
      expProgress: 0,
      sfideProgress: 0,
      challProgress: 0,
      boostTimeRemaining: 100,
      boostTimeRemainingHuman: '0s',
      experience: -1
    };
  }

  ngOnInit(): void {
  }

  async ionViewWillEnter() {
    // Fetch user data and update ui bars
    this.user = this.api.getUser('lorenzo.rossi');
    this.dailyChallengeCards = this.api.getDailyChallenges();

    // simulate network fetch time
    await new Promise(r => setTimeout(r, 1500));

    this.updateBoostProgressBar(100-this.user.boostTimeRemaining);
    this.updateUserProgressBars(
      this.user.expProgress,
      this.user.sfideProgress,
      this.user.challProgress
    );
  }

  updateUserProgressBars(expValue: number, sfideValue: number, challValue: number) {
    this.expProgressBar.nativeElement.style.strokeDasharray = `calc(${expValue/100}*165),2000`;
    this.sfideProgressBar.nativeElement.style.strokeDasharray = `calc(${sfideValue/100}*165),2000`;
    this.challProgressBar.nativeElement.style.strokeDasharray = `calc(${challValue/100}*117),2000`;
  }

  updateBoostProgressBar(value: number) {
    const realValue = value / 100 * 80;
    this.boostProgressBar.nativeElement.style.width = `${realValue}%`;
  }

  onSurveyClick() {
    console.debug('survey!');
  }

  onBoostClick() {
    console.debug('boost!');
  }
}
