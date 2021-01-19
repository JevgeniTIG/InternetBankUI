import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Type3PaymentModel} from "../shared/model/transactions/type3-payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentType3Service {
  constructor(private http: HttpClient) {
  }

  paymentType3(debtorIban: string, creditorIban: string, amount: number, currency: string, details: string, bicCode: string) {
    const httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    const request = new Type3PaymentModel();
    request.debtorIban = debtorIban;
    request.creditorIban = creditorIban;
    request.amount = amount;
    request.currency = currency;
    request.details = details;
    request.bicCode = bicCode;

    return this.http.post<Type3PaymentModel>('/api/v1.0/customers/payment_type3', request, httpOptions);
  }
}
