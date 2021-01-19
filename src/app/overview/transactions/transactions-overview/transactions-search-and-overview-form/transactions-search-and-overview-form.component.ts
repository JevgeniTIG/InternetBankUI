import {Component} from '@angular/core';
import {TransactionService} from "../../../../services/transaction.service";
import {finalize} from "rxjs/operators";
import {TransactionModel} from "../../../../shared/model/transactions/transaction.model";

@Component({
  selector: 'transactions-search-and-overview-form',
  templateUrl: './transactions-search-and-overview-form.component.html',
  styleUrls: ['./transactions-search-and-overview-form.component.scss'],
})
export class TransactionsSearchAndOverviewFormComponent {
  isLoading: boolean = false;

  messages: string[] = [];
  availableTransactions: TransactionModel[] = [];

  constructor(private transactionService: TransactionService) {
  }

  public show() {
    this.isLoading = true;

    this.transactionService.find()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((availableTransactions: TransactionModel[]) => {
        if (availableTransactions.length > 0) {
          this.availableTransactions = availableTransactions;
        } else {
          this.messages.push('No transactions found');
        }
      }, (error) => {
        this.messages.push('Unexpected error');
      });
  }
}
