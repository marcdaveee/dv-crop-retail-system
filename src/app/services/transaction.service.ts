import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/ITransaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private _http: HttpClient) {}

  private apiUrl = 'http://localhost:5000/transactions';

  getTransactions(): Observable<ITransaction[]> {
    return this._http.get<ITransaction[]>(this.apiUrl);
  }
}
