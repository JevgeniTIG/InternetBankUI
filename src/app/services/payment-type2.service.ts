import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Type2PaymentModel} from "../shared/model/transactions/type2-payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentType2Service {
  constructor(private http: HttpClient) {
  }

  paymentType2(debtorIban: string, creditorIban: string, amount: number, currency: string, details: string) {
    const httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    const request = new Type2PaymentModel();
    request.debtorIban = debtorIban;
    request.creditorIban = creditorIban;
    request.amount = amount;
    request.currency = currency;
    request.details = details;

    return this.http.post<Type2PaymentModel>('/api/v1.0/customers/payment_type2', request, httpOptions);
  }
}
