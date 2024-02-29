import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BridgeService } from '../bridge.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.css'
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
    this.iconUrl = `./../assets/icons/${this.iconName}.svg`;
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
      return this.tilePalette[this.getRandomInt(0, 4)];
    }else{
        return this.tileColor;
    }
  }

   getRandomInt(min: any, max: any) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}