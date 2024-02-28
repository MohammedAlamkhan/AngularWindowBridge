import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-flyover',
  standalone: true,
  imports: [],
  templateUrl: './flyover.component.html',
  styleUrl: './flyover.component.css'
})
export class FlyoverComponent {
  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Output() okClicked: EventEmitter<void> = new EventEmitter<void>();

  
  ok(){
    this.okClicked.emit();
  }

}
