# -*- coding: utf-8 -*-
"""Contains models related to stats"""
from django.db import models

class Players(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    name = models.CharField()

class Teams(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    name = models.CharField()

class Games(models.Model):
    id = models.BigAutoField(primary_key=True, verbose_name='ID')
    date = models.DateField()
    homeTeamID = models.ForeignKey("Teams", on_delete=models.CASCADE, related_name='+')
    awayTeamID = models.ForeignKey("Teams", on_delete=models.CASCADE, related_name='+')

class PlayerGames(models.Model):
    player_id = models.ForeignKey("Players", on_delete=models.CASCADE)
    game_id = models.ForeignKey("Games", on_delete=models.CASCADE)
    is_starter = models.BooleanField()
    minutes = models.IntegerField()
    points = models.IntegerField()
    assists = models.IntegerField()
    offensiveRebounds = models.IntegerField()
    defensiveRebounds = models.IntegerField()
    steals = models.IntegerField()
    blocks = models.IntegerField()
    turnovers = models.IntegerField()
    defensiveFouls = models.IntegerField()
    offensiveFouls = models.IntegerField()
    freeThrowsMade = models.IntegerField()
    freeThrowsAttempted = models.IntegerField()
    twoPointersMade = models.IntegerField()
    twoPointersAttempted = models.IntegerField()
    threePointersMade = models.IntegerField()
    threePointersAttempted = models.IntegerField()
    shots = models.JSONField()


