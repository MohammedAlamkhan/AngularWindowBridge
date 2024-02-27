import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {CommonModule} from "@angular/common"
import { HomeComponent } from './home/home.component';
import { DrawerComponent } from './drawer/drawer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomeComponent, DrawerComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  title = "windowsphone"
  applist: any;
  async ngOnInit(): Promise<void> {
  
  }

}
