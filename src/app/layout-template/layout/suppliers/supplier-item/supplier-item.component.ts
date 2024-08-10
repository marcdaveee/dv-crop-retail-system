import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ISupplier } from '../../../../models/ISupplier.interface';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SupplierService } from '../../../../services/supplier.service';

@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrl: './supplier-item.component.css',
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier!: ISupplier;

  @Output() onDeleteSupplier: EventEmitter<ISupplier> = new EventEmitter();

  faTrash = faTrash;

  constructor(
    private _supplierService: SupplierService,
    private _router: Router
  ) {}

  onDelete(supplier: ISupplier) {
    this.onDeleteSupplier.emit(supplier);
  }

  ngOnInit(): void {}
}
