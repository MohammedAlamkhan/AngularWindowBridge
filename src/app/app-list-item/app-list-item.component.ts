import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
@Component({
  selector: 'app-app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './app-list-item.component.html',
  styleUrl: './app-list-item.component.css',
  animations: [
    bounceInLeftAnimation(),
    bounceOutLeftAnimation()
  ]
})

export class AppListItemComponent implements AfterViewInit, OnInit {
  @Input() imageSrc!: string;
  @Input() label: string | undefined;
  @Input() packageName: any;

  duration = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;
  delay = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;
  constructor(private bridgeService: BridgeService){
    
  }
  ngOnInit(): void {
    this.animate();
  }
 
  
  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }


  ngAfterViewInit(){
    document.getElementById(this.packageName)!.style.backgroundImage = "url("+this.imageSrc+")";
  }



  launch(packageName: string){
   this.bridgeService.launchApp(packageName);
  }
}