import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common"
import { TileComponent } from '../tile/tile.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  applist: any;
  async ngOnInit(): Promise<void> {
 
  }
}

