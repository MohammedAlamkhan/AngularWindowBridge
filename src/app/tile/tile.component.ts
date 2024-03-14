import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
import { BrowserModule } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css',
  animations: [
    bounceInLeftAnimation(),
    bounceOutLeftAnimation()
  ]
})
export class TileComponent {
  @Input() size: 'small' | 'normal' | 'wide' | 'large' = 'normal';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() iconName: string = '';
  @Input() launchPackage: string ='';
  @Input() liveLink:string='';
  @Input() indexVal:number=0;
  @Input() explicitColor:string="";

  screenWidthUnit: number=0;
  iconUrl: string="";
  tileColor:any;
  tilePalette: any;
  duration = 400;
  delay = 0;

  animationState = false;
  safeLiveLink: any;
  color: any;
  sizeSpecs: any;
 

  constructor(private bridgeService: BridgeService,private sanitizer: DomSanitizer,private router:Router){
   
  }

  async ngOnInit(): Promise<void> {
    
   
    if(localStorage.getItem("tileColor")){
      this.tileColor = localStorage.getItem("tileColor") + "";
      this.tilePalette = null;
    }
    if(localStorage.getItem("colorPalette")){
      this.tilePalette =   (localStorage.getItem("colorPalette")+"").split(',');
      this.tileColor=null;
    }
    if(!(localStorage.getItem("tileColor") || localStorage.getItem("colorPalette"))){
      this.tileColor = "white"
      localStorage.setItem('tileColor', "gray");
      this.tilePalette = null;
    }
   
    this.sizeSpecs =  JSON.parse(localStorage.getItem("sizeChart")+"")[this.size];
   
    
    this.color = this.getTileColor();
    this.delay = (this.indexVal+1)*25;
    this.iconUrl = `./../assets/svgs/${this.iconName}.svg`;
    
    this.safeLiveLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.liveLink);
    this.animate();
  }

 
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }
 

  launchApp(){

    if(this.launchPackage){
      this.launchRouter('./launch');
      setTimeout(() => {
       
          this.bridgeService.launchApp(this.launchPackage);
        
      }, 450);
      

    }
   
  }

  launchRouter(p:string){
    this.router.navigate([p], { queryParams: { appSrc: this.iconUrl } })
  }


  getTileColor(){
    if(this.explicitColor){
      return this.explicitColor
    }
    else if(this.tilePalette){
      return this.tilePalette[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
    }else{
        return this.tileColor;
    }
  }
}