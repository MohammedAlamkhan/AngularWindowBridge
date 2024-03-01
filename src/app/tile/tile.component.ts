import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BridgeService } from '../bridge.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
import { BrowserModule } from '@angular/platform-browser';
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
  screenWidthUnit: number=0;
  iconUrl: string="";
  tileColor:any;
  tilePalette: any;
  duration = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;
  delay = Math.floor(Math.random() * (1000 - 700 + 1)) + 700;

  animationState = false;
 

  constructor(private bridgeService: BridgeService){
   
    
   
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
      localStorage.setItem('tileColor', "white");
      this.tilePalette = null;
    }
    
  }

  async ngOnInit(): Promise<void> {
    this.iconUrl = `./../assets/svgs/${this.iconName}.svg`;
    this.animate();
  }

 
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }
 

  calculateTileDimensions(): { width: string; height: string, border:string } {
    this.screenWidthUnit = window.innerWidth/1200;
    const width = this.getTileWidth() + 'px';
    const height = this.getTileHeight() + 'px';
    const border = 5*this.screenWidthUnit+'px';
    return { width, height, border };
  }

  private getTileWidth(): number {
    switch (this.size) {
      case 'small':
        return 290*this.screenWidthUnit; // Aspect ratio maintained
      case 'normal':
        return 590*this.screenWidthUnit; // Aspect ratio maintained
      case 'wide':
        return 1190*this.screenWidthUnit; // Aspect ratio maintained
      case 'large':
        return 1190*this.screenWidthUnit; // Aspect ratio maintained
      default:
        return 590*this.screenWidthUnit; // Default to normal size
    }
  }

  private getTileHeight(): number {
    switch (this.size) {
      case 'small':
        return 290*this.screenWidthUnit; // Aspect ratio maintained
      case 'normal':
        return 590*this.screenWidthUnit; // Aspect ratio maintained
      case 'wide':
        return 560*this.screenWidthUnit; // Aspect ratio maintained
      case 'large':
        return 1190*this.screenWidthUnit; // Aspect ratio maintained
      default:
        return 590*this.screenWidthUnit; // Default to normal size
    }
  }

  launchApp(){
    console.log("clicked")
    if(this.launchPackage){
      
      this.bridgeService.launchApp(this.launchPackage);
    }
  }

  getTileColor(){
    if(this.tilePalette){
      return this.tilePalette[Math.floor(Math.random() * (4 - 0 + 1)) + 0];
    }else{
        return this.tileColor;
    }
  }
}