import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {Type3PaymentModel} from "../../../../shared/model/transactions/type3-payment.model";
import {PaymentType3Service} from "../../../../services/payment-type3.service";

@Component({
  selector: 'type3-creation-form',
  templateUrl: './type3-creation-form.component.html',
  styleUrls: ['./type3-creation-form.component.scss'],
})
export class Type3CreationFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  type3Payment: Type3PaymentModel = null;

  type3CreationForm: FormGroup;
  type3CreationFormMessages: string[] = [];


  constructor(private paymentType3Service: PaymentType3Service,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initType3CreationForm();
  }

  ngOnDestroy(): void {
    if (!this.type3CreationForm) this.type3CreationForm.reset();
  }

  private initType3CreationForm() {
    this.type3CreationForm = new FormGroup({
      'debtorIban': new FormControl(null, [Validators.required]),
      'creditorIban': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required]),
      'currency': new FormControl(null, [Validators.required]),
      'details': new FormControl(null, [Validators.required]),
      'bicCode': new FormControl(null, [Validators.required]),
    });
  }

  private getFormFieldStringValueOrNull(fieldName: string): string {
    if (!fieldName) return null;

    const formField = this.type3CreationForm.get(fieldName);
    if (!formField) return null;

    return formField.value;
  }

  public paymentType3(): void {
    this.isLoading = true;
    this.type3CreationFormMessages = [];

    const debtorIban = this.getFormFieldStringValueOrNull('debtorIban');
    const creditorIban = this.getFormFieldStringValueOrNull('creditorIban');
    const amount = this.getFormFieldStringValueOrNull('amount');
    const currency = this.getFormFieldStringValueOrNull('currency');
    const details = this.getFormFieldStringValueOrNull('details');
    const bicCode = this.getFormFieldStringValueOrNull('bicCode');


    this.paymentType3Service.paymentType3(debtorIban, creditorIban, Number(amount), currency, details, bicCode)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((type3Payment: Type3PaymentModel) => {
        this.type3Payment = type3Payment;

        const toastrConfig = {
          icon: 'checkmark-outline',
          iconPack: 'eva',
          duration: 20000
        };

        this.toastrService.success('Payment ' + type3Payment.amount + ' ' + type3Payment.currency + ' complete',
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
