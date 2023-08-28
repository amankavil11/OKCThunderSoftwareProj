import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';


export interface GameShots {
  "date": string;
  "shots": any;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  games: any;
  isChecked = false;
  gameShots: any[] = []
  public dataSource: MatTableDataSource<Object>;
  public dataSource2: MatTableDataSource<Object>;
  displayedColumns: string [] = ["date", "isStarter", "points", "assists",
   "offensiveRebounds", "defensiveRebounds", "steals", "blocks",
  "turnovers", "defensiveFouls", "offensiveFouls", "freeThrowsMade",
  "freeThrowsAttempted", "twoPointersMade", "twoPointersAttempted",
  "threePointersMade", "threePointersAttempted"]
  displayedColumns2: string [] = ["isMake", "locationX", "locationY"]




  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
    this.games = data.games
    this.dataSource = new MatTableDataSource<Object>(this.games)

    for (let [i,Game] of this.games.entries()) {
      let gameShotsDSource = new MatTableDataSource<Object>(Game.shots)
      this.gameShots[i] = {date: Game.date, dSource: gameShotsDSource}
    }

  }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
}


  
}
