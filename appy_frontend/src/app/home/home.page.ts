import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { User, DailyChallengeCard } from '../../_models';
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
  modalProgressCircleDraw: string = '1,999';

  user: User;
  dailyChallengeCards: DailyChallengeCard[] = [];

  isModalProgressOpen: boolean = false;
  modalProgressTitle: string = '';
  modalProgressColor: string = '';
  progressComplete: string = '02';
  progressOutOf: string = '04';

  isBoostOpen: boolean = false;
  selectedBoost: any = undefined;

  isSurveyOpen: boolean = false;
  ratingValue: number = -1;

  boostPages = [
    {
      color: '#ffb985',
      circles: [
        {icon: '../../assets/svgs/exp-boost.svg'},
        {icon: '../../assets/svgs/exp-boost.svg'},
        {icon: '../../assets/svgs/exp-boost.svg'},
        {icon: '../../assets/svgs/exp-boost.svg'},
      ]
    },
    {
      color: '#00b89f',
      circles: [
        {icon: '../../assets/svgs/chat-boost.svg'},
        {icon: '../../assets/svgs/chat-boost.svg'},
        {icon: '../../assets/svgs/chat-boost.svg'},
        {icon: '../../assets/svgs/chat-boost.svg'},
      ]
    },
    {
      color: '#BDB4FF',
      circles: [
        {icon: '../../assets/svgs/time-boost.svg'},
        {icon: '../../assets/svgs/time-boost.svg'},
        {icon: '../../assets/svgs/time-boost.svg'},
        {icon: '../../assets/svgs/time-boost.svg'},
      ]
    },
    {
      color: '#4747F2',
      circles: [
        {icon: '../../assets/svgs/level-boost.svg'},
        {icon: '../../assets/svgs/level-boost.svg'},
        {icon: '../../assets/svgs/level-boost.svg'},
        {icon: '../../assets/svgs/level-boost.svg'},
      ]
    }
  ]

  constructor(
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

  openModal(type: 'exp' | 'sfide' | 'chall') {
    this.isModalProgressOpen = true;
    
    let roundPercent = 1;
    if (type === 'exp') {
      roundPercent = this.user.expProgress;
      this.modalProgressTitle = 'Esperienza';
      this.modalProgressColor = '#26B5A0';
      this.progressComplete = '200';
      this.progressOutOf = '400';
    } else if (type === 'sfide') {
      roundPercent = this.user.sfideProgress;
      this.modalProgressTitle = 'Sfide';
      this.modalProgressColor = '#BEB3FF';
      this.progressComplete = '02';
      this.progressOutOf = '03';
    } else if (type === 'chall') {
      roundPercent = this.user.challProgress;
      this.modalProgressTitle = 'Challenge';
      this.modalProgressColor = '#FFB985';
      this.progressComplete = '02';
      this.progressOutOf = '08';
    }

    const roundRadius = 107.5;
    const roundCircum = 2 * roundRadius * Math.PI;
    this.modalProgressCircleDraw = (roundPercent * roundCircum / 100).toFixed(2) + ',999';
  }

  closeModal() {
    this.isModalProgressOpen = false;
    this.isBoostOpen = false;
    this.isSurveyOpen = false;
  }

  onSurveyClick() {
    this.isSurveyOpen = true;
  }

  onRatingClick(value: number) {
    this.ratingValue = value;
  }

  submitSurvey() {
    if (this.ratingValue !== -1) {
      console.log(this.ratingValue);
      this.ratingValue = -1;
      this.isSurveyOpen = false;
    }
  }

  onBoostClick() {
    this.isBoostOpen = true;
  }

  selectBoost(value: number, color: string) {
    this.selectedBoost = {id: value, color: color};
    console.log(this.selectedBoost);
  }

  activateBoost() {
    this.selectedBoost = undefined;
    this.isBoostOpen = false;
  }
}
