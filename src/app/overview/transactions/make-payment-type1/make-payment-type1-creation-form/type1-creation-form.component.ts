import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {Type1PaymentModel} from "../../../../shared/model/transactions/type1-payment.model";
import {PaymentType1Service} from "../../../../services/payment-type1.service";

@Component({
  selector: 'type1-creation-form',
  templateUrl: './type1-creation-form.component.html',
  styleUrls: ['./type1-creation-form.component.scss'],
})
export class Type1CreationFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  type1Payment: Type1PaymentModel = null;

  type1CreationForm: FormGroup;
  type1CreationFormMessages: string[] = [];


  constructor(private paymentType1Service: PaymentType1Service,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initType1CreationForm();
  }

  ngOnDestroy(): void {
    if (!this.type1CreationForm) this.type1CreationForm.reset();
  }

  private initType1CreationForm() {
    this.type1CreationForm = new FormGroup({
      'debtorIban': new FormControl(null, [Validators.required]),
      'creditorIban': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'currency': new FormControl(null, [Validators.required]),
      'details': new FormControl(null, [Validators.required]),
    });
  }

  private getFormFieldStringValueOrNull(fieldName: string): string {
    if (!fieldName) return null;

    const formField = this.type1CreationForm.get(fieldName);
    if (!formField) return null;

    return formField.value;
  }

  public paymentType1(): void {
    this.isLoading = true;
    this.type1CreationFormMessages = [];

    const debtorIban = this.getFormFieldStringValueOrNull('debtorIban');
    const creditorIban = this.getFormFieldStringValueOrNull('creditorIban');
    const amount = this.getFormFieldStringValueOrNull('amount');
    const currency = this.getFormFieldStringValueOrNull('currency');
    const details = this.getFormFieldStringValueOrNull('details');

    this.paymentType1Service.paymentType1(debtorIban, creditorIban, Number(amount), currency, details)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((type1Payment: Type1PaymentModel) => {
        this.type1Payment = type1Payment;

        const toastrConfig = {
          icon: 'checkmark-outline',
          iconPack: 'eva',
          duration: 20000
        };

        this.toastrService.success('Payment ' + type1Payment.amount + ' ' + type1Payment.currency + ' complete',
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
