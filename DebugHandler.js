/* This file handles debugging shortcuts for firebug and startup
 *  
 * @arthor Serge-David */

function DebugStartup() {
	/*
	newGame();
	map[loc.y][loc.x] = tile.Town;
	openTown();
	hero.gold = 1000; */
};

function debugMessage(text) {
	document.getElementById("debug").innerHTML = text;
}

function debugMessageAddon(text) {
	document.getElementById("debug").innerHTML += "\n" +text;
}