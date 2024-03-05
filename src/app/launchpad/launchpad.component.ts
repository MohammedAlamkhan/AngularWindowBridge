import { Component, OnInit } from '@angular/core';
import { 
  bounceInLeftAnimation
} from './../../assets/lib/'
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-launchpad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './launchpad.component.html',
  styleUrl: './launchpad.component.css',
  animations: [
    bounceInLeftAnimation()
  ]
})
export class LaunchpadComponent implements OnInit {
  duration = 800;
  delay = 0;
  animationState = false;
  screenWidthUnit: string="";
  screenHeightUnit: string="";
  border: string="";


  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.screenWidthUnit = window.innerWidth*0.98+"px";
    this.screenHeightUnit = window.innerHeight+"px";
    this.border = 0.01*window.innerWidth + "px solid white";
    this.animate();

    setTimeout(() => {
      this.launchRouter();
    }, 1000);
  }

  launchRouter(){
    this.router.navigate(['/home'])
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }

}
