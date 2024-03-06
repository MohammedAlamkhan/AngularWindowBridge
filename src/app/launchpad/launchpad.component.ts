import { Component, OnInit } from '@angular/core';
import { 
  bounceInLeftAnimation
} from './../../assets/lib/'
import { ActivatedRoute, Router } from '@angular/router';
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
  spec: any;
  imageSrc: any;


  constructor(private router: Router, private route: ActivatedRoute){

  }

  ngOnInit(): void { 
    this.spec = JSON.parse(localStorage.getItem('sizeChart')+"")["launcher"];
    this.route.queryParams.subscribe(params => {
      this.imageSrc = params["appSrc"];
    });
  
   
    this.animate();

    setTimeout(() => {
      this.launchRouter();
    }, 900);
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
