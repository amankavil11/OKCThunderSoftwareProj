import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  date: string;
  public dataSource: MatTableDataSource<Object>;
  displayedColumns: string [] = ["date"]



  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.date = data.date
    this.dataSource = new MatTableDataSource<Object>([{"date": this.date}])
    console.log(this.dataSource)
  }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
}


  
}
