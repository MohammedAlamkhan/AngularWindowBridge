import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideOutUpAnimation } from '../../assets/lib';
@Component({
  selector: 'app-lockscreen',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './lockscreen.component.html',
  styleUrl: './lockscreen.component.css',
  animations:[slideOutUpAnimation()]
})
export class LockscreenComponent {
  currentDateTime: Date = new Date();
  intervalId: any;
  animationState: boolean=false;
  constructor(
    private router: Router){

    }
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentDateTime = new Date();
    }, 60000); // Update every minute (60000 milliseconds)
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  
  slideUp(){
    this.animate();
    setTimeout(()=>{
      this.router.navigate(['/home'])
    },800)
  
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 0);
  }
}
