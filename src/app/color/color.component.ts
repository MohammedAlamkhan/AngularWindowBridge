import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './color.component.html',
  styleUrl: './color.component.css'
})
export class ColorComponent implements OnInit{
  selectedColor: any;
  ngOnInit(): void {
   this.selectedColor = localStorage.getItem("tileColor");
  }

  pickColor(color: string){
    this.selectedColor= color;

    localStorage.setItem('tileColor', this.selectedColor);
  }
}
