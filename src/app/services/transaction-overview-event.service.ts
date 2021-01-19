import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {TransactionOverviewEventModel} from "../shared/model/transactions/transaction-overview.event.model";

@Injectable({
  providedIn: 'root',
})
export class TransactionOverviewEventService {
  private event = new Subject<TransactionOverviewEventModel>();

  send(event: TransactionOverviewEventModel) {
    if (event) this.event.next(event);
  }

  receive(): Observable<TransactionOverviewEventModel> {
    return this.event.asObservable();
  }

  clear() {
    this.event.next();
  }
}
