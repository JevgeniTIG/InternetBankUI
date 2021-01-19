import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Type1PaymentModel} from "../shared/model/transactions/type1-payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentType1Service {
  constructor(private http: HttpClient) {
  }

  paymentType1(debtorIban: string, creditorIban: string, amount: number, currency: string, details: string) {
    const httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    const request = new Type1PaymentModel();
    request.debtorIban = debtorIban;
    request.creditorIban = creditorIban;
    request.amount = amount;
    request.currency = currency;
    request.details = details;

    return this.http.post<Type1PaymentModel>('/api/v1.0/customers/payment_type1', request, httpOptions);
  }
}
