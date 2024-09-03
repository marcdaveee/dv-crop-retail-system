import { Component } from '@angular/core';

import {
  IGroupedTransaction,
  ITransaction,
} from '../../../models/ITransaction.interface';
import { TransactionService } from '../../../services/transaction.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactionList: ITransaction[] = [];
  isLoading = true;
  errorMessage = '';
  groupedTransactions: IGroupedTransaction = { transactionPerMonth: [] };

  constructor(private _transactionService: TransactionService) {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        this.transactionList = res;
        // this.transactionList.sort(
        //   (a, b) => new Date(b.date).getMonth() - new Date(a.date).getMonth()
        // );
        // console.log('After sort: ', this.transactionList);
        console.log('Response: ', res);
        this.groupedTransactions =
          this._transactionService.groupTransactionByMonth(
            this.transactionList
          );

        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Failed to load data.';
        this.isLoading = false;
      },
    });
  }

  getTotalCapital(transactions: ITransaction[]) {
    let total = 0;
    transactions.forEach((t) => {
      if (t.type === 0) {
        total += t.amount;
      }
    });
    return total;
  }

  getTotalRevenues(transaction: ITransaction[]) {
    let total = 0;
    transaction.forEach((t) => {
      if (t.type === 1) {
        total += t.amount;
      }
    });
    return total;
  }

  getReturnOfInvestment(transactions: ITransaction[]) {
    let returnOfInvestment = 0;
    const revenue = this.getTotalRevenues(transactions);
    const capital = this.getTotalCapital(transactions);

    returnOfInvestment = revenue - capital;
    return returnOfInvestment;
  }
}
