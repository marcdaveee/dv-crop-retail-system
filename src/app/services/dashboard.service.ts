import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICount } from '../models/ICount.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'https://localhost:7257/api/counts';

  constructor(private _http: HttpClient) {}

  getDashboardCountData(): Observable<ICount> {
    return this._http.get<ICount>(
      `${this.apiUrl}?types=customer&types=supplier&types=stocks&types=transaction`
    );
  }
}
