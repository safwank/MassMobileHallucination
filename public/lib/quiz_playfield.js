/*
 * Mass Mobile Hallucination.
 * Copyright (c) 2012 MYOB Australia Ltd.
 * 
 * worm_playfield.js - implementation of the worm game.
 */

var QuizPlayfield = (function () {
	var me = {};

var socket;
	//
	// Publics
	//	
	me.init = function (socket) {
		// tell the server we don't want totals (only real time updates)
		socket.emit("admin", "no_updates");
		
	me.newUser = function (data) 	{  }
	me.woosOut = function (data) 	{  }
	me.players = function (players) { }
	me.positionUpdates = function (updates) { processPositionUpdates(updates) }
	me.totalUpdates = function (updates) { processTotalUpdates(updates) }
	me.shutdown = function () { }
	me.admin = function(message) { alert("Fairy playfield got an admin message: " + message); 	}	}
	
	me.initPlayers = function (players) { 
		// can ignore this. Just need totals
	}

	//
	// privates
	//
	
	function processPositionUpdates(updates) {
		// ignoring for now
	}
	
	function processTotalUpdates(updates) {
		// ignoring for now
	}
	return me;
}());