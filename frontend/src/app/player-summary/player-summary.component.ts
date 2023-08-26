import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation, ViewChild
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';
import {PlayersService} from '../_services/players.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
import {MatSort} from '@angular/material/sort'




export interface PlayerGames {
  "id": number
  "name": string;
  "games": {
    "date": string;
    "isStarter": string;
    "minutes": string;
    "points": string;
    "assists": string;
    "offensiveRebounds": string;
    "defensiveRebounds": string;
    "steals": string;
    "blocks": string;
    "turnovers": string;
    "defensiveFouls": string;
    "offensiveFouls": string;
    "freeThrowsMade": string;
    "freeThrowsAttempted": string;
    "twoPointersMade": string;
    "twoPointersAttempted": string;
    "threePointersMade": string;
    "threePointersAttempted": string;
    "shots": {
      "isMake": string;
      "locationX": string;
      "locationY": string;
    }

  }
}

@UntilDestroy()
@Component({
  selector: 'player-summary-component',
  templateUrl: './player-summary.component.html',
  styleUrls: ['./player-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class PlayerSummaryComponent implements OnInit, OnDestroy {

  apiResponse: any[] = [];
  playerID: number;
  displayedColumns: string [] = ["id","name", "GameStats"]
  public dataSource: MatTableDataSource<PlayerGames>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    protected activatedRoute: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    protected playersService: PlayersService,
  ) {

  }

  ngOnInit(): void {
    for (let i = 1; i < 32; i++) {
      this.fetchApiResponse(i);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchApiResponse(player_id): void {
    this.playerID=player_id
    this.playersService.getPlayerSummary(this.playerID).pipe(untilDestroyed(this)).subscribe(data => {
      data.apiResponse.id = player_id
      this.apiResponse.push(data.apiResponse)
      this.apiResponse.sort(function(a, b){
        return a.id - b.id;
    });
      
      this.dataSource = new MatTableDataSource<PlayerGames>(this.apiResponse)
      this.sort.active = 'id';
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      
    });
  }

  ngOnDestroy() {
  }

}
