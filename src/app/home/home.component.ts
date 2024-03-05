import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet,  Router } from '@angular/router';
import {CommonModule} from "@angular/common"
import { TileComponent } from '../tile/tile.component';
import { swipeDirective } from '../swipe.directive';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent, swipeDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  applist: any;
  constructor(
    private router: Router){

    }
  async ngOnInit(): Promise<void> {
    
  }

  launchRouter(route:any){
    this.router.navigate([route])
  }

 
}

