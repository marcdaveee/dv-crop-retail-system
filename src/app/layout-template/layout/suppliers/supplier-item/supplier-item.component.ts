import { Component, Input, OnInit } from '@angular/core';
import { ISupplier } from '../../../../models/ISupplier.interface';

@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrl: './supplier-item.component.css',
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier: ISupplier | null = null;

  constructor() {}

  ngOnInit(): void {}
}
