import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';

import { User, DailyChallengeCard } from '../../_models';
import { DomSanitizer } from '@angular/platform-browser';

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

  @ViewChild('userProgressBar') userProgressBar: any;
  @ViewChild('boostProgressBar') boostProgressBar: any;

  user: User;
  dailyChallengeCards: DailyChallengeCard[] = [];

  constructor(
    private sanitizer: DomSanitizer,
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
    this.dailyChallengeCards.push({
      id: 'daily-survey',
      title: 'Questionario del giorno',
      description: 'Rispondi al questionario del giorno e ricevi una ricompensa',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg width="65" height="65" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_42)"><path d="M13.2392 88.9597C11.516 88.8733 9.88803 88.9349 8.30883 88.6852C3.52003 87.9316 0.0512294 83.9044 0.0320294 79.0572C-0.00797058 69.0748 -0.00797058 59.0924 0.0320294 49.11C0.0584294 43.6796 4.40723 39.3596 9.84003 39.3036C14.968 39.2532 20.0976 39.2908 25.2264 39.29H26.4624V38.01C26.4624 28.7156 26.464 19.4215 26.4672 10.1276C26.476 5.04444 29.808 1.03404 34.7392 0.146036C35.4448 0.0196356 36.1792 0.00763557 36.8992 0.00763557C56.3798 0.00230224 75.8616 0.00150224 95.3448 0.00523557C100.425 0.00523557 104.29 2.85724 105.454 7.46444C105.673 8.36591 105.78 9.29058 105.774 10.218C105.795 23.0916 105.798 35.9655 105.785 48.8396C105.779 54.8396 101.504 59.1036 95.5048 59.126C94.688 59.126 93.8704 59.126 92.9512 59.126V60.3364C92.9512 65.2244 92.9688 70.1124 92.944 75.0005C92.9304 77.5604 90.604 79.2492 88.384 78.3036C87.8104 78.0588 87.2816 77.5965 86.86 77.1212C81.7672 71.3788 76.6912 65.6215 71.632 59.8492C71.1904 59.3452 70.76 59.0956 70.0648 59.1092C67.6952 59.1548 65.3248 59.126 62.816 59.126V60.2804C62.816 66.338 62.816 72.3962 62.816 78.4548C62.8088 84.6556 58.576 88.8685 52.3576 88.8733C46.1392 88.8781 39.8968 88.8868 33.6664 88.8573C32.94 88.8573 32.4664 89.0828 31.9992 89.6172C27.7944 94.3997 23.5576 99.1533 19.3464 103.928C18.4984 104.888 17.5232 105.512 16.1984 105.33C14.3968 105.083 13.2464 103.775 13.2384 101.935C13.228 97.6348 13.2392 93.3341 13.2392 88.9597ZM62.9064 52.5116C65.9088 52.5116 68.8952 52.5476 71.8792 52.4964C73.3416 52.4708 74.4344 53.0084 75.384 54.1012C78.704 57.9196 82.0672 61.7012 85.4152 65.4932C85.6552 65.7604 85.8952 66.0172 86.3384 66.4956V65.194C86.3384 62.1308 86.3256 59.0668 86.344 56.0036C86.3568 53.8732 87.7088 52.5316 89.8336 52.5148C91.6232 52.5004 93.4137 52.5148 95.204 52.5148C97.9568 52.5148 99.176 51.2996 99.176 48.5548C99.176 35.8871 99.176 23.2204 99.176 10.5548C99.176 7.85484 97.9688 6.62604 95.2888 6.62604C75.8403 6.62284 56.3912 6.62284 36.9416 6.62604C34.3232 6.62604 33.076 7.87484 33.0752 10.4716C33.0752 19.6983 33.0752 28.925 33.0752 38.1516V39.2996H34.34C40.5368 39.2996 46.7328 39.2724 52.9288 39.3108C57.8528 39.3412 61.8888 42.7732 62.6408 47.6148C62.8856 49.1828 62.8232 50.8092 62.9064 52.5116ZM19.8528 93.3725C22.8216 90.0221 25.5976 86.9205 28.3328 83.7837C29.2592 82.7197 30.3448 82.2397 31.76 82.2445C38.712 82.2773 45.664 82.2645 52.6152 82.2564C54.816 82.2564 56.1976 80.9084 56.1992 78.7421C56.2094 68.9687 56.2094 59.1948 56.1992 49.4204C56.1992 47.2908 54.8312 45.9108 52.7192 45.91C38.5059 45.901 24.2926 45.901 10.0792 45.91C8.03283 45.91 6.63923 47.306 6.63923 49.35C6.62696 59.158 6.62696 68.9663 6.63923 78.7748C6.63923 80.8764 8.03443 82.2373 10.1592 82.2525C12.1592 82.2677 14.1512 82.2524 16.1472 82.2572C18.5288 82.2636 19.8504 83.5797 19.8576 85.9589C19.8584 88.3269 19.8528 90.6917 19.8528 93.3725Z" fill="white"/><path d="M66.1288 31.2653C66.4344 30.9765 66.7104 30.7285 66.972 30.4653C71.3768 26.0632 75.7816 21.6613 80.1864 17.2597C81.9696 15.4845 84.4392 15.9053 85.5728 18.1397C86.264 19.4997 86.0352 20.7413 84.8128 21.9685C81.488 25.3088 78.1563 28.6421 74.8176 31.9685C72.7984 33.9877 70.7784 36.0061 68.7576 38.0237C67.0776 39.6933 65.1768 39.6973 63.5104 38.0365C60.3675 34.9058 57.2294 31.7688 54.096 28.6253C52.5368 27.0597 52.496 25.2725 53.9584 23.8253C55.4208 22.3781 57.22 22.4237 58.7768 23.9693C60.9744 26.1509 63.1576 28.3461 65.3496 30.5293C65.588 30.7701 65.84 30.9949 66.1288 31.2653Z" fill="white"/><path d="M26.776 64.0944C24.7664 62.0944 22.8328 60.1896 20.9312 58.2544C19.1752 56.4696 19.624 53.9856 21.8704 52.88C23.1912 52.2296 24.4128 52.4208 25.5416 53.5392C27.4704 55.4512 29.3688 57.3952 31.3544 59.4008C31.6512 59.132 31.9024 58.9208 32.1344 58.6904C33.84 56.9904 35.5304 55.2752 37.2472 53.5864C38.6752 52.1816 40.4 52.192 41.8192 53.576C43.2664 54.988 43.3312 56.8112 41.9264 58.236C40.0216 60.168 38.08 62.0632 35.9696 64.156C37.0896 65.2032 38.1472 66.1712 39.1792 67.168C40.1195 68.0747 41.0435 68.9992 41.9512 69.9416C43.3616 71.4032 43.3408 73.2112 41.9208 74.5984C40.5008 75.9856 38.6968 75.9992 37.2504 74.5736C35.3192 72.6712 33.4104 70.7416 31.4104 68.7336C29.4704 70.6848 27.5808 72.5736 25.7016 74.4784C24.8216 75.3648 23.8328 75.9048 22.5568 75.5368C21.1912 75.1432 20.3232 74.2288 19.9632 72.8536C19.6504 71.6536 20.1168 70.7056 20.9496 69.8792C22.8504 67.9944 24.7528 66.1032 26.776 64.0944Z" fill="white"/></g><defs><clipPath id="clip0_258_42"><rect width="105.795" height="105.362" fill="white"/></clipPath></defs></svg>'),
      color: '#00b79f',
      completed: true
    });
    this.dailyChallengeCards.push({
      id: 'daily-survey',
      title: 'Questionario del giorno',
      description: 'Rispondi al questionario del giorno e ricevi una ricompensa',
      icon: this.sanitizer.bypassSecurityTrustHtml('<svg width="65" height="65" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_258_42)"><path d="M13.2392 88.9597C11.516 88.8733 9.88803 88.9349 8.30883 88.6852C3.52003 87.9316 0.0512294 83.9044 0.0320294 79.0572C-0.00797058 69.0748 -0.00797058 59.0924 0.0320294 49.11C0.0584294 43.6796 4.40723 39.3596 9.84003 39.3036C14.968 39.2532 20.0976 39.2908 25.2264 39.29H26.4624V38.01C26.4624 28.7156 26.464 19.4215 26.4672 10.1276C26.476 5.04444 29.808 1.03404 34.7392 0.146036C35.4448 0.0196356 36.1792 0.00763557 36.8992 0.00763557C56.3798 0.00230224 75.8616 0.00150224 95.3448 0.00523557C100.425 0.00523557 104.29 2.85724 105.454 7.46444C105.673 8.36591 105.78 9.29058 105.774 10.218C105.795 23.0916 105.798 35.9655 105.785 48.8396C105.779 54.8396 101.504 59.1036 95.5048 59.126C94.688 59.126 93.8704 59.126 92.9512 59.126V60.3364C92.9512 65.2244 92.9688 70.1124 92.944 75.0005C92.9304 77.5604 90.604 79.2492 88.384 78.3036C87.8104 78.0588 87.2816 77.5965 86.86 77.1212C81.7672 71.3788 76.6912 65.6215 71.632 59.8492C71.1904 59.3452 70.76 59.0956 70.0648 59.1092C67.6952 59.1548 65.3248 59.126 62.816 59.126V60.2804C62.816 66.338 62.816 72.3962 62.816 78.4548C62.8088 84.6556 58.576 88.8685 52.3576 88.8733C46.1392 88.8781 39.8968 88.8868 33.6664 88.8573C32.94 88.8573 32.4664 89.0828 31.9992 89.6172C27.7944 94.3997 23.5576 99.1533 19.3464 103.928C18.4984 104.888 17.5232 105.512 16.1984 105.33C14.3968 105.083 13.2464 103.775 13.2384 101.935C13.228 97.6348 13.2392 93.3341 13.2392 88.9597ZM62.9064 52.5116C65.9088 52.5116 68.8952 52.5476 71.8792 52.4964C73.3416 52.4708 74.4344 53.0084 75.384 54.1012C78.704 57.9196 82.0672 61.7012 85.4152 65.4932C85.6552 65.7604 85.8952 66.0172 86.3384 66.4956V65.194C86.3384 62.1308 86.3256 59.0668 86.344 56.0036C86.3568 53.8732 87.7088 52.5316 89.8336 52.5148C91.6232 52.5004 93.4137 52.5148 95.204 52.5148C97.9568 52.5148 99.176 51.2996 99.176 48.5548C99.176 35.8871 99.176 23.2204 99.176 10.5548C99.176 7.85484 97.9688 6.62604 95.2888 6.62604C75.8403 6.62284 56.3912 6.62284 36.9416 6.62604C34.3232 6.62604 33.076 7.87484 33.0752 10.4716C33.0752 19.6983 33.0752 28.925 33.0752 38.1516V39.2996H34.34C40.5368 39.2996 46.7328 39.2724 52.9288 39.3108C57.8528 39.3412 61.8888 42.7732 62.6408 47.6148C62.8856 49.1828 62.8232 50.8092 62.9064 52.5116ZM19.8528 93.3725C22.8216 90.0221 25.5976 86.9205 28.3328 83.7837C29.2592 82.7197 30.3448 82.2397 31.76 82.2445C38.712 82.2773 45.664 82.2645 52.6152 82.2564C54.816 82.2564 56.1976 80.9084 56.1992 78.7421C56.2094 68.9687 56.2094 59.1948 56.1992 49.4204C56.1992 47.2908 54.8312 45.9108 52.7192 45.91C38.5059 45.901 24.2926 45.901 10.0792 45.91C8.03283 45.91 6.63923 47.306 6.63923 49.35C6.62696 59.158 6.62696 68.9663 6.63923 78.7748C6.63923 80.8764 8.03443 82.2373 10.1592 82.2525C12.1592 82.2677 14.1512 82.2524 16.1472 82.2572C18.5288 82.2636 19.8504 83.5797 19.8576 85.9589C19.8584 88.3269 19.8528 90.6917 19.8528 93.3725Z" fill="white"/><path d="M66.1288 31.2653C66.4344 30.9765 66.7104 30.7285 66.972 30.4653C71.3768 26.0632 75.7816 21.6613 80.1864 17.2597C81.9696 15.4845 84.4392 15.9053 85.5728 18.1397C86.264 19.4997 86.0352 20.7413 84.8128 21.9685C81.488 25.3088 78.1563 28.6421 74.8176 31.9685C72.7984 33.9877 70.7784 36.0061 68.7576 38.0237C67.0776 39.6933 65.1768 39.6973 63.5104 38.0365C60.3675 34.9058 57.2294 31.7688 54.096 28.6253C52.5368 27.0597 52.496 25.2725 53.9584 23.8253C55.4208 22.3781 57.22 22.4237 58.7768 23.9693C60.9744 26.1509 63.1576 28.3461 65.3496 30.5293C65.588 30.7701 65.84 30.9949 66.1288 31.2653Z" fill="white"/><path d="M26.776 64.0944C24.7664 62.0944 22.8328 60.1896 20.9312 58.2544C19.1752 56.4696 19.624 53.9856 21.8704 52.88C23.1912 52.2296 24.4128 52.4208 25.5416 53.5392C27.4704 55.4512 29.3688 57.3952 31.3544 59.4008C31.6512 59.132 31.9024 58.9208 32.1344 58.6904C33.84 56.9904 35.5304 55.2752 37.2472 53.5864C38.6752 52.1816 40.4 52.192 41.8192 53.576C43.2664 54.988 43.3312 56.8112 41.9264 58.236C40.0216 60.168 38.08 62.0632 35.9696 64.156C37.0896 65.2032 38.1472 66.1712 39.1792 67.168C40.1195 68.0747 41.0435 68.9992 41.9512 69.9416C43.3616 71.4032 43.3408 73.2112 41.9208 74.5984C40.5008 75.9856 38.6968 75.9992 37.2504 74.5736C35.3192 72.6712 33.4104 70.7416 31.4104 68.7336C29.4704 70.6848 27.5808 72.5736 25.7016 74.4784C24.8216 75.3648 23.8328 75.9048 22.5568 75.5368C21.1912 75.1432 20.3232 74.2288 19.9632 72.8536C19.6504 71.6536 20.1168 70.7056 20.9496 69.8792C22.8504 67.9944 24.7528 66.1032 26.776 64.0944Z" fill="white"/></g><defs><clipPath id="clip0_258_42"><rect width="105.795" height="105.362" fill="white"/></clipPath></defs></svg>'),
      color: '#ffb47c',
      completed: false
    });
  }

  ngOnInit(): void {
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

    // simulate network fetch time
    await new Promise(r => setTimeout(r, 2000));

    this.updateBoostProgressBar(100-this.user.boostTimeRemaining);
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
