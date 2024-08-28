import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../models/ICustomer.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private _http: HttpClient) {}

  apiUrl = 'https://localhost:7257/api/customers';

  getAllCustomers(): Observable<ICustomer[]> {
    return this._http.get<ICustomer[]>(this.apiUrl);
  }

  addNewCustomer(newCustomer: ICustomer): Observable<ICustomer> {
    return this._http.post<ICustomer>(this.apiUrl, newCustomer);
  }

  getCustomerById(id: string): Observable<ICustomer> {
    const url = `${this.apiUrl}/${id}`;

    return this._http.get<ICustomer>(url);
  }

  updateCustomer(updatedCustomer: ICustomer): Observable<ICustomer> {
    const url = `${this.apiUrl}/${updatedCustomer.id}`;
    return this._http.put<ICustomer>(url, updatedCustomer);
  }

  deleteCustomer(customer: ICustomer) {
    const url = `${this.apiUrl}/${customer.id}`;

    return this._http.delete(url);
  }
}
