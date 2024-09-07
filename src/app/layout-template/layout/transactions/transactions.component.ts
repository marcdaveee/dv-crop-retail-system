import { Component } from '@angular/core';

import {
  IGroupedTransaction,
  ITransaction,
  ITransactionPerWeek,
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
        console.log(this.transactionList);
        if (this.transactionList.length !== 0) {
          console.log('Response: ', res);
          this.groupedTransactions =
            this._transactionService.groupTransactionByMonth(
              this.transactionList
            );
        }
        // this.transactionList.sort(
        //   (a, b) => new Date(b.date).getMonth() - new Date(a.date).getMonth()
        // );
        // console.log('After sort: ', this.transactionList);

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
    let total = this._transactionService.getTotalCapital(transactions);

    return total;
  }

  getTotalExpenses(transactions: ITransaction[]) {
    let total = this._transactionService.getTotalExpenses(transactions);

    return total;
  }

  getTotalRevenues(transactions: ITransaction[]) {
    let total = this._transactionService.getTotalRevenues(transactions);

    return total;
  }

  getReturnOfInvestment(transactions: ITransaction[]) {
    let returnOfInvestment =
      this._transactionService.getReturnOfInvestment(transactions);

    return returnOfInvestment;
  }

  getMonthlyCapital(weeklyTransactions: ITransactionPerWeek[]) {
    let monthlyCapital =
      this._transactionService.getMonthlyCapital(weeklyTransactions);

    return monthlyCapital;
  }

  getMonthlyRevenue(weeklyTransactions: ITransactionPerWeek[]) {
    let monthlyRevenue =
      this._transactionService.getMonthlyRevenue(weeklyTransactions);

    return monthlyRevenue;
  }

  getMonthlyRoi(weeklyTransactions: ITransactionPerWeek[]) {
    let monthlyRoi = this._transactionService.getMonthlyRoi(weeklyTransactions);

    return monthlyRoi;
  }
}
