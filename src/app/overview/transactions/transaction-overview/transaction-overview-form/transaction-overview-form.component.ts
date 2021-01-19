import {Component, OnDestroy, OnInit} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {TransactionModel} from "../../../../shared/model/transactions/transaction.model";
import {TransactionService} from "../../../../services/transaction.service";
import {Subscription} from "rxjs";
import {TransactionOverviewEventService} from "../../../../services/transaction-overview-event.service";

@Component({
  selector: 'transaction-overview-form',
  templateUrl: './transaction-overview-form.component.html',
  styleUrls: ['./transaction-overview-form.component.scss'],
})
export class TransactionOverviewFormComponent implements OnInit, OnDestroy {

  messages: string[] = [];
  isLoading: boolean = false;
  availableTransaction: TransactionModel = null;

  transactionSearchEventServiceSubscription: Subscription = null;

  constructor(private transactionService: TransactionService,
              private transactionOverviewEventService: TransactionOverviewEventService) {
  }

  ngOnDestroy(): void {
    if (this.transactionSearchEventServiceSubscription)
      this.transactionSearchEventServiceSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.transactionSearchEventServiceSubscription = this.transactionOverviewEventService.receive()
      .subscribe(event => {
        this.fetch(event?.transactionId);
      });
  }


  private fetch(transactionId: number): void {
    this.isLoading = true;
    this.availableTransaction;
    this.messages = [];

    this.transactionService.fetch(transactionId)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((availableTransaction: TransactionModel) => {
        if (availableTransaction) {
          this.availableTransaction = availableTransaction;
        } else {
          this.messages.push('Transaction not found');
        }
      }, (error) => {
        this.messages.push('Unexpected error');
      });
  }

}

