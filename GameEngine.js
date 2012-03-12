//Sets up the canvas to be used.
var canvas=document.getElementById('GameCanvas');
canvas.width = 400;//4:3 ratio
canvas.height = 300;

/* TITLE = New, Continue, About
 * MENU = Start menu, shows player stats and scrolled down also allows options like battle speed / save / load
 * BATTLE = In a battle
 * WON = End game screen that is good, Takes you back to the title screen when you click enter or just starts showing off scrolling stats.
 * LOST = End game when you die, DUN DUN DUN! Options to load last save and return to title
 * WORLD = Shows the map and you moving around it, starts battles, enter towns, and cancel to open MENU
 * TOWN = All of the menu options you can find in a town.
 */
var state = {
	Title:"TITLE",
	Battle:"BATTLE",
	Menu:"MENU",
	Won:"WON",
	Lost:"LOST",
	World:"WORLD",
	Town:"TOWN"
};
var gameVersion = "0.0.3";
var cookieVersion = "0.1";
var gameState = state.Title;

//Player look direction on the map
var direction = 0;
//Player location on the map
var loc = {x:10,y:10};
var expMultiplier = 20;//TODO: Redesign this

var hero = new Object();
var monster = new Object();
//var effects = new Object[5];//Clouds, Error message, Levelup Message, damage indicators (heal and hurt).

window.addEventListener('keydown', function(event) {
	inputNumber = event.keyCode;
    inputHandler();
}, false);

function newGame() {
	createMap(20,20);
	gameState = state.World;
	menuState = 0;
	hero = Object.create(entity);
	hero.imgx = 256;	
}

var gameTick = 0;
function mainloop() {
	gameTick++;
	if (gameTick >= 100) {gameTick = 0;}
	if (gameTick % 10 == 0) {
		switch (gameState) {
			case state.Battle: battleTick(); break;	
		}
	}
    render();
};