import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BudgetMaterialModuleModule } from './budget-material-module/budget-material-module.module';

import { HelloComponent } from './hello.component';
import { IncomesComponent, IncomeDialogComponent } from './incomes/incomes.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule,   BrowserAnimationsModule, MatDialogModule, ReactiveFormsModule, BudgetMaterialModuleModule ],
  declarations: [ AppComponent, HelloComponent, IncomesComponent, ExpensesComponent, IncomeDialogComponent, ExpenseDialogComponent ],
  entryComponents: [
    IncomeDialogComponent, ExpenseDialogComponent
  ],
  bootstrap:    [ AppComponent ],
  exports: [ ReactiveFormsModule ],
})
export class AppModule { }