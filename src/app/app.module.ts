import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbSpinnerModule,
  NbTableModule,
  NbThemeModule,
  NbToastrModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CancelPaymentFormComponent} from "./overview/transactions/cancel-payment/cancel-payment-form/cancel-payment-form.component";
import {TransactionOverviewFormComponent} from "./overview/transactions/transaction-overview/transaction-overview-form/transaction-overview-form.component";
import {TransactionsSearchAndOverviewFormComponent} from "./overview/transactions/transactions-overview/transactions-search-and-overview-form/transactions-search-and-overview-form.component";
import {MenuComponent} from "./overview/menu/menu.component";
import {Type1CreationFormComponent} from "./overview/transactions/make-payment-type1/make-payment-type1-creation-form/type1-creation-form.component";
import {Type2CreationFormComponent} from "./overview/transactions/make-payment-type2/make-payment-type2-creation-form/type2-creation-form.component";
import {Type3CreationFormComponent} from "./overview/transactions/make-payment-type3/make-payment-type3-creation-form/type3-creation-form.component";
import {TransactionSearchAndOverviewFormComponent} from "./overview/transactions/transaction-overview/transaction-search-and-overview-form/transaction-search-and-overview-form.component";
import {HomeComponent} from "./overview/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    Type1CreationFormComponent,
    Type2CreationFormComponent,
    Type3CreationFormComponent,
    CancelPaymentFormComponent,
    TransactionOverviewFormComponent,
    TransactionSearchAndOverviewFormComponent,
    TransactionOverviewFormComponent,
    TransactionsSearchAndOverviewFormComponent,
    MenuComponent,
    HomeComponent

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
    NbTableModule,
    NbMenuModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
