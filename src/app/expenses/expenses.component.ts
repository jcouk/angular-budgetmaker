import { OpenClose } from '../open-close';
import { Expense } from '../expense';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatMenuTrigger } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations'; import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
  animations: [
    trigger('openCloseMain', [
      // ...
      state('openMain', style({
        opacity: 1
      })),
      state('mainClosed', style({
        height: '0em',
        opacity: 0
      })),
      transition('openMain => mainClosed', [
        animate('0.1s')
      ]),
      transition('mainClosed => openMain', [
        animate('0.2s')
      ]),
    ]),
  ],
})
export class ExpensesComponent extends OpenClose implements OnInit {

  totalExpense = 0;

  type: string;
  amount: number;

  selectedExpense: Expense;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  expenses: Expense[] = [
    {
      id: 1,
      type: 'food',
      amount: 22
    },
    {
      id: 2,
      type: 'medical',
      amount: 500
    },
    {
      id: 3,
      type: 'rent',
      amount: 555
    },
    {
      id: 4,
      type: 'they all fit',
      amount: 99.2
    }
  ];
  
  calculate() {
    this.totalExpense = 0;
    for (var expense of this.expenses) {
      this.totalExpense = this.totalExpense + expense.amount;
     // console.log(expense.amount);
    }

  }

    addExpense() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    // dialogConfig.data = {type: 'test', amount: 100};
    dialogConfig.data = { buttonText: "Add", type: this.type, amount: this.amount };

    const dialogRef = this.dialog.open(ExpenseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The expense dialog was closed: ', result);
    });
  }

 editExpense() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    console.log("current selected expense on edit:", this.selectedExpense.type, this.selectedExpense.amount);
    dialogConfig.data = { buttonText: "Update", type: this.selectedExpense.type, amount: this.selectedExpense.amount };
    // dialogConfig.data = { type: this.type, amount: this.amount };
    // TODO: dialogConfig.data:

    const dialogRef = this.dialog.open(ExpenseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The expense dialog was closed: ', result);
    });
  }

  removeExpense(): void {
    console.log(this.selectedExpense);
    //this.incomes = this.incomes.filter(h => h !== income);
  }

  onSelect(expense: Expense): void {
    this.selectedExpense = expense;
    console.log("New Selected Expense:", this.selectedExpense);
  }

  onOpenMenu(menu: any): void {
    console.log(menu);
  }

  constructor(public dialog: MatDialog) { super() }

  ngOnInit() {
    this.calculate();
  }

}