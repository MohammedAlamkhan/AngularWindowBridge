import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-editor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home-editor.component.html',
  styleUrl: './home-editor.component.css'
})
export class HomeEditorComponent implements OnInit {
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
   this.data= JSON.parse(localStorage.getItem("tilesData")+"")
  }

  updateData(container: number , subContainer: number , item: number , property: string , value: any) {
    this.data[container].subContainers[subContainer][item][property] = value;
    localStorage.setItem("tilesData", JSON.stringify(this.data))
  }
}