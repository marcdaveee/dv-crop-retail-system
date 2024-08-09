import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SupplierService } from '../../../services/supplier.service';
import { ISupplier } from '../../../models/ISupplier.interface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  suppliers: ISupplier[] = [];

  constructor(private _supplierService: SupplierService) {}

  ngOnInit() {
    this._supplierService.getAllSuppliers().subscribe((suppliers) => {
      this.suppliers = suppliers;
      console.log(this.suppliers);
    });
  }

  // getSuppliers() {
  //   this,
  // }

  // {
  //   next: (data: ISupplier[]) => {
  //     this.suppliers = data;
  //     console.log('Suppliers:', this.suppliers);
  //   },
  //   error: (error) => {
  //     console.log('Failed to fetch data', error);
  //   },
  // }
}
