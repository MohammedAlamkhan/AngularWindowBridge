import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { CommonModule } from '@angular/common';
import { AppListItemComponent } from '../app-list-item/app-list-item.component';
import { 
  bounceInUpAnimation,
   
} from './../../assets/lib/'
import { swipeDirective } from '../swipe.directive';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, AppListItemComponent, swipeDirective],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
  animations: [
    bounceInUpAnimation()
  ]
})
export class DrawerComponent implements OnInit{
  filteredAppList: any;
  appList:any
  gridItems = ['#', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  groupedApps: any;
  keys: string[]=[];
  filteredGroupedAppList: any;
  originalKeys: string[]=[];
  showFilter: boolean=false;
  animationStateForJumpMenu: boolean=false;
  
  animationState = true;
  show: boolean =  false;
  constructor(private bridgeService: BridgeService,  private router: Router,private viewportScroller: ViewportScroller){}
  async ngOnInit(): Promise<void> {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.appList = JSON.parse(localStorage.getItem("appList")+"");
    this.groupedApps =  JSON.parse(localStorage.getItem("appListByAlphabet")+"")
    this.keys= Object.keys(this.groupedApps)
    this.originalKeys= this.keys;
    this.filteredAppList = this.appList
    this.filteredGroupedAppList = this.groupedApps;
    this.animate();
  } 
  
  isBlack(val: string): boolean {
    const a = this.originalKeys.includes(val.toUpperCase())
    return !a;
    
  }

 
  async getIcon(packageName: string){
    await this.bridgeService.getIcon(packageName)
  }



  openLetterFilter(){
    this.showFilter =  true;
    setTimeout(() => {
      this.animationStateForJumpMenu = true;
    }, 1);
  }

  letterFilter(letter:string, disabled:boolean){
    
    if(!disabled){
      this.showFilter =  false;
    if(this.originalKeys[0]){
      this.filteredGroupedAppList = this.groupedApps
      const t = this.filteredGroupedAppList[letter.toUpperCase()];
      this.filteredGroupedAppList = {};
      let key = letter
      this.filteredGroupedAppList[key] = t;
      this.keys = [letter]
      
      this.animationStateForJumpMenu = false;
    }
    else{
      this.keys=this.originalKeys;
    }
    }
  }

  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.show =  true;
    }, 0);
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

