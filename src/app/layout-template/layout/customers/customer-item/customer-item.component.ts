import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomer } from '../../../../models/ICustomer.interface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrl: './customer-item.component.css',
})
export class CustomerItemComponent {
  @Input() customer!: ICustomer;
  @Output() onDeleteCustomer: EventEmitter<ICustomer> = new EventEmitter();

  faTrash = faTrash;

  onDelete(customer: ICustomer) {
    this.onDeleteCustomer.emit(customer);
  }
}
