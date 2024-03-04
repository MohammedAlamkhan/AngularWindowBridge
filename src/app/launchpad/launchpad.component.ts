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


  constructor(private router: Router){

  }

  ngOnInit(): void {
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
