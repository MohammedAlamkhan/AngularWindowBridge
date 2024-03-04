import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
import { Router } from '@angular/router';
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
  @Input() indexNo!: number;

  duration = 500;
  delay = 0;
  constructor(private bridgeService: BridgeService, private router: Router){
    
  }
  ngOnInit(): void {
    this.animate();
    this.delay = (this.indexNo+1)*25;
  }

 
  
  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }


  ngAfterViewInit(){
    let bg = "white";
    if(localStorage.getItem("tileColor")){
        bg= localStorage.getItem("tileColor")+"";
    }else{
      bg=localStorage.getItem("colorPalette")!.split(',')[Math.floor(Math.random() * (4 - 0 + 1)) + 0]
    }
    document.getElementById(this.packageName)!.style.backgroundImage = "url("+this.imageSrc+")";
    document.getElementById(this.packageName)!.style.backgroundColor =  bg;
    document.getElementById(this.packageName)!.style.backgroundSize = "contain";
  }


  launchRouter(p:string){
    this.router.navigate([p])
  }


  launch(packageName: string){
    this.launchRouter('./launch');
    setTimeout(() => {
      this.bridgeService.launchApp(packageName);
    }, 1000);
    
  }
}