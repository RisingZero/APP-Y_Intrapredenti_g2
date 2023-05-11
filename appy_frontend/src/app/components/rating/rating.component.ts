import { Component, OnInit, Input, Output, EventEmitter, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent  implements OnInit {

  @Input() primary: string = 'black';
  @Input() secondary: string = 'white';

  @ViewChildren("ratingBtn") ratingBtns: QueryList<ElementRef> = new QueryList<ElementRef>();

  @Output() onChange: EventEmitter<number> = new EventEmitter();

  rating: number = -1;
  values = [1,2,3,4,5];

  constructor() { }

  ngOnInit() {}

  selectRating(value: number) {
    if (this.rating === value)
      this.rating = -1;
    else
      this.rating = value;
    this.onChange.emit(this.rating);

    this.ratingBtns.forEach(btn => {
      btn.nativeElement.classList.remove('selected');
    });
    this.ratingBtns.get(this.rating - 1)?.nativeElement.classList.add('selected');
  }

}
