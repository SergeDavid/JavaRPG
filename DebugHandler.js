/* This file handles debugging shortcuts for firebug and startup
 *  
 * @arthor Serge-David */

//@Deprecated TODO: Currently only using this for jumping straight into specific conditions during startup, remove when done. 
function DebugStartup() { 
	/* 
	newGame();
	map[loc.y][loc.x] = tile.Town;
	openTown();
	hero.gold = 1000; */
};

function debugMsg(text) {
	document.getElementById("debug").innerHTML = text;
}

function debugCont(text) {
	document.getElementById("debug").innerHTML += "\n" +text;
}