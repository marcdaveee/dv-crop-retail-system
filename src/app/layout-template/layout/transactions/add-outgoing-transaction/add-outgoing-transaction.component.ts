import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../../../services/transaction.service';
import { SupplierService } from '../../../../services/supplier.service';
import { ISupplier } from '../../../../models/ISupplier.interface';
import {
  IOutgoingTransaction,
  ITransaction,
} from '../../../../models/ITransaction.interface';
import { AlertService } from '../../../../services/alert.service';
import { DialogService } from '../../../../services/dialog.service';
import { ICustomer } from '../../../../models/ICustomer.interface';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { StockService } from '../../../../services/stock.service';

@Component({
  selector: 'app-add-outgoing-transaction',
  templateUrl: './add-outgoing-transaction.component.html',
  styleUrl: './add-outgoing-transaction.component.css',
})
export class AddOutgoingTransactionComponent {
  addOutgoingTransactionForm!: FormGroup;
  customers: ICustomer[] = [];

  isSubmitted = false;

  constructor(
    private _transactionService: TransactionService,
    private _customerService: CustomerService,
    private _alertService: AlertService,
    private _dialogService: DialogService,
    private _stockService: StockService,
    private _router: Router
  ) {
    this.addOutgoingTransactionForm = new FormGroup({
      customerName: new FormControl(null, Validators.required),
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
    this.addOutgoingTransactionForm.patchValue({
      meterKgs:
        (this.addOutgoingTransactionForm.value.moisture / 100) *
        this.addOutgoingTransactionForm.value.netWeight,
    });
    let total =
      (this.addOutgoingTransactionForm.value.moisture / 100) *
      this.addOutgoingTransactionForm.value.netWeight;
    console.log(total);
  }

  onChanges(): void {
    // Do following computation when Net Weight Value is Changed
    this.addOutgoingTransactionForm.controls[
      'netWeight'
    ].valueChanges.subscribe((val) => {
      this.addOutgoingTransactionForm.patchValue({
        meterKgs: (
          (this.addOutgoingTransactionForm.value.moisture / 100) *
          val
        ).toFixed(0),
      });

      this.addOutgoingTransactionForm.patchValue({
        netResecada:
          this.addOutgoingTransactionForm.value.netWeight -
          this.addOutgoingTransactionForm.value.meterKgs,
      });

      this.addOutgoingTransactionForm.patchValue({
        netResecada: (
          this.addOutgoingTransactionForm.value.netResecada -
          Math.round(this.addOutgoingTransactionForm.value.noOfSacks / 6)
        ).toFixed(0),
      });

      console.log(this.addOutgoingTransactionForm.value.meterKgs);
    });

    // Do following computation when Moisture Value is Changed
    this.addOutgoingTransactionForm.controls['moisture'].valueChanges.subscribe(
      (val) => {
        this.addOutgoingTransactionForm.patchValue({
          meterKgs: (
            (val / 100) *
            this.addOutgoingTransactionForm.value.netWeight
          ).toFixed(0),
        });
        this.addOutgoingTransactionForm.patchValue({
          netResecada:
            this.addOutgoingTransactionForm.value.netWeight -
            this.addOutgoingTransactionForm.value.meterKgs,
        });

        this.addOutgoingTransactionForm.patchValue({
          netResecada: (
            this.addOutgoingTransactionForm.value.netResecada -
            Math.round(this.addOutgoingTransactionForm.value.noOfSacks / 6)
          ).toFixed(0),
        });

        // this.addIncomingTransactionForm.patchValue({
        //   netResecada:
        //     this.addIncomingTransactionForm.value.netResecada -
        //     Math.floor(this.addIncomingTransactionForm.value.noOfSacks / 6),
        // });

        console.log(this.addOutgoingTransactionForm.value.meterKgs);
      }
    );

    // Do following computation when Net Resecada Value is Changed
    this.addOutgoingTransactionForm.controls[
      'netResecada'
    ].valueChanges.subscribe((val) => {
      this.addOutgoingTransactionForm.patchValue({
        amount: (
          val * this.addOutgoingTransactionForm.value.pricePerKg
        ).toFixed(2),
      });

      this.addOutgoingTransactionForm.patchValue({
        amount: (
          parseFloat(this.addOutgoingTransactionForm.value.amount) +
          parseFloat(this.addOutgoingTransactionForm.value.expenses)
        ).toFixed(2),
      });
    });

    // Do following computation when Net Price Per Kg Value is Changed
    this.addOutgoingTransactionForm.controls[
      'pricePerKg'
    ].valueChanges.subscribe((val) => {
      this.addOutgoingTransactionForm.patchValue({
        amount: (
          this.addOutgoingTransactionForm.value.netResecada * val
        ).toFixed(2),
      });

      this.addOutgoingTransactionForm.patchValue({
        amount: (
          parseFloat(this.addOutgoingTransactionForm.value.amount) +
          parseFloat(this.addOutgoingTransactionForm.value.expenses)
        ).toFixed(2),
      });
    });

    // Do following computation when No of Sacks Value is Changed
    this.addOutgoingTransactionForm.controls[
      'noOfSacks'
    ].valueChanges.subscribe((val) => {
      this.addOutgoingTransactionForm.patchValue({
        netResecada:
          this.addOutgoingTransactionForm.value.netWeight -
          this.addOutgoingTransactionForm.value.meterKgs,
      });

      this.addOutgoingTransactionForm.patchValue({
        netResecada: (
          this.addOutgoingTransactionForm.value.netResecada -
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
    this._customerService.getAllCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        console.log('Customers Added');
      },
      error: (err) => {
        console.log('Error loading customers', err);
      },
    });
    this.onChanges();

    this._stockService.calculateStock();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.addOutgoingTransactionForm.valid) {
      this._dialogService
        .openConfirmSaveDialog(
          'Are you sure that all of the details are correct?'
        )
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            console.log(this.addOutgoingTransactionForm.value);
            const newOutgoingTransaction: IOutgoingTransaction = {
              date: new Date(
                this.addOutgoingTransactionForm.value.date
              ).toISOString(),
              customer: this.addOutgoingTransactionForm.value.customerName,
              customerId: this.addOutgoingTransactionForm.value.customerName,
              netWeight: this.addOutgoingTransactionForm.value.netWeight,
              moisture: this.addOutgoingTransactionForm.value.moisture,
              meterKgs: this.addOutgoingTransactionForm.value.meterKgs,
              netResecada: this.addOutgoingTransactionForm.value.netResecada,
              pricePerKg:
                this.addOutgoingTransactionForm.value.pricePerKg.toFixed(1),
              amount: this.addOutgoingTransactionForm.value.amount,
              noOfSacks: this.addOutgoingTransactionForm.value.noOfSacks,
              expenses: this.addOutgoingTransactionForm.value.expenses,
              type: 1,
            };

            this._transactionService
              .addOutgoingTransaction(newOutgoingTransaction)
              .subscribe({
                next: (res) => {
                  console.log('Res: ', res);
                  this._alertService.showAlertSuccess(
                    'Outgoing Transaction was added.'
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
            console.log('New Outgoing Transaction: ', newOutgoingTransaction);
          }
        });
    }
  }

  getCurrentStock() {
    return this._stockService.getCurrentStock();
  }
}
