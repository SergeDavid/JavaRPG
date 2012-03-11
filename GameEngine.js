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
var gameState = state.Title;
//Pointer is current option in the menu it is pointing at
var menuPointer = 0;
//State is current layer in the menu from the start, such as the item sub-menu
var menuState = 0;
//The last button you pressed
var inputNumber = 0;
//Player look direction on the map
var direction = 0;
//Player location on the map
var loc = {x:10,y:10};
var expMultiplier = 20;//TODO: Redesign this

var hero = new Object();
var monster = new Object();
//var effects = new Object[5];

window.addEventListener('keydown', function(event) {
	inputNumber = event.keyCode;
    handleMenu();
}, false);

//@Deprecated TODO: Currently only using this for jumping straight into specific conditions during startup, remove when done. 
function DebugHelper() {  
	//newGame();
	//gameState = state.Menu; 
	//hero.ap = 10; 
};

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