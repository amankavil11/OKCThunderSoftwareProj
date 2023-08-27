import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  games: any;
  isChecked = false;

  public dataSource: MatTableDataSource<Object>;
  displayedColumns: string [] = ["date", "isStarter", "points", "assists",
   "offensiveRebounds", "defensiveRebounds", "steals", "blocks",
  "turnovers", "defensiveFouls", "offensiveFouls", "freeThrowsMade",
  "freeThrowsAttempted", "twoPointersMade", "twoPointersAttempted",
  "threePointersMade", "threePointersAttempted"]



  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.games = data.games
    this.dataSource = new MatTableDataSource<Object>(this.games)
    console.log(this.dataSource)
  }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
}


  
}
