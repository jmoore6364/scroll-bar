import { 
  Component, 
  OnInit,
  ViewChild,
  ElementRef } from '@angular/core';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.css']
})
export class ScrollBarComponent implements OnInit {
  @ViewChild('scrollbar') scrollbarElementRef: ElementRef;
  @ViewChild('slider') sliderElementRef: ElementRef;
  @ViewChild('frame') frameElementRef: ElementRef;

  scrollbarElement: Object = this.scrollbarElementRef.nativeElement;
  sliderElement: Object = this.sliderElementRef.nativeElement;
  frameElement: Object = this.frameElementRef.nativeElement;
  dragging: Boolean = false;
  dragStartedX: Number = 0;
  dragOffsetX: Number = 0;
  lastPos: Number = 0;
  sliderSize: Number = this.frame.nativeElement.scrollWidth / 5;
  scrollAmount: Number = this.frame.scrollWidth / (scrollbar.clientWidth - sliderSize);

  constructor() { }

  mouseDown(event) {
    console.log(this.slider);
    console.log(event);
  }

  mouseUp(event) {

  }

  mouseMove(event) {
   //console.log(event);
  }

  ngOnInit() {
  }

}