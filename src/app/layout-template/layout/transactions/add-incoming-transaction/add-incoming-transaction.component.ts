import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../../../services/transaction.service';
import { SupplierService } from '../../../../services/supplier.service';
import { ISupplier } from '../../../../models/ISupplier.interface';

@Component({
  selector: 'app-add-incoming-transaction',
  templateUrl: './add-incoming-transaction.component.html',
  styleUrl: './add-incoming-transaction.component.css',
})
export class AddIncomingTransactionComponent implements OnInit {
  addIncomingTransactionForm!: FormGroup;
  suppliers: ISupplier[] = [];

  isSubmitted = false;

  constructor(
    private _transactionService: TransactionService,
    private _supplierService: SupplierService
  ) {
    this.addIncomingTransactionForm = new FormGroup({
      supplierName: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      netWeight: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      moisture: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
      ]),
      meterKgs: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
      ]),
      netResecada: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
      ]),
      pricePerKg: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
      ]),
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
      ]),
      noOfSacks: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  onCalculateMeterKg() {
    this.addIncomingTransactionForm.patchValue({
      meterKgs:
        (this.addIncomingTransactionForm.value.moisture / 100) *
        this.addIncomingTransactionForm.value.netWeight,
    });
    let total =
      (this.addIncomingTransactionForm.value.moisture / 100) *
      this.addIncomingTransactionForm.value.netWeight;
    console.log(total);
  }

  onChanges(): void {
    this.addIncomingTransactionForm.controls[
      'netWeight'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        meterKgs: (
          (this.addIncomingTransactionForm.value.moisture / 100) *
          val
        ).toFixed(0),
      });

      this.addIncomingTransactionForm.patchValue({
        netResecada:
          this.addIncomingTransactionForm.value.netWeight -
          this.addIncomingTransactionForm.value.meterKgs,
      });
      console.log(this.addIncomingTransactionForm.value.meterKgs);
    });

    this.addIncomingTransactionForm.controls['moisture'].valueChanges.subscribe(
      (val) => {
        this.addIncomingTransactionForm.patchValue({
          meterKgs: (
            (val / 100) *
            this.addIncomingTransactionForm.value.netWeight
          ).toFixed(0),
        });
        this.addIncomingTransactionForm.patchValue({
          netResecada:
            this.addIncomingTransactionForm.value.netWeight -
            this.addIncomingTransactionForm.value.meterKgs,
        });
        console.log(this.addIncomingTransactionForm.value.meterKgs);
      }
    );

    this.addIncomingTransactionForm.controls[
      'netResecada'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        amount: (
          val * this.addIncomingTransactionForm.value.pricePerKg
        ).toFixed(2),
      });
    });

    this.addIncomingTransactionForm.controls[
      'pricePerKg'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        amount: (
          this.addIncomingTransactionForm.value.netResecada * val
        ).toFixed(2),
      });
    });
  }

  ngOnInit(): void {
    this._supplierService.getAllSuppliers().subscribe({
      next: (res) => {
        this.suppliers = res;
        console.log('Supplier Added');
      },
      error: (err) => {
        console.log('Error loading suppliers', err);
      },
    });
    this.onChanges();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.addIncomingTransactionForm.valid) {
      console.log(this.addIncomingTransactionForm.value);
    }
  }
}
