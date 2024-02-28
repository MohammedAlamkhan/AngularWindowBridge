import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.css'
})
export class PopoverComponent {
  @Input() title: string | undefined;
  @Input() content: string | undefined;
  @Output() okClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancelClicked: EventEmitter<void> = new EventEmitter<void>();

  cancel(){
    this.cancelClicked.emit();
  }


  ok(){
    this.okClicked.emit();
  }
}

