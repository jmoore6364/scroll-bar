import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener } from '@angular/core';

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
  direction: string = 'none';
  slideStartedX: number = 0;
  slideOffsetX: number = 0;
  lastPos: number = 0;
  sliderSize: number = 0;
  scrollAmount: number = 0; 

  constructor() { }

  @HostListener('document:mouseup', ['$event'])
  documentMouseUp(event: MouseEvent) {
    this.mouseUp(event);
  }

  @HostListener('document:mousemove', ['$event'])
  documentMouseMove(event: MouseEvent) {
    this.mouseMove(event);
  }

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
      this.direction = "none";
    } else if (this.lastPos < event.clientX) {
      if (this.direction === "left")
        this.sliderStart(event);
      this.direction = "right";
      this.scroll(event.clientX, this.direction);
    } else {
      if (this.direction === "right")
        this.sliderStart(event);
      this.direction = "left";
      this.scroll(event.clientX, this.direction);
    }
    this.lastPos = event.clientX;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.sliderSize = this.frame.nativeElement.clientWidth / 5;
    this.scrollAmount = this.frame.nativeElement.scrollWidth / (this.scrollbar.nativeElement.clientWidth - this.sliderSize);
    this.slider.nativeElement.style.width = this.sliderSize + 'px';
  }

  private sliderStart(event: MouseEvent) {
    this.direction = "none";
    this.sliding = true;
    this.slideStartedX = event.clientX;
    this.slideOffsetX = this.slider.nativeElement.offsetLeft;
  }

  private sliderStop() {
    this.sliding = false;
  }

  private scroll(mouseX: number, direction: String) {
    var margin = (mouseX - this.slideStartedX) + this.slideOffsetX;
    if (direction === 'right') {
      if ((margin + this.sliderSize) > this.scrollbar.nativeElement.clientWidth) {
        margin = margin - ((margin + this.sliderSize) - this.scrollbar.nativeElement.clientWidth);
      } else {
        this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
      }
    } else
      if (margin < 0) {
        return;
      this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    }
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }

  private scrollLeft(mouseX: number) {
    var margin = (mouseX - this.slideStartedX) + this.slideOffsetX;
    if ((margin + this.sliderSize) > this.scrollbar.nativeElement.clientWidth) {
      margin = margin - ((margin + this.sliderSize) - this.scrollbar.nativeElement.clientWidth);
    } else {
      this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    }
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }

  private scrollRight(mouseX: number) {
    var margin = (mouseX - this.slideStartedX) + this.slideOffsetX;
    if (margin < 0)
      return;
    this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }

}

