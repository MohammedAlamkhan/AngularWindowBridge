import { Injectable } from '@angular/core';
import {BridgeGetAppsResponse} from '@bridgelauncher/api'
import { BridgeMock } from '@bridgelauncher/api-mock';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BridgeService {
  appList: any;
  constructor(private http: HttpClient) { 
    window.Bridge = new BridgeMock();
    // Bridge.showToast('Hello, world!');
    if(!localStorage.getItem("appList")){
      this.getFinalList();
    }
   
    
  }


  async getFinalList(): Promise<void> {
    let a = await this.getAppList();
    this.appList = a.apps;
    
   for(let i=0; i<this.appList.length; i++){
     const src = await this.getAsset(this.appList[i].label, this.appList[i].packageName).subscribe(
      path=>{
        this.appList[i]["imageSrc"] = path
      }
     );
     
   }
   


    

     this.appList.sort((a:any, b:any) => {
      const labelA = a.label.toUpperCase();
      const labelB = b.label.toUpperCase();
      if (labelA < labelB) {
          return -1;
      }
      if (labelA > labelB) {
          return 1;
      }
      return 0;
    });
    

    console.log("beforeTimeoout", this.appList)
    setTimeout(()=>{this.setData()}, 3000)
      
   } 
 


  setData(){
    console.log(this.appList, "now setting")
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

  getAsset(label: string, packageName:string): Observable<string> {
    return this.http.head("/assets/svgs/"+label.toLowerCase().replace(" ", "_")+".svg", { observe: 'response' }).pipe(
      map(response => {
        // If the asset exists, return its path
        return "/assets/svgs/"+label.toLowerCase()+".svg";
      }),
      catchError(error => {
        // If the asset does not exist, return the default path
        return this.getIcon(packageName);
      })
    );
  }

  async getIcon(packageName: string){
    return Bridge.getDefaultAppIconURL(packageName)
  }

}
