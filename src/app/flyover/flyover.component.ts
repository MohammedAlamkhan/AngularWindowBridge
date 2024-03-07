import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-flyover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flyover.component.html',
  styleUrl: './flyover.component.css'
})
export class FlyoverComponent {
  @Input() options!: string[];
  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  
  ok(content:string){
    console.log(content)
    this.optionSelected.emit(content);
  }

}
