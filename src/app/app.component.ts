import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BridgeGetAppsResponse, BridgeInstalledAppInfo} from '@bridgelauncher/api'
import {CommonModule} from "@angular/common"
import { TileComponent } from './tile/tile.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  applist: any;
  async ngOnInit(): Promise<void> {
    // Bridge.showToast('Hello, world!');

    // fetch(Bridge.getAppsURL())
    // .then(resp => resp.json() as unknown as BridgeGetAppsResponse)
    // .then(resp => {
    //     // do something with the list of apps
    //     this.applist= resp.apps 
    //     Bridge.showToast(JSON.stringify(resp.apps));
    // })
  }

  launchApp(packageName: string){
    Bridge.requestLaunchApp(packageName)
  }

  getIcon(packageName: string){
    Bridge.getDefaultAppIconURL(packageName)
  }

  title = 'angularWindowBridge';
}
