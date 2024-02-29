import { Injectable } from '@angular/core';
import {BridgeGetAppsResponse} from '@bridgelauncher/api'
import { BridgeMock } from '@bridgelauncher/api-mock';
@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  appList: any;
  constructor() { 
    // window.Bridge = new BridgeMock();
    // Bridge.showToast('Hello, world!');
    this.getFinalList();
  }


  async getFinalList(): Promise<void> {
    let a = await this.getAppList();
    this.appList = a.apps;
    
   for(let i=0; i<this.appList.length; i++){
     const src = await this.getIcon(this.appList[i].packageName);
     this.appList[i]["imageSrc"] = src
   }
     console.log(this.appList)
     localStorage.setItem("appList", JSON.stringify(this.appList))
   } 
 

  async getAppList(){
    let a = fetch(Bridge.getAppsURL())
    .then(resp => resp.json() as unknown as BridgeGetAppsResponse)
    return a
  }
  
  launchApp(packageName: string){
    Bridge.requestLaunchApp(packageName)
  }

  async getIcon(packageName: string){
    return Bridge.getDefaultAppIconURL(packageName)
  }

}
