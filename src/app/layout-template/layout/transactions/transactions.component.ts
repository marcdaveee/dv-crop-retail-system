import { Component } from '@angular/core';

import { ITransaction } from '../../../models/ITransaction.interface';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactionList: ITransaction[] = [];

  constructor(private _transactionService: TransactionService) {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        this.transactionList = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
