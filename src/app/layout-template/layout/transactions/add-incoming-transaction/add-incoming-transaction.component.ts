import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../../../services/transaction.service';
import { SupplierService } from '../../../../services/supplier.service';
import { ISupplier } from '../../../../models/ISupplier.interface';
import {
  IIncomingTransaction,
  ITransaction,
} from '../../../../models/ITransaction.interface';
import { AlertService } from '../../../../services/alert.service';
import { DialogService } from '../../../../services/dialog.service';
import { Router } from '@angular/router';
import { StockService } from '../../../../services/stock.service';

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
    private _supplierService: SupplierService,
    private _stockService: StockService,
    private _alertService: AlertService,
    private _dialogService: DialogService,
    private _router: Router
  ) {
    this.addIncomingTransactionForm = new FormGroup({
      supplierName: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      netWeight: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
      ]),
      moisture: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      meterKgs: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      netResecada: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      pricePerKg: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      expenses: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9].*$'),
        Validators.min(1),
      ]),
      noOfSacks: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.min(1),
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
    // Do following computation when Net Weight Value is Changed
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

      this.addIncomingTransactionForm.patchValue({
        netResecada: (
          this.addIncomingTransactionForm.value.netResecada -
          Math.round(this.addIncomingTransactionForm.value.noOfSacks / 6)
        ).toFixed(0),
      });

      console.log(this.addIncomingTransactionForm.value.meterKgs);
    });

    // Do following computation when Moisture Value is Changed
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

        this.addIncomingTransactionForm.patchValue({
          netResecada: (
            this.addIncomingTransactionForm.value.netResecada -
            Math.round(this.addIncomingTransactionForm.value.noOfSacks / 6)
          ).toFixed(0),
        });

        // this.addIncomingTransactionForm.patchValue({
        //   netResecada:
        //     this.addIncomingTransactionForm.value.netResecada -
        //     Math.floor(this.addIncomingTransactionForm.value.noOfSacks / 6),
        // });

        console.log(this.addIncomingTransactionForm.value.meterKgs);
      }
    );

    // Do following computation when Net Resecada Value is Changed
    this.addIncomingTransactionForm.controls[
      'netResecada'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        amount: (
          val * this.addIncomingTransactionForm.value.pricePerKg
        ).toFixed(2),
      });

      this.addIncomingTransactionForm.patchValue({
        amount: (
          parseFloat(this.addIncomingTransactionForm.value.amount) +
          parseFloat(this.addIncomingTransactionForm.value.expenses)
        ).toFixed(2),
      });
    });

    // Do following computation when Net Price Per Kg Value is Changed
    this.addIncomingTransactionForm.controls[
      'pricePerKg'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        amount: (
          this.addIncomingTransactionForm.value.netResecada * val
        ).toFixed(2),
      });

      this.addIncomingTransactionForm.patchValue({
        amount: (
          parseFloat(this.addIncomingTransactionForm.value.amount) +
          parseFloat(this.addIncomingTransactionForm.value.expenses)
        ).toFixed(2),
      });
    });

    // Do following computation when No of Sacks Value is Changed
    this.addIncomingTransactionForm.controls[
      'noOfSacks'
    ].valueChanges.subscribe((val) => {
      this.addIncomingTransactionForm.patchValue({
        netResecada:
          this.addIncomingTransactionForm.value.netWeight -
          this.addIncomingTransactionForm.value.meterKgs,
      });

      this.addIncomingTransactionForm.patchValue({
        netResecada: (
          this.addIncomingTransactionForm.value.netResecada -
          Math.round(val / 6)
        ).toFixed(0),
      });

      console.log('No of sacks /6: ', Math.round(val / 6));
    });

    // // Do the following computation when Expenses field value is changed
    // this.addIncomingTransactionForm.controls['expenses'].valueChanges.subscribe(
    //   (val) => {
    //     this.addIncomingTransactionForm.patchValue({
    //       amount: (
    //         this.addIncomingTransactionForm.value.netResecada *
    //         this.addIncomingTransactionForm.value.pricePerKg
    //       ).toFixed(2),
    //     });

    //     this.addIncomingTransactionForm.patchValue({
    //       amount: (
    //         parseFloat(this.addIncomingTransactionForm.value.amount) +
    //         parseFloat(val)
    //       ).toFixed(2),
    //     });
    //     console.log(this.addIncomingTransactionForm.value.amount);
    //   }
    // );
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

    this._stockService.calculateStock();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.addIncomingTransactionForm.valid) {
      this._dialogService
        .openConfirmSaveDialog(
          'Are you sure that all of the details are correct?'
        )
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            console.log(this.addIncomingTransactionForm.value);
            const newIncomingTransaction: IIncomingTransaction = {
              date: new Date(
                this.addIncomingTransactionForm.value.date
              ).toISOString(),
              supplier: this.addIncomingTransactionForm.value.supplierName,
              supplierId: this.addIncomingTransactionForm.value.supplierName,
              netWeight: this.addIncomingTransactionForm.value.netWeight,
              moisture: this.addIncomingTransactionForm.value.moisture,
              meterKgs: this.addIncomingTransactionForm.value.meterKgs,
              netResecada: this.addIncomingTransactionForm.value.netResecada,
              pricePerKg:
                this.addIncomingTransactionForm.value.pricePerKg.toFixed(1),
              amount: this.addIncomingTransactionForm.value.amount,
              noOfSacks: this.addIncomingTransactionForm.value.noOfSacks,
              expenses: this.addIncomingTransactionForm.value.expenses,
              type: 0,
            };

            this._transactionService
              .addIncomingTransaction(newIncomingTransaction)
              .subscribe({
                next: (res) => {
                  console.log('Res: ', res);
                  this._alertService.showAlertSuccess(
                    'Incoming Transaction was added.'
                  );
                  this._router.navigate(['/transactions']);
                },
                error: (err) => {
                  console.log('error occured', err);
                  this._alertService.showAlertSuccess(
                    'Error Occured. Transaction was not added'
                  );
                },
              });
            console.log('New Incoming Transaction: ', newIncomingTransaction);
          }
        });
    }
  }

  getCurrentStock() {
    return this._stockService.getCurrentStock();
  }
}
