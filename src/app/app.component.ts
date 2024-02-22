import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BridgeGetAppsResponse, BridgeInstalledAppInfo} from '@bridgelauncher/api'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{
  async ngOnInit(): Promise<void> {
    Bridge.showToast('Hello, world!');

    fetch(Bridge.getAppsURL())
    .then(resp => resp.json() as unknown as BridgeGetAppsResponse)
    .then(resp => {
        // do something with the list of apps
        resp.apps 
        Bridge.showToast(JSON.stringify(resp.apps));
    })
  }


  title = 'angularWindowBridge';
}
