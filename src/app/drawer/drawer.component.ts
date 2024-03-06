import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { CommonModule } from '@angular/common';
import { AppListItemComponent } from '../app-list-item/app-list-item.component';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
import { swipeDirective } from '../swipe.directive';
import { Router } from '@angular/router';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, AppListItemComponent, swipeDirective],
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
  
  duration = 500;
  delay = 100;
  groupedApps: any;
  keys: string[]=[];
  filteredGroupedAppList: any;
  originalKeys: string[]=[];
  constructor(private bridgeService: BridgeService,  private router: Router){}
  async ngOnInit(): Promise<void> {
    this.appList = JSON.parse(localStorage.getItem("appList")+"");
    this.groupedApps =  JSON.parse(localStorage.getItem("appListByAlphabet")+"")
    this.keys= Object.keys(this.groupedApps)
    this.originalKeys= this.keys;
    this.filteredAppList = this.appList
    this.filteredGroupedAppList = this.groupedApps;
    this.animate();
  } 

  async getIcon(packageName: string){
    await this.bridgeService.getIcon(packageName)
  }


  letterFilter(letter:string){
    if(this.keys[1]){
      const t = this.filteredAppList[letter];
      this.filteredAppList = {};
      let key = letter
      this.filteredAppList[key] = t;
      this.keys = [letter]
    }
    else{
      this.keys=this.originalKeys;
    }
   
  }
  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }

  
  launchRouter(route:any){
    this.router.navigate([route])
  }


  
 searchApp($event: any) {
    const searchString = ($event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGroupedAppList = {};

    // Iterate over keys in groupedApps
    for (let key in this.groupedApps) {
        // Filter apps in each group based on search string
        this.filteredGroupedAppList[key] = this.groupedApps[key].filter((app: any) => {
            // You can adjust the condition based on your search criteria
            return app.label.toLowerCase().includes(searchString.toLowerCase());
            
        });
    }
  
  }
}

