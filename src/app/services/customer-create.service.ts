import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CustomerModel} from "../shared/model/customer/customer.model";

@Injectable({
  providedIn: 'root',
})
export class CustomerCreateService {
  constructor(private http: HttpClient) {
  }

  create(idCode: string, firstName: string, lastName: string, eurBalance: number, usdBalance: number,
         ibanAccount: string, bicCode: string) {
    const httpParams = new HttpParams();

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      params: httpParams,
      headers: httpHeaders,
    };

    const request = new CustomerModel();
    request.idCode = idCode;
    request.firstName = firstName;
    request.lastName = lastName;
    request.eurBalance = eurBalance;
    request.usdBalance = usdBalance;
    request.ibanAccount = ibanAccount;
    request.bicCode = bicCode;

    return this.http.post<CustomerModel>('/api/v1.0/customers/create', request, httpOptions);
  }
}
