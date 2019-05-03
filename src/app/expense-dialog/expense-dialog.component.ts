import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

export interface DialogData {
  type: string;
  amount: number;
  buttonText: String;
}


@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})


export class ExpenseDialogComponent implements OnInit {

 expenseForm: FormGroup;
  type: String;
  amount: Number;
  confirmButton: String;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.confirmButton = data.buttonText;
        this.type = data.type;
        this.amount = data.amount;


     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveExpense() {
    const {value, valid} = this.expenseForm;
    if(valid){
        this.dialogRef.close(value);
    }    
    //  if we need to pass values back
    //this.dialogRef.close(this.incomeForm);

    // probably actually just need to call the save service.
  }

      ngOnInit() {
        this.expenseForm = this.fb.group({
          type: new FormControl(this.type, {validators: Validators.required}), 
          amount: new FormControl(this.amount, {validators: [Validators.required, Validators.pattern('[0-9]*.[0-9]2') ] })

        })};
}