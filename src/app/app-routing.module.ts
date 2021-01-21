import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Type1CreationFormComponent} from "./overview/transactions/make-payment-type1/make-payment-type1-creation-form/type1-creation-form.component";
import {Type2CreationFormComponent} from "./overview/transactions/make-payment-type2/make-payment-type2-creation-form/type2-creation-form.component";
import {Type3CreationFormComponent} from "./overview/transactions/make-payment-type3/make-payment-type3-creation-form/type3-creation-form.component";
import {CancelPaymentFormComponent} from "./overview/transactions/cancel-payment/cancel-payment-form/cancel-payment-form.component";
import {TransactionsSearchAndOverviewFormComponent} from "./overview/transactions/transactions-overview/transactions-search-and-overview-form/transactions-search-and-overview-form.component";
import {NewCustomerCreationFormComponent} from "./overview/create-customer/new-customer-creation-form/new-customer-creation-form.component";
import {TransactionSearchAndOverviewFormComponent} from "./overview/transactions/transaction-overview/transaction-search-and-overview-form/transaction-search-and-overview-form.component";
import {TransactionOverviewFormComponent} from "./overview/transactions/transaction-overview/transaction-overview-form/transaction-overview-form.component";

const routes: Routes = [
  {path: 'create', component: NewCustomerCreationFormComponent},
  {path: 'type1Payment', component: Type1CreationFormComponent},
  {path: 'type2Payment', component: Type2CreationFormComponent},
  {path: 'type3Payment', component: Type3CreationFormComponent},
  {path: 'cancelTransaction', component: CancelPaymentFormComponent},
  {path: 'searchTransactionById', component: TransactionSearchAndOverviewFormComponent},
  {path: 'showAllTransactionsWithStatusOk', component: TransactionsSearchAndOverviewFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponents = [NewCustomerCreationFormComponent, Type1CreationFormComponent, Type2CreationFormComponent,
  Type3CreationFormComponent, CancelPaymentFormComponent, TransactionSearchAndOverviewFormComponent,
  TransactionsSearchAndOverviewFormComponent]
