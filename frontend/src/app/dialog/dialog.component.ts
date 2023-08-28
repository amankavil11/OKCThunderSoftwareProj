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
  gameShots: GameShots[] = []
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

    for (let game of this.games) {
      const element = {date: game.date,shots: game.shots}
      this.gameShots.push(element)
    }
    this.dataSource2 = new MatTableDataSource<Object>(this.gameShots[0].shots)
  }

  ngOnInit(): void {
  }


  close() {
    this.dialogRef.close();
}


  
}
