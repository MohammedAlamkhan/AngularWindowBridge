import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet,  Router } from '@angular/router';
import {CommonModule} from "@angular/common"
import { TileComponent } from '../tile/tile.component';
import { swipeDirective } from '../swipe.directive';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent, swipeDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
  constructor(
    private router: Router,
    private http: HttpClient){

    }
  async ngOnInit(): Promise<void> {
    this.http.get<any[]>('/assets/tiles.json').subscribe(data => {
      this.tilesData = data;
    });
    this.screenWidthUnit = window.innerWidth;
    this.width = this.screenWidthUnit + 'px';
    this.height = this.screenWidthUnit + 'px';
    this.monitorUrl();
  }

  launchRouter(route:any){
    this.router.navigate([route])
  }

 monitorUrl(){
  if(localStorage.getItem("monitorUrl")){
    this.url =localStorage.getItem("monitorUrl")+"";
    this.showUrlTile = true;
  }else{
    this.showUrlTile=false;
  }
 }

 getMonitorData(){
  this.urlData = { "indexVal": 1, "size": "large", "liveLink": this.url+"" }
  return this.urlData;
 }
}

