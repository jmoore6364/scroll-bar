import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'esx-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollBarComponent implements OnInit {
  @ViewChild('slider')
  slider!: ElementRef<HTMLElement>;
  @ViewChild('scrollbar') scrollbar!: ElementRef<HTMLElement>;
  @ViewChild('frame') frame!: ElementRef<HTMLElement>;

  @Input('width') width: string = '200px';

  sliding: boolean = false;
  direction: string = 'none';
  slideStartedX: number = 0;
  slideOffsetX: number = 0;
  lastPos: number = 0;
  sliderSize: number = 0;
  scrollAmount: number = 0;

  constructor() {}

  @HostListener('document:mouseup', ['$event'])
  documentMouseUp(event: MouseEvent) {
    this.mouseUp(event);
  }

  @HostListener('document:mousemove', ['$event'])
  documentMouseMove(event: MouseEvent) {
    this.mouseMove(event);
  }

  @HostListener('document:mousedown', ['$event'])
  documentMouseDown(event: MouseEvent) {
    this.mouseDown(event);
  }

  @HostListener('window:resize', ['$event'])
  documentResize(event: UIEvent) {
    //console.log(event);
    this.ngAfterViewInit();
  }

  @HostListener('document:touchend', ['$event'])
  documentTouchEnd(event: TouchEvent) {
    this.sliderStop();
  }

  @HostListener('document:touchmove', ['$event'])
  documentTouchMove(event: TouchEvent) {
    this.onDragSlider(event.touches[0].clientX);
  }

  touchStart(event: TouchEvent) {
    this.sliderStart(event.touches[0].clientX);
  }

  mouseDown(event: MouseEvent) {
    this.sliderStart(event.clientX);
  }

  mouseUp(event: MouseEvent) {
    this.sliderStop();
  }

  mouseMove(event: MouseEvent) {
    this.onDragSlider(event.clientX);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.scrollbar.nativeElement.style.width = this.width;
    this.frame.nativeElement.style.width = this.width;
    var p = (this.scrollbar.nativeElement.clientWidth / this.frame.nativeElement.scrollWidth);
    console.log(p)
    this.sliderSize = this.scrollbar.nativeElement.clientWidth - (this.scrollbar.nativeElement.clientWidth * .3);
    this.scrollAmount =
      this.frame.nativeElement.scrollWidth / this.sliderSize;
      //(this.scrollbar.nativeElement.clientWidth - this.sliderSize);
    this.slider.nativeElement.style.width = this.sliderSize + 'px';
  }

  private onDragSlider(positionX: number) {
    if (!this.sliding) return;
    if (this.lastPos === 0) this.lastPos = positionX;
    if (this.lastPos === positionX) {
      this.direction = 'none';
    } else if (this.lastPos < positionX) {
      if (this.direction === 'left') this.sliderStart(positionX);
      this.direction = 'right';
      this.scroll(positionX, this.direction);
    } else {
      if (this.direction === 'right') this.sliderStart(positionX);
      this.direction = 'left';
      this.scroll(positionX, this.direction);
    }
    this.lastPos = positionX;
  }

  private sliderStart(positionX: number) {
    this.direction = 'none';
    this.sliding = true;
    this.slideStartedX = positionX;
    this.slideOffsetX = this.slider.nativeElement.offsetLeft;
  }

  private sliderStop() {
    this.sliding = false;
  }

  private scroll(positionX: number, direction: String) {
    var margin = positionX - this.slideStartedX + this.slideOffsetX;
    if (direction === 'right') {
      if (margin + this.sliderSize > this.scrollbar.nativeElement.clientWidth) {
        margin = margin - (margin + this.sliderSize - this.scrollbar.nativeElement.clientWidth);
      } else {
        this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
      }
    } else {
      if (margin < 0) return;
      this.frame.nativeElement.scrollLeft = this.scrollAmount * margin;
    }
    this.slider.nativeElement.style.marginLeft = margin + 'px';
  }
}
