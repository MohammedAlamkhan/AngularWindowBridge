// swipe.directive.ts

import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appswipeDirective]', standalone:true
})
export class swipeDirective {

  constructor(private el: ElementRef) { }
  private startX?: number;
  private startY?: number;
  private currentX?: number;
  private currentY?: number;
  private threshold: number = 100; // Adjust this to change sensitivity
  private longPressTimeout: any;
  private longPressDuration: number = 300; 

  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();
  @Output() swipeUp = new EventEmitter<void>();
  @Output() swipeDown = new EventEmitter<void>();
  @Output() longPress = new EventEmitter<void>();

  
  // Example of adding a border when the mouse enters the element
  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    if (event instanceof TouchEvent) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
        this.longPressTimeout = setTimeout(() => {
          this.longPress.emit();
        }, this.longPressDuration);
      }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    if (event instanceof TouchEvent) {
        this.currentX = event.touches[0].clientX;
        this.currentY = event.touches[0].clientY;
        clearTimeout(this.longPressTimeout);
      } 
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    clearTimeout(this.longPressTimeout);
    if(this.currentX && this.startX && this.currentY && this.startY){
        if (Math.abs(this.currentX - this.startX) > Math.abs(this.currentY - this.startY)) {
          if (this.currentX > this.startX && Math.abs(this.currentX - this.startX) > this.threshold) {
            this.swipeRight.emit();
          } else if (this.currentX < this.startX && Math.abs(this.currentX - this.startX) > this.threshold) {
            this.swipeLeft.emit();
            
           
          }
        } else {
          if (this.currentY > this.startY && Math.abs(this.currentY - this.startY) > this.threshold) {
            this.swipeDown.emit();
          } else if (this.currentY < this.startY && Math.abs(this.currentY - this.startY) > this.threshold) {
            this.swipeUp.emit();
          }
        }
      }
  }
}
