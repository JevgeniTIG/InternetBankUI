import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TransactionModel} from "../shared/model/transactions/transaction.model";


@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private http: HttpClient) {
  }

  fetch(transactionId: number) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      params: new HttpParams(),
      headers: httpHeaders,
    };
    return this.http.get<TransactionModel>('/api/v1.0/customers/transaction/show/' + transactionId, httpOptions);
  }

  find() {
    let httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    return this.http.get<TransactionModel[]>('/api/v1.0/customers/transactions/show/', httpOptions);
  }

}
