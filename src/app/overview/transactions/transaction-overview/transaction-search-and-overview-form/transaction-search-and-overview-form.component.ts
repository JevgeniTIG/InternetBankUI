import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionOverviewEventService} from "../../../../services/transaction-overview-event.service";
import {TransactionOverviewEventModel} from "../../../../shared/model/transactions/transaction-overview.event.model";

@Component({
  selector: 'transaction-search-and-overview-form',
  templateUrl: './transaction-search-and-overview-form.component.html',
  styleUrls: ['./transaction-search-and-overview-form.component.scss'],
})
export class TransactionSearchAndOverviewFormComponent implements OnDestroy, OnInit {
  transactionSearchForm: FormGroup;
  transactionSearchFormValidationMessages: string[] = [];

  constructor(private transactionOverviewEventService: TransactionOverviewEventService) {
  }

  ngOnDestroy(): void {
    this.transactionSearchForm.reset();
  }

  ngOnInit(): void {
    this.initTransactionSearchForm();
  }

  public search(): void {
    this.validate();

    this.sendSearchEvent(this.getTransactionIdOrNull()?.value);
  }

  private sendSearchEvent(transactionId: number): void {
    this.transactionOverviewEventService.send(new TransactionOverviewEventModel(transactionId));
  }

  validate(): void {
    this.transactionSearchFormValidationMessages = [];

    const transactionSearchFormControls = Object.keys(this.transactionSearchForm.controls);
    if (!transactionSearchFormControls || transactionSearchFormControls.length === 0) return;

    for (const formControl of transactionSearchFormControls) {
      const formField = this.transactionSearchForm.get(formControl);
      if (!(formField.dirty || formField.touched) && !formField.invalid) continue;

      if (formField?.errors?.minlength) this.transactionSearchFormValidationMessages.push('Minimum 1 character(s) required');
      if (formField?.errors?.pattern) this.transactionSearchFormValidationMessages.push('Only numbers allowed');
    }
  }

  public isFormFieldInvalid(formFieldName): boolean {
    if (!formFieldName) return true;

    const formField = this.transactionSearchForm.get(formFieldName);
    if (!formField) return true;

    return (formField.dirty || formField.touched) && formField.invalid;
  }

  private initTransactionSearchForm() {
    this.transactionSearchForm = new FormGroup({
      transactionId: new FormControl(null,
        [
          Validators.minLength(1),
          Validators.pattern('^[0-9]*$'),
        ])
    });
  }

  private getTransactionIdOrNull() {
    return this.transactionSearchForm.get('transactionId');
  }

}
