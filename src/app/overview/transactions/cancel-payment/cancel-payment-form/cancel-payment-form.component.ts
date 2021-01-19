import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {CancelPaymentService} from "../../../../services/cancel-payment.service";
import {TransactionModel} from "../../../../shared/model/transactions/transaction.model";

@Component({
  selector: 'cancel-payment-form',
  templateUrl: './cancel-payment-form.component.html',
  styleUrls: ['./cancel-payment-form.component.scss'],
})
export class CancelPaymentFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  transaction: TransactionModel = null;

  cancelPaymentForm: FormGroup;
  cancelPaymentFormMessages: string[] = [];


  constructor(private cancelPaymentService: CancelPaymentService,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initCancelPaymentForm();
  }

  ngOnDestroy(): void {
    if (!this.cancelPaymentForm) this.cancelPaymentForm.reset();
  }

  private initCancelPaymentForm() {
    this.cancelPaymentForm = new FormGroup({
      'transactionId': new FormControl(null, [Validators.required]),

    });
  }

  private getFormFieldStringValueOrNull(fieldName: string): void {
    if (!fieldName) return null;

    const formField = this.cancelPaymentForm.get(fieldName);
    if (!formField) return null;

    return formField.value;
  }

  public cancel(): void {
    this.isLoading = true;
    this.cancelPaymentFormMessages = [];

    const transactionId = this.getFormFieldStringValueOrNull('transactionId');


    this.cancelPaymentService.cancel(Number(transactionId))
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((transaction: TransactionModel) => {
        this.transaction = transaction;

        const toastrConfig = {
          icon: 'checkmark-outline',
          iconPack: 'eva',
          duration: 20000
        };

        this.toastrService.success('Transaction ' + transaction.transactionId + ' cancelled',
          'System notification', toastrConfig);

      }, (response) => {
        const toastrConfig = {
          icon: 'alert-triangle-outline',
          iconPack: 'eva',
          limit: 4
        };

        if (response.error && Array.isArray(response.error) && response.error.length > 0) {
          response.error.forEach(message => {
            this.toastrService.danger(message?.message, 'System notification', toastrConfig);
          });
        } else {
          this.toastrService.danger('System could not proceed request, please, try again later', 'System notification', toastrConfig);
        }
      });
  }

}
