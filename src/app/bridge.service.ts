import { Injectable } from '@angular/core';
import {BridgeGetAppsResponse} from '@bridgelauncher/api'
import { BridgeMock } from '@bridgelauncher/api-mock';
@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  constructor() { 
    //window.Bridge = new BridgeMock();
    //Bridge.showToast('Hello, world!');

  }


  async getAppList(){
    let a = fetch(Bridge.getAppsURL())
    .then(resp => resp.json() as unknown as BridgeGetAppsResponse)
    console.log(a)
    return a
  }
  
  launchApp(packageName: string){
    Bridge.requestLaunchApp(packageName)
  }

  async getIcon(packageName: string){
    return Bridge.getDefaultAppIconURL(packageName)
  }

}
