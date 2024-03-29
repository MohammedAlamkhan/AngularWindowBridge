import { Component, OnInit } from '@angular/core';
import { AppListItemComponent } from '../app-list-item/app-list-item.component';
import { CommonModule } from '@angular/common';
import { BridgeService } from '../bridge.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AppListItemComponent, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  animationState: boolean = false;
  groupedApps: any;
  filteredGroupedAppList: any;
  spec: any;

  constructor(private bridgeService: BridgeService){}
  ngOnInit(): void {
    
    this.spec = JSON.parse(localStorage.getItem('sizeChart')+"")["launcher"];
    this.groupedApps =  JSON.parse(localStorage.getItem("appList")+"")
    this.filteredGroupedAppList = this.groupedApps;
    //this.animate();
  }

  // animate() {
  //   this.animationState = false;
  //   setTimeout(() => {
  //     this.animationState = true;
  //   }, 1);
  // }

  searchApp($event: any) {
    
    const searchString = ($event.target as HTMLInputElement).value.toLowerCase();
    if($event.key ==="Enter"){
      if( this.filteredGroupedAppList[0]){

        this.bridgeService.launchApp( this.filteredGroupedAppList[0].packageName);
      }
      else{
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchString)}`;
        window.open(searchUrl, '_blank');
      }
     
    }else{
      this.filteredGroupedAppList = this.groupedApps.filter((app: any) => {
        // You can adjust the condition based on your search criteria
        return app.label.toLowerCase().includes(searchString.toLowerCase());
        
    });
    }
  }

}

