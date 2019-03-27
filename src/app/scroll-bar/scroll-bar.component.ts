import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'essex-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollBarComponent implements OnInit {
  @ViewChild('container') container: ElementRef<HTMLElement>;
  @ViewChild('slider') slider: ElementRef<HTMLElement>;
  @ViewChild('scrollbar') scrollbar: ElementRef<HTMLElement>;
  @ViewChild('frame') frame: ElementRef<HTMLElement>;

  sliding: boolean = false;
  moving: string = 'none';
  slideStartedX: number = 0;
  slideOffsetX: number = 0;
  lastPos: number = 0;
  sliderSize: number = 0;
  scrollAmount: number = 0; 

  constructor() { }

  mouseDown(event: MouseEvent) {
    this.sliderStart(event);
  }

  mouseUp(event: MouseEvent) {
    this.sliderStop();
  }

  mouseMove(event: MouseEvent) {
    if (!this.sliding)
      return;
    if (this.lastPos === 0)
      this.lastPos = event.clientX;
    if (this.lastPos === event.clientX) {
      this.moving = "none";
    } else if (this.lastPos < event.clientX) {
      if (this.moving === "left")
        this.sliderStart(event);
      this.scrollLeft(event.clientX);
      this.moving = "right";
    } else {
      if (this.moving === "right")
        this.sliderStart(event);
      this.scrollRight(event.clientX);
      this.moving = "left";
    }
    this.lastPos = event.clientX;
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sliderSize = this.scrollbar.nativeElement.clientWidth / 5;
    this.scrollAmount = this.frame.nativeElement.scrollWidth / (this.scrollbar.nativeElement.clientWidth - this.sliderSize);
    this.slider.nativeElement.style.width = this.sliderSize + 'px';
  }

  private sliderStart(event: MouseEvent) {
    this.moving = "none";
    this.sliding = true;
    this.slideStartedX = event.clientX;
    this.slideOffsetX = this.slider.nativeElement.offsetLeft;
  }

  private sliderStop() {
    this.sliding = false;
  }

  private scrollLeft(mouseX) {
    var margin = (mouseX - this.slideStartedX) + this.slideOffsetX;
    if ((margin + this.sliderSize) > this.scrollbar.nativeElement.clientWidth) {
      margin = margin - ((margin + this.sliderSize) - this.scrollbar.nativeElement.clientWidth);
    } else {
      this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    }
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }

  scrollRight(mouseX) {
    var margin = (mouseX - this.slideStartedX) + this.slideOffsetX;
    if (margin < 0)
      return;
    this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }

}

