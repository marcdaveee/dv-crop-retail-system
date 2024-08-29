import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGroupedTransaction,
  ITransaction,
  ITransactionPerMonth,
  ITransactionPerWeek,
} from '../models/ITransaction.interface';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient, private _datePipe: DatePipe) {}

  private apiUrl = 'http://localhost:5000/transactions';

  getTransactions(): Observable<ITransaction[]> {
    return this._http.get<ITransaction[]>(this.apiUrl);
  }

  groupTransactionByMonth(
    transactionList: ITransaction[]
  ): IGroupedTransaction {
    const groupedTransactions: IGroupedTransaction = {
      transactionPerMonth: [],
    };

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    let transactionPerMonth: ITransactionPerMonth = {
      month: '',
      transactionPerWeek: [],
    };

    let transactionPerWeek: ITransactionPerWeek[] = [];

    for (let i = currentMonth; i >= 0; i--) {
      let currentMonthInStr: string | null = '';

      const currentMonthTransactions = transactionList.filter((t) => {
        const transactionDate = new Date(t.date);
        if (transactionDate.getMonth() === i) {
          currentMonthInStr = this._datePipe.transform(transactionDate, 'MMMM');
          return true;
        } else {
          return false;
        }
      });

      // Get date of the latest transaction
      const latestTransactionDate = transactionList[0].date;

      const weekInStr = this._datePipe.transform(latestTransactionDate, 'W');

      let weekInNum = weekInStr !== null ? parseInt(weekInStr) : 0;

      weekInNum = weekInNum != 5 ? weekInNum : 5;

      console.log('Latest week number: ', weekInNum);

      for (let i = 5; i > 0; i--) {
        const currentWeekTransactions = currentMonthTransactions.filter((t) => {
          const currentTWeekInStr = this._datePipe.transform(t.date, 'W');
          const currentTWeekInNum =
            currentTWeekInStr !== null ? parseInt(currentTWeekInStr) : 0;

          if (currentTWeekInNum === i) {
            return true;
          } else {
            return false;
          }
        });

        const newTransactionPerWeek: ITransactionPerWeek = {
          week: i,
          transactions: currentWeekTransactions,
        };

        transactionPerWeek.push(newTransactionPerWeek);
      }

      const newTransactionPerMonth: ITransactionPerMonth = {
        month: currentMonthInStr,
        transactionPerWeek: transactionPerWeek,
      };

      groupedTransactions.transactionPerMonth.push(newTransactionPerMonth);
      transactionPerWeek = [];
    }
    console.log('GroupedTransac: ', groupedTransactions);

    return groupedTransactions;
  }

  getISOWeekInMonth(date: string) {
    var d = new Date(date);
    var day = d.getDay();
    var dayOfJan1 = new Date('Jan-1-' + d.getFullYear()).getDay();
    console.log('day of jan 1: ', dayOfJan1);

    var weekNumber = Math.ceil((d.getDate() + 6) / 7);

    if (day < dayOfJan1) {
      weekNumber += 1;
    }

    return weekNumber;
  }
}
