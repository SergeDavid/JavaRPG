//Sets up the canvas to be used.
var canvas=document.getElementById('GameCanvas');
canvas.width = 400;//4:3 ratio
canvas.height = 300;
/* TODO: List
 * Add items into the game and enable the using of them in battle
 * 		Create the menu
 * 		Add in the handlers for Item.use(ID);
 * 		Add in a function for monsters to use items without messing with the quantity Item.mobUse(ID); for the BattleBrain function
 * 		Make it impossible to sell the last equippable item if it is currently equipped.
 * Start on the Town menu system (Weapons and Item shops as well as a few npc's to talk too)
 * 		create Item.buy(ID); to be triggered to increase an items quantity by 1 while decreasing your gold by its cost unless you have 99 of them
 * 		create Item.sell(ID); so you get sellCost back in gold and lose 1 item unless you are completely out of them
 * 		
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
var gameVersion = "0.0.4";
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
var loopTime = 5;
function mainLoop() {
	gameTick++;
	if (gameTick >= 100) {gameTick = 0;}
	if (gameTick % 10 == 0) {
		switch (gameState) {
			case state.Battle: battleTick(); break;	
		}
	}
    render();
};