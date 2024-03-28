import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common"
import { HomeComponent } from './home/home.component';
import { DrawerComponent } from './drawer/drawer.component';
import { HttpClient } from '@angular/common/http';
import { swipeDirective } from './swipe.directive';
import { BridgeService } from './bridge.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, DrawerComponent, RouterLink, swipeDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  title = "windowsphone"
  applist: any;
  screenWidthUnit: number=0;
  tileTypes = ['small','normal', 'wide', 'large'];
  sizeChart:any={};
  borderNo: number=15;
  constructor(  private router: Router, private http: HttpClient, private bridgeService: BridgeService){}
  async ngOnInit(): Promise<void> {

      if(!localStorage.getItem("tilesData")){
        this.getTilesData();
      }
      if(!localStorage.getItem("sizeChart")){
        this.tileTypes.forEach(element => {
          const a = this.calculateTileDimensions(element);
          this.sizeChart[element] = a;
        });
      const w = window.innerWidth*0.98+"px";
      const h = window.innerHeight+"px";
      const b = 0.01*window.innerWidth + "px solid white";
      this.sizeChart["launcher"] = {"width":w,"height":h,"border":b};
      console.log(this.sizeChart)
      localStorage.setItem("sizeChart",JSON.stringify(this.sizeChart))
    
      }


  }

  assistant(){
    this.bridgeService.launchApp("com.google.android.apps.bard");
  }

  calculateTileDimensions(type:string): any {
    this.screenWidthUnit = window.innerWidth * 0.9 /1200;
    const width =   this.screenWidthUnit * (this.getTileWidth(type)) + 'px';
    const height =  this.screenWidthUnit * (this.getTileHeight(type)) + 'px';
    const border = this.borderNo*this.screenWidthUnit+'px';
    return {"width": width, "height":height, "border":border} 
  
  }

  private getTileWidth(size:string): number {
    switch (size) {
      case 'small':
        return (1200/4)-2*this.borderNo; // Aspect ratio maintained
      case 'normal':
        return (1200/2)-2*this.borderNo; // Aspect ratio maintained
      case 'wide':
        return (1200/1)-2*this.borderNo; // Aspect ratio maintained
      case 'large':
        return (1200/1)-2*this.borderNo; // Aspect ratio maintained
      default:
        return (1200/4)-2*this.borderNo; // Default to normal size
    }
  }

  private getTileHeight(size:string): number {
    switch (size) {
      case 'small':
        return (1200/4)-2*this.borderNo; // Aspect ratio maintained
      case 'normal':
        return (1200/2)-2*this.borderNo; // Aspect ratio maintained
      case 'wide':
        return (1200/2)-2*this.borderNo; // Aspect ratio maintained
      case 'large':
        return (1200/1)-2*this.borderNo; // Aspect ratio maintained
      default:
        return (1200/4)-2*this.borderNo; // Default to normal size
    }
  }

  launchRouter(route:any){
    this.router.navigate([route])
  }

  getTilesData(){
    this.http.get<any[]>('/assets/tiles.json').subscribe(data => {
      localStorage.setItem("tilesData",JSON.stringify(data))
    });
    
  }


  backClicked(){
    this.launchRouter('/home')
  }
  homeClicked(){
    this.launchRouter('/home')
  }
  searchClicked(){
    this.launchRouter('/drawer')
  }
  taskClicked(){}
}
