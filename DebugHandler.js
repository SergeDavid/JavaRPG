/* This file handles debugging shortcuts for firebug and startup
 *  
 * @arthor Serge-David */
var cheat = {
	godMode:false,
	noClip:false,
	noBattle:false,
	alwaysTown:false//Not sure if I want it or not.
}


function DebugStartup() {
	debugPop("Save Version: " + cookieVersion);
	debugPop("Game Version: " + gameVersion);
	/*newGame();
	map[loc.y][loc.x] = tile.Town;
	openTown();
	hero.gold = 1000; */
};

function showCookie() {debugMessage(document.cookie.split("; ")[3]);}

function debugAlert(text) {
	document.getElementById("debugTop").innerHTML = text;
	setTimeout("document.getElementById('debugTop').innerHTML = '';", 2000);
}
function debugMessage(text) {document.getElementById("debugBottom").innerHTML = text;}
function debugPop(text) {document.getElementById("debugBottom").innerHTML = text + "<br>" + document.getElementById("debugBottom").innerHTML;}
function debugPush(text) {document.getElementById("debugBottom").innerHTML += "<br>" + text;}