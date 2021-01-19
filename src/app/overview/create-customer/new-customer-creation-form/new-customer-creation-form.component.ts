import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {NbToastrService} from '@nebular/theme';
import {CustomerModel} from '../../../shared/model/customer/customer.model';
import {CustomerCreateService} from '../../../services/customer-create.service';

@Component({
  selector: 'new-customer-creation-form',
  templateUrl: './new-customer-creation-form.component.html',
  styleUrls: ['./new-customer-creation-form.component.scss'],
})
export class NewCustomerCreationFormComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  customer: CustomerModel = null;

  newCustomerCreationForm: FormGroup;
  newCustomerCreationFormMessages: string[] = [];

  constructor(private customerCreateService: CustomerCreateService,
              private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.initNewCustomerCreationForm();
  }

  ngOnDestroy(): void {
    if (!this.newCustomerCreationForm) this.newCustomerCreationForm.reset();
  }

  private initNewCustomerCreationForm() {
    this.newCustomerCreationForm = new FormGroup({
      'idCode': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'eurBalance': new FormControl(null, [Validators.required]),
      'usdBalance': new FormControl(null, [Validators.required]),
      'ibanAccount': new FormControl(null, [Validators.required]),
      'bicCode': new FormControl(null, [Validators.required]),
    });
  }

  private getFormFieldStringValueOrNull(fieldName: string): string {
    if (!fieldName) return null;

    const formField = this.newCustomerCreationForm.get(fieldName);
    if (!formField) return null;

    return formField.value;
  }

  public create(): void {
    this.isLoading = true;
    this.newCustomerCreationFormMessages = [];

    const idCode = this.getFormFieldStringValueOrNull('idCode');
    const firstName = this.getFormFieldStringValueOrNull('firstName');
    const lastName = this.getFormFieldStringValueOrNull('lastName');
    const eurBalance = this.getFormFieldStringValueOrNull('eurBalance');
    const usdBalance = this.getFormFieldStringValueOrNull('usdBalance');
    const ibanAccount = this.getFormFieldStringValueOrNull('ibanAccount');
    const bicCode = this.getFormFieldStringValueOrNull('bicCode');

    this.customerCreateService.create(idCode, firstName, lastName, Number(eurBalance), Number(usdBalance),
      ibanAccount, bicCode).pipe(finalize(() => this.isLoading = false))
      .subscribe((customer: CustomerModel) => {
        this.customer = customer;

        const toastrConfig = {
          icon: 'checkmark-outline',
          iconPack: 'eva',
          duration: 20000
        };

        this.toastrService.success('New customer with id  ' + customer.idCode + ' created', 'System notification', toastrConfig);

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
