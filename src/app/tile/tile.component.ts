import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
  screenWidthUnit: number=0;
  iconUrl: string="";

 

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

}