import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { CommonModule } from '@angular/common';
import { AppListItemComponent } from '../app-list-item/app-list-item.component';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, AppListItemComponent],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  animations: [
    bounceInLeftAnimation(),
    bounceOutLeftAnimation()
  ]
})
export class DrawerComponent implements OnInit{
  filteredAppList: any;
  appList:any
  
  duration = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
  delay = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
  constructor(private bridgeService: BridgeService){}
  async ngOnInit(): Promise<void> {
    this.appList = JSON.parse(localStorage.getItem("appList")+"");
    this.filteredAppList = this.appList
    this.animate();
  } 

  async getIcon(packageName: string){
    await this.bridgeService.getIcon(packageName)
  }

  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
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
      ($event.target as HTMLInputElement).value = ''; 
      this.filteredAppList = this.appList
    }
  
}

}

