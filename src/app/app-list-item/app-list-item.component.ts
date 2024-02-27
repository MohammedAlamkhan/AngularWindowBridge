import { Component, Input, AfterViewInit } from '@angular/core';
import { BridgeService } from '../bridge.service';

@Component({
  selector: 'app-app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './app-list-item.component.html',
  styleUrl: './app-list-item.component.css'
})

export class AppListItemComponent implements AfterViewInit {
  @Input() imageSrc!: string;
  @Input() label: string | undefined;
  @Input() packageName: any;

  constructor(private bridgeService: BridgeService){
    
  }
 
  ngAfterViewInit(){
    document.getElementById(this.packageName)!.style.backgroundImage = "url("+this.imageSrc+")";
  }



  launch(packageName: string){
   this.bridgeService.launchApp(packageName);
  }
}