import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { 
  bounceInUpAnimation
} from './../../assets/lib/'
import { Router } from '@angular/router';
import { swipeDirective } from '../swipe.directive';
import { FlyoverComponent } from '../flyover/flyover.component';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../popover/popover.component';
@Component({
  selector: 'app-app-list-item',
  standalone: true,
  imports: [swipeDirective,  FlyoverComponent, CommonModule, PopoverComponent],
  templateUrl: './app-list-item.component.html',
  styleUrl: './app-list-item.component.css',
  animations: [
    bounceInUpAnimation()
  ]
})

export class AppListItemComponent implements AfterViewInit, OnInit {
  @Input() imageSrc!: string;
  @Input() label: string | undefined;
  @Input() packageName: any;
  @Input() indexNo!: number;

  duration = 300;
  delay = 0;
  showFlyover: boolean = false;
  showPopup: boolean=false;
  constructor(private bridgeService: BridgeService, private router: Router){
    
  }
  ngOnInit(): void {
    this.animate();
    this.delay = (this.indexNo+4)*75 < 1000 ? (this.indexNo+4)*75 : 1000;//4 because there are 3 elements above all apps and 1 for index 0
  }

 
  
  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 100);
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
    this.router.navigate([p], { queryParams: { appSrc: this.imageSrc } })
  }


  launch(packageName: string){
    this.launchRouter('./launch');
    setTimeout(() => {
      this.bridgeService.launchApp(packageName);
    }, 450);
    
  }

  popUp(t:any){
    this.showFlyover = true;
    console.log(t)
  }

  performAction($event: any){
    this.showFlyover = false;
    if($event == "app info"){
        this.bridgeService.launchAppInfo(this.packageName)
    }
    
    if($event == "uninstall"){
      this.showPopup=true;
    }
    if($event == "pin on homescreen"){
      this.pin();
    }
    
  }


  pin() {
    // let tile ={}
    // let data = JSON.parse(localStorage.getItem("tilesData")+"");
    // if(data[data.length-1].subContainers.length ==1){
    //   data[data.length-1].subContainers.push(tile);
    // }
    // else if(data[data.length-1].subContainers.length ==2){

    // }
  }

  requestUninstall(){
    this.showPopup=false;
    this.bridgeService.uninstallApp(this.packageName)
  }

  closePopUp(){
    this.showPopup=false;
  }
}