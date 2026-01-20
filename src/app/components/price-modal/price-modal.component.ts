import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-price-modal',
  standalone: true,
  imports: [],
  templateUrl: './price-modal.component.html',
  styleUrl: './price-modal.component.scss'
})
export class PriceModalComponent {
 @Output() close = new EventEmitter<void>();

  @Input() cost = 126805;
  @Input() price = 164847;
  @Input() sheets = 3;
  @Input() details = 6;
  @Input() efficiency = 60.1;
  @Input() waste = 30.9;

  onClose() {
    this.close.emit();
  }
}
