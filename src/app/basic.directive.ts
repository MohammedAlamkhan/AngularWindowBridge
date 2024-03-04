// basic.directive.ts

import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appBasicDirective]', standalone:true
})
export class BasicDirective {

  constructor(private el: ElementRef) { }
  private startX?: number;
  private startY?: number;
  private currentX?: number;
  private currentY?: number;
  private threshold: number = 150; // Adjust this to change sensitivity


  @Output() swipeLeft = new EventEmitter<void>();
  @Output() swipeRight = new EventEmitter<void>();
  @Output() swipeUp = new EventEmitter<void>();
  @Output() swipeDown = new EventEmitter<void>();

  
  // Example of adding a border when the mouse enters the element
  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    console.log("touchstart", event)
    if (event instanceof TouchEvent) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;
      }
  }

  @HostListener('touchmove', ['$event']) onTouchMove(event: TouchEvent) {
    console.log("touchmove", event)
    if (event instanceof TouchEvent) {
        this.currentX = event.touches[0].clientX;
        this.currentY = event.touches[0].clientY;
      } 
  }

  @HostListener('touchend', ['$event']) onTouchEnd(event: TouchEvent) {
    console.log("touchend", event)
    if(this.currentX && this.startX && this.currentY && this.startY){
        if (Math.abs(this.currentX - this.startX) > Math.abs(this.currentY - this.startY)) {
          if (this.currentX > this.startX && Math.abs(this.currentX - this.startX) > this.threshold) {
            console.log('Swiped Right');
            this.swipeRight.emit();
          } else if (this.currentX < this.startX && Math.abs(this.currentX - this.startX) > this.threshold) {
            console.log('Swiped Left');
            this.swipeLeft.emit();
            
           
          }
        } else {
          if (this.currentY > this.startY && Math.abs(this.currentY - this.startY) > this.threshold) {
            console.log('Swiped Down');
            this.swipeDown.emit();
          } else if (this.currentY < this.startY && Math.abs(this.currentY - this.startY) > this.threshold) {
            console.log('Swiped Up');
            this.swipeUp.emit();
          }
        }
      }
  }
}
