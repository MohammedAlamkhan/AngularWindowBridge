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
  constructor(
    private router: Router,
    private http: HttpClient){

    }
  async ngOnInit(): Promise<void> {
    this.http.get<any[]>('/assets/tiles.json').subscribe(data => {
      this.tilesData = data;
    });
  }

  launchRouter(route:any){
    this.router.navigate([route])
  }

 
}

