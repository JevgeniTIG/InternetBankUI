import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbSpinnerModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

import {HttpClientModule} from '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OverviewComponent} from "./overview/overview.component";
import {CreateCustomerComponent} from "./overview/create-customer/create-customer.component";
import {NewCustomerCreationFormComponent} from "./overview/create-customer/new-customer-creation-form/new-customer-creation-form.component";
import {MakePaymentType1Component} from "./overview/transactions/make-payment-type1/make-payment-type1.component";
import {Type1CreationFormComponent} from "./overview/transactions/make-payment-type1/make-payment-type1-creation-form/type1-creation-form.component";
import {MakePaymentType2Component} from "./overview/transactions/make-payment-type2/make-payment-type2.component";
import {Type2CreationFormComponent} from "./overview/transactions/make-payment-type2/make-payment-type2-creation-form/type2-creation-form.component";
import {MakePaymentType3Component} from "./overview/transactions/make-payment-type3/make-payment-type3.component";
import {Type3CreationFormComponent} from "./overview/transactions/make-payment-type3/make-payment-type3-creation-form/type3-creation-form.component";
import {CancelPaymentComponent} from "./overview/transactions/cancel-payment/cancel-payment.component";
import {CancelPaymentFormComponent} from "./overview/transactions/cancel-payment/cancel-payment-form/cancel-payment-form.component";
import {TransactionOverviewComponent} from "./overview/transactions/transaction-overview/transaction-overview.component";
import {TransactionSearchFormComponent} from "./overview/transactions/transaction-overview/transaction-search-form/transaction-search-form.component";
import {TransactionOverviewFormComponent} from "./overview/transactions/transaction-overview/transaction-overview-form/transaction-overview-form.component";
import {TransactionsOverviewComponent} from "./overview/transactions/transactions-overview/transactions-overview.component";
import {TransactionsSearchAndOverviewFormComponent} from "./overview/transactions/transactions-overview/transactions-search-and-overview-form/transactions-search-and-overview-form.component";

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    CreateCustomerComponent,
    NewCustomerCreationFormComponent,
    MakePaymentType1Component,
    Type1CreationFormComponent,
    MakePaymentType2Component,
    Type2CreationFormComponent,
    MakePaymentType3Component,
    Type3CreationFormComponent,
    CancelPaymentComponent,
    CancelPaymentFormComponent,
    TransactionOverviewComponent,
    TransactionOverviewFormComponent,
    TransactionSearchFormComponent,
    TransactionsOverviewComponent,
    TransactionsSearchAndOverviewFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAccordionModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    HttpClientModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NbSpinnerModule,
    NbToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
