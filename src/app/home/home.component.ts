import { Component, Inject, OnInit, numberAttribute } from '@angular/core';
import { RouterOutlet,  Router } from '@angular/router';
import {CommonModule} from "@angular/common"
import { TileComponent } from '../tile/tile.component';
import { swipeDirective } from '../swipe.directive';
import { HttpClient } from '@angular/common/http';
import { bounceInRightAnimation, bounceOutLeftAnimation } from '../../assets/lib';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent, swipeDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    bounceOutLeftAnimation(),
    bounceInRightAnimation()
  ]
})

export class HomeComponent implements OnInit{
  applist: any;
  tilesData: any[] = [];
  showUrlTile: boolean=false;
  size:'small' | 'normal' | 'wide' | 'large' = 'large'
  urlData = { "indexVal": 1, "size": this.size, "liveLink": 'test' };
  url: string ="";
  screenWidthUnit: number=0;
  width: string="";
  height: string="";
  animationState = false;
  animationState2 = false;
  delay: number=0;
  selectedIconName: string='';
  constructor(
    private router: Router,
    private http: HttpClient){

    }
  async ngOnInit(): Promise<void> {
    this.animationState2 = false;
    this.tilesData = JSON.parse(localStorage.getItem("tilesData")+"");
    this.screenWidthUnit = window.innerWidth;
    this.width = this.screenWidthUnit + 'px';
    this.height = this.screenWidthUnit + 'px';
    this.monitorUrl();
    this.animate();
  }

  launchRouter(route:any){
    this.animateRight();
    setTimeout(()=>{
      this.router.navigate([route])
    },500)
  
  }
  
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 3000);
  }

  rotate(iconName: string){
    this.selectedIconName =  iconName;
    this.animateRight();
  }

  getDelayForRotateOut(icName:string){
    if(icName===this.selectedIconName){
      return 100;
    }
    else{
      return 0
    }
  }

  getDelay(){
    return Math.floor(Math.random() * (30000 - 1000 + 1)) + 1000;
  }

 monitorUrl(){
  if(localStorage.getItem("monitorUrl")){
    this.url =localStorage.getItem("monitorUrl")+"";
    this.showUrlTile = true;
  }else{
    this.showUrlTile=false;
  }
 }

  
 animateRight() {
  this.animationState2 = !this.animationState2;
}


 getMonitorData(){
  this.urlData = { "indexVal": 1, "size": "large", "liveLink": this.url+"" }
  return this.urlData;
 }
}

