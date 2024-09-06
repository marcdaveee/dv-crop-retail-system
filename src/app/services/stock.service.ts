import { Injectable } from '@angular/core';
import { TransactionService } from './transaction.service';
import { ITransaction } from '../models/ITransaction.interface';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  currentStock = 0;

  constructor(private _transactionService: TransactionService) {
    this.calculateStock();
  }

  calculateStock() {
    this._transactionService.getTransactions().subscribe({
      next: (res) => {
        const transactions = res;
        let totalIncomingStocks = 0;
        let totalOutgoingStocks = 0;

        transactions.forEach((t) => {
          console.log(`Current meter kgs: ${t.meterKgs}, type: ${t.type} `);
          if (t.type === 0) {
            totalIncomingStocks += t.netWeight;
          } else {
            totalOutgoingStocks += t.netWeight;
          }
        });

        this.currentStock = totalIncomingStocks - totalOutgoingStocks;
        console.log('Incoming stock: ', totalIncomingStocks);
        console.log('Outgoing stock: ', totalOutgoingStocks);
        console.log(this.currentStock);
      },
    });
  }

  getCurrentStock() {
    // this.calculateStock();
    return this.currentStock;
  }
}
