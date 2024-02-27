import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { CommonModule } from '@angular/common';
import { AppListItemComponent } from '../app-list-item/app-list-item.component';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, AppListItemComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit{
  appList:any;
  filteredAppList: any;
  constructor(private bridgeService: BridgeService){}
  async ngOnInit(): Promise<void> {
   let a = await this.bridgeService.getAppList();
   this.appList = a.apps;
   
  for(let i=0; i<this.appList.length; i++){
    const src = await this.bridgeService.getIcon(this.appList[i].packageName);
    this.appList[i]["imageSrc"] = src
  }
    this.filteredAppList = this.appList
    console.log(this.appList)
  } 

  async getIcon(packageName: string){
    await this.bridgeService.getIcon(packageName)
  }

 searchApp($event: any) {
  // If Backspace (keyCode 8) or Delete (keyCode 46) key is not pressed
    this.filteredAppList = this.appList
    const searchText = ($event.target as HTMLInputElement).value.toLowerCase();
    const filteredApps = this.appList.filter((app: any) => app.label.toLowerCase().includes(searchText));
    this.filteredAppList = filteredApps
    // Now 'filteredApps' contains the filtered list of apps based on the search text
    console.log(filteredApps); // You can do whatever you want with the filteredApps, e.g., assign it to a property for displaying in the UI
    if ($event.keyCode === 13) {
      this.bridgeService.launchApp(this.filteredAppList[0].packageName);
    }
  
}

}

