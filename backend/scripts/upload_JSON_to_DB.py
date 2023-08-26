'''
Formats and uploads JSON data found in 'backend/raw_data'

To run script, ensure that current working directory is at 'backend' module 
and run following cmd: python -m scripts.upload_JSON_to_DB
'''

import json
from app.wsgi import app
from app.models import Players, Teams, Games, PlayerGames
from importlib import resources
import raw_data


class uploadStats():
    def __init__(self, player_file, team_file, game_file):
        self.player_file = player_file
        self.team_file = team_file
        self.game_file = game_file

    def upload_players(self):
        with open(resources.files(raw_data) / self.player_file) as f:
            players = json.load(f)
        for player in players:
            player_object = Players(id=player['id'], name=player['name'])
            player_object.save()
        print("Player data uploaded succesfuly.") 

    def upload_teams(self):
        with open(resources.files(raw_data) / self.team_file) as f:
            teams = json.load(f)
        for team in teams:
            team_object = Teams(id=team['id'], name=team['name'])
            team_object.save()
        print("Team data uploaded succesfuly.") 

    def upload_games(self):
        with open(resources.files(raw_data) / self.game_file) as f:
            games = json.load(f)
        for game in games:
            game_object = Games(id=game['id'], date=game['date'], 
                                homeTeamID=Teams.objects.get(pk=game['homeTeam']['id']),
                                awayTeamID=Teams.objects.get(pk=game['awayTeam']['id']))
            game_object.save()
            for team in ('homeTeam', 'awayTeam'):
                for playerGame in game[team]['players']:
                    playerGame_object = PlayerGames(player_id=Players.objects.get(pk=playerGame['id']),
                                                    game_id=Games.objects.get(pk=game['id']),
                                                    is_starter=playerGame['isStarter'],
                                                    minutes=playerGame['minutes'],
                                                    points=playerGame['points'],
                                                    assists=playerGame['assists'],
                                                    offensiveRebounds=playerGame['offensiveRebounds'],
                                                    defensiveRebounds=playerGame['defensiveRebounds'],
                                                    steals=playerGame['steals'],
                                                    blocks=playerGame['blocks'],
                                                    turnovers=playerGame['turnovers'],
                                                    defensiveFouls=playerGame['defensiveFouls'],
                                                    offensiveFouls=playerGame['offensiveFouls'],
                                                    freeThrowsMade=playerGame['freeThrowsMade'],
                                                    freeThrowsAttempted=playerGame['freeThrowsAttempted'],
                                                    twoPointersMade=playerGame['twoPointersMade'],
                                                    twoPointersAttempted=playerGame['twoPointersAttempted'],
                                                    threePointersMade=playerGame['threePointersMade'],
                                                    threePointersAttempted=playerGame['threePointersAttempted'],
                                                    shots=json.dumps(playerGame['shots'], indent=3))
                    playerGame_object.save()
        print("Game data uploaded succesfuly.") 

if __name__ == '__main__':
    stats = uploadStats("players.json", 'teams.json', 'games.json')
    stats.upload_players()
    stats.upload_teams()
    stats.upload_games()