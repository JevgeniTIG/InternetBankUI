import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TransactionModel} from "../shared/model/transactions/transaction.model";

@Injectable({
  providedIn: 'root',
})
export class CancelPaymentService {
  constructor(private http: HttpClient) {
  }

  cancel(transactionId: number) {
    const httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    return this.http.post<TransactionModel>('/api/v1.0/customers/transaction/cancel/' + transactionId, httpOptions);
  }
}
