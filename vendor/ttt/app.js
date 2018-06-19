#!/usr/bin/env node
'use strict';

const Game = require('./lib/game.js');
const Player = require('./lib/player.js');
const cli = require('inquirer');

const playerX = new Player("X", cli);
const playerO = new Player("O", cli);

const game = new Game(playerX, playerO);

game.play();
