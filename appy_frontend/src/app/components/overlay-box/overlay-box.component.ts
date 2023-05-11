import { AfterViewInit, Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-overlay-box',
  templateUrl: './overlay-box.component.html',
  styleUrls: ['./overlay-box.component.scss']
})
export class OverlayBoxComponent implements AfterViewInit {

  @Output() onClickClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('box') box: ElementRef | undefined = undefined;
  @ViewChild('background') background: ElementRef | undefined = undefined;

  constructor() { }

  async ngAfterViewInit() {
    await new Promise(resolve => setTimeout(resolve, 50));
    this.box?.nativeElement.classList.remove('out-of-view');
    this.background?.nativeElement.classList.remove('shade-background');
  }

  async onClickCloseHandler() {
    this.box?.nativeElement.classList.add('out-of-view');
    this.background?.nativeElement.classList.add('shade-background');
    await new Promise(resolve => setTimeout(resolve, 400));
    this.onClickClose.emit(['closed']);
  }

}
