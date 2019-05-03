import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatMenuTrigger } from '@angular/material';
import { Income } from '../income';
import { OpenClose } from '../open-close';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';



export interface DialogData {
  type: string;
  amount: number;
  buttonText: String;
}


@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css'],
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
export class IncomesComponent extends OpenClose implements OnInit {

  totalIncome: number;

  type: string;
  amount: number;

  selectedIncome: Income;
  
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  incomes: Income[] = [
    {
      id: 1,
      type: 'Job',
      amount: 122
    },
    {
      id: 2,
      type: 'Stealing',
      amount: 500.22
    },
    {
      id: 3,
      type: 'another',
      amount: 5555
    },
    {
      id: 4,
      type: 'they all fit',
      amount: 500.22
    }
  ];

  calculate() {
    this.totalIncome = 0;
    for (var income of this.incomes) {
      this.totalIncome = this.totalIncome + income.amount;
      // console.log(income.amount);
    }

  }
  //https://stackblitz.com/angular/jrybolgxgal?file=app%2Fdialog-overview-example.ts

  addIncome() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    // dialogConfig.data = {type: 'test', amount: 100};
    dialogConfig.data = { buttonText: "Add", type: this.type, amount: this.amount };
    // TODO: dialogConfig.data:

    const dialogRef = this.dialog.open(IncomeDialogComponent, dialogConfig);

    /*
    {
      width: '250px',
      data: { 
        //name: this.name, animal: this.animal 
        //do things
        }

    }
    */


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);
      //console.log(result);
      // console.log("Type: ", result.value.type, "Amount: ", result.value.amount);
      // result.value.
      //do things
      //this.animal = result;
    });
  }

  editIncome() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '250px';
    console.log("current selected income on edit:", this.selectedIncome.type, this.selectedIncome.amount);
    dialogConfig.data = { buttonText: "Update", type: this.selectedIncome.type, amount: this.selectedIncome.amount };
    // dialogConfig.data = { type: this.type, amount: this.amount };
    // TODO: dialogConfig.data:

    const dialogRef = this.dialog.open(IncomeDialogComponent, dialogConfig);



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ', result);

    });

  }

  remove(): void {
    console.log(this.selectedIncome);
    //this.incomes = this.incomes.filter(h => h !== income);
  }

  onSelect(income: Income): void {
    this.selectedIncome = income;
    console.log("New Selected Income:", this.selectedIncome);
  }

  onOpenMenu(menu: any): void {
    console.log(menu);
  }

  constructor(public dialog: MatDialog) { super() }

  ngOnInit() {
    this.calculate();
  }



}

@Component({
  selector: 'app-income-dialog',
  templateUrl: './income-dialog.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomeDialogComponent implements OnInit {
 /*
  incomeForm = new FormGroup({
    type: new FormControl(null, {validators: Validators.required}), 
    amount: new FormControl(null, {validators: [Validators.required, Validators.pattern('[0-9]*.[0-9]2') ] })
  });
*/
  incomeForm: FormGroup;
  type: String;
  amount: Number;
  confirmButton: String;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IncomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.confirmButton = data.buttonText;
        this.type = data.type;
        this.amount = data.amount;


     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveIncome() {
    const {value, valid} = this.incomeForm;
    if(valid){
        this.dialogRef.close(value);
    }    
    //  if we need to pass values back
    //this.dialogRef.close(this.incomeForm);

    // probably actually just need to call the save service.
  }

      ngOnInit() {
        this.incomeForm = this.fb.group({
          type: new FormControl(this.type, {validators: Validators.required}), 
          amount: new FormControl(this.amount, {validators: [Validators.required, Validators.pattern('[0-9]*.[0-9]2') ] })

        })};

}