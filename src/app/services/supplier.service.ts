import { Injectable } from '@angular/core';
import { ISupplier } from '../models/ISupplier.interface';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';
import { Observable } from 'rxjs';

interface ServerResponse {
  suppliers: ISupplier[];
}

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private _http: HttpClient) {}

  getAllSuppliers(): Observable<ISupplier[]> {
    return this._http.get<ISupplier[]>('http://localhost:5000/suppliers');
    // .pipe(
    //   map(
    //     (res) => res.suppliers
    //     // const suppliers: ISupplier[] = [];
    //     // for (const id in data) {
    //     //   if (data.hasOwnProperty(id)) {
    //     //     suppliers.push([id]);
    //     //   }
    //     // }

    //     // return suppliers;
    //   )
    // );
  }

  deleteSupplier(supplier: ISupplier): Observable<ISupplier> {
    const url = `http://localhost:5000/suppliers/${supplier.id}`;
    return this._http.delete<ISupplier>(url);
  }
}
