import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { 
  bounceInLeftAnimation,
   bounceOutLeftAnimation,
} from './../../assets/lib/'
@Component({
  selector: 'app-color',
  standalone: true,
  imports: [HeaderComponent,  CommonModule],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css',
  animations: [
    bounceInLeftAnimation(),
    bounceOutLeftAnimation()
  ]
})
export class ColorComponent implements OnInit{
  selectedColor: any;
  screenColor="white";
  duration = 500;
  delay = Math.floor(Math.random() * (800 - 200 + 1)) + 200;
  colorPalettes = [
    { label: "windows 8", colors: ["#be1e4a", "#009700", "#0078c9", "#a900a2", "#930000"] },
    { label: "Melon high", colors: ["#f0fff0", "#f0fff1", "#f0fff5", "#f0fff7", "#f0fff9"] },
    { label: "ClaraWhites Color Palette", colors: ["#fffdd0", "#fffff0", "#f0ead6", "#faf0e6", "#ffffff"] },
    { label: "Dress Code 4 Color Palette", colors: ["#f5ece3", "#f1e2d2", "#e6ceb3", "#ddbf9d", "#d4bca0"] },
    { label: "mo noah Color Palette", colors: ["#abc6a6", "#bad0b6", "#e7ecf0", "#ffc9c9", "#ffbdbe"] },
    { label: "Dress Code Color Palette", colors: ["#ffffff", "#f3f6f4", "#cccccc", "#bbbbbb", "#aaaaaa"] },
    { label: "wedding 1231 Color Palette", colors: ["#cfe2f3", "#9fc5e8", "#cec3e9", "#a592dc", "#f47dc3"] },
    { label: "creamo Color Palette", colors: ["#fee7b7", "#ffedd9", "#feebd4", "#fbe8c0", "#fcf1d9"] },
    { label: "S cream Color Palette", colors: ["#fbebd8", "#ffe1d0", "#ffdcd7", "#ffd4d4", "	#ffc9c9"] },
    { label: "pastel purple Color Palette", colors: ["#e0d6ff", "#e3daff", "#e6deff", "#e9e2ff", "#ece6ff"] },
    { label: "Pink Pastel Color Palette", colors: ["#ffeaea", "#ffe1e1", "	#ffd8d8", "#ffc3c3", "#ffb0b0"] },
    { label: "pastel green Color Palette", colors: ["#e8f4ea", "#e0f0e3", "#d2e7d6", "#c8e1cc", "	#b8d8be"] },
    { label: "2012 Modeled", colors: ["#394f87", "#eb6a2a", "#ffffff", "#000000", "#898989"] },
    { label: "Cold to warm", colors: ["#1d213b", "#ccbbac", "#efc29f", "#ffd966", "#f1c232"] },
    { label: "Testersone", colors: ["#ffffff", "#fffff1", "#fffff2", "#fffff3", "#fffff9"] },
    { label: "Undertale Charas Color Palette", colors: ["#651b01", "#281306", "#fbe9ab", "#efa9f0", "#70e532"] },
    { label: "ClaraPinks", colors: ["#c28285", "#f9cbcb", "#fa8072", "#c77398", "#ffffff"] },
    { label: "ClaraGreys", colors: ["#483c32", "#525252", "#bdaead", "#8b8680", "#ffffff"] }
];

  ngOnInit(): void {
   this.selectedColor = localStorage.getItem("tileColor");
   this.animate();
  }

  
   
  animationState = false;
  animate() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 1);
  }

  getVal(i:number){
    return i*25;
  }


  pickColor(color: string){
    this.selectedColor= color;
    this.screenColor = color;
    localStorage.setItem('tileColor', this.selectedColor);
    localStorage.removeItem('colorPalette');
  }

  customColor($event:any){
    const color = ($event.target as HTMLInputElement).value.toLowerCase();
    this.pickColor(color);
  }

  customUrl($event:any){
    const url = ($event.target as HTMLInputElement).value.toLowerCase();
    localStorage.setItem("monitorUrl",url)
  }

  selectedPalette(cp:any){
    const palette = cp.colors;
    this.screenColor = cp.colors[0];
    localStorage.setItem("colorPalette",palette)
    localStorage.removeItem('tileColor');
  }
}
