import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {Type2PaymentModel} from "../../../../shared/model/transactions/type2-payment.model";
import {PaymentType2Service} from "../../../../services/payment-type2.service";

@Component({
  selector: 'type2-creation-form',
  templateUrl: './type2-creation-form.component.html',
  styleUrls: ['./type2-creation-form.component.scss'],
})
export class Type2CreationFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  type2Payment: Type2PaymentModel = null;

  type2CreationForm: FormGroup;
  type2CreationFormMessages: string[] = [];


  constructor(private paymentType2Service: PaymentType2Service,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initType2CreationForm();
  }

  ngOnDestroy(): void {
    if (!this.type2CreationForm) this.type2CreationForm.reset();
  }

  private initType2CreationForm() {
    this.type2CreationForm = new FormGroup({
      'debtorIban': new FormControl(null, [Validators.required]),
      'creditorIban': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'currency': new FormControl(null, [Validators.required]),
      'details': new FormControl(null, [Validators.required]),
    });
  }

  private getFormFieldStringValueOrNull(fieldName: string): string {
    if (!fieldName) return null;

    const formField = this.type2CreationForm.get(fieldName);
    if (!formField) return null;

    return formField.value;
  }

  public paymentType2(): void {
    this.isLoading = true;
    this.type2CreationFormMessages = [];

    const debtorIban = this.getFormFieldStringValueOrNull('debtorIban');
    const creditorIban = this.getFormFieldStringValueOrNull('creditorIban');
    const amount = this.getFormFieldStringValueOrNull('amount');
    const currency = this.getFormFieldStringValueOrNull('currency');
    const details = this.getFormFieldStringValueOrNull('details');

    this.paymentType2Service.paymentType2(debtorIban, creditorIban, Number(amount), currency, details)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((type2Payment: Type2PaymentModel) => {
        this.type2Payment = type2Payment;

        const toastrConfig = {
          icon: 'checkmark-outline',
          iconPack: 'eva',
          duration: 20000
        };

        this.toastrService.success('Payment ' + type2Payment.amount + ' ' + type2Payment.currency + ' complete',
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
