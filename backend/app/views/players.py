# -*- coding: utf-8 -*-
import logging
from functools import partial
import json
import os
from rest_framework.response import Response
from rest_framework.views import APIView, exception_handler
from app.models import PlayerGames, Players, Games


LOGGER = logging.getLogger('django')


class PlayerSummary(APIView):
    logger = LOGGER

    def get(self, request, playerID):
        """Return player data"""
        print(playerID)
        # TODO: Complete API response, replace placeholder below with actual implementation that sources data from database
        # print(os.path.dirname(os.path.abspath(__file__)))
        # with open(os.path.dirname(os.path.abspath(__file__)) + '/sample_response/sample_response.json') as sample_response:
        #     data = json.load(sample_response)
        # return Response(data)

        player_dict = {}
        player_dict['name'] = Players.objects.get(id=playerID).name
        player_dict['games'] = []

        for game in PlayerGames.objects.filter(player_id=playerID):
            game_dict = {}
            game_dict['date'] = str(Games.objects.get(pk=game.game_id.id).date)
            game_dict['isStarter'] = game.is_starter
            game_dict['minutes'] = game.minutes
            game_dict['points'] = game.points
            game_dict['assists'] = game.assists
            game_dict['offensiveRebounds'] = game.offensiveRebounds
            game_dict['defensiveRebounds'] = game.defensiveRebounds
            game_dict['steals'] = game.steals
            game_dict['blocks'] = game.blocks
            game_dict['turnovers'] = game.turnovers
            game_dict['defensiveFouls'] = game.defensiveFouls
            game_dict['offensiveFouls'] = game.offensiveFouls
            game_dict['freeThrowsMade'] = game.freeThrowsMade
            game_dict['freeThrowsAttempted'] = game.freeThrowsAttempted
            game_dict['twoPointersMade'] = game.twoPointersMade
            game_dict['twoPointersAttempted'] = game.twoPointersAttempted
            game_dict['threePointersMade'] = game.threePointersMade
            game_dict['threePointersAttempted'] = game.threePointersAttempted
            game_dict['shots'] = json.loads(game.shots)
            player_dict['games'].append(game_dict)

        return Response(json.loads(json.dumps(player_dict)))
    
    
