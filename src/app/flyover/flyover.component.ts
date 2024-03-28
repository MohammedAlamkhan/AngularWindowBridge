import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-flyover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flyover.component.html',
  styleUrl: './flyover.component.css'
})
export class FlyoverComponent implements OnInit {
 
  @Input() options!: string[];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  height= "";
  ngOnInit(): void {
    this.height= this.options.length* 50 +"px"
  }

  ok(content:string){
    this.optionSelected.emit(content);
  }

}
