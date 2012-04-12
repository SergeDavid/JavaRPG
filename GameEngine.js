//Sets up the canvas to be used.
var canvas=document.getElementById('GameCanvas');
canvas.width = 400;//4:3 ratio
canvas.height = 300;
var running = true;
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
var menues = {
	Title : {
		Title : 0,
		About : 1
	},
	Battle : {},
	Menu : {
		Player : 0,//important stats, apply ap, and change equipment
		Settings : 1,//Save and Load, Game speed, Battle speed, random stats
		Inventory : 2,//Useable Items and Quest items (or maybe hide these somewhere else)
		EquipWep : 3,
		EquipArm : 4,
		EquipHel : 5//Might change this to magic if I only let you use one magic ability at once.
	},
	Won : 0,
	Lost : 0,
	World : 0,//Might use this to determin 
	Town : {
		Main : 0,
		ItemShop : 1,
		WepShop : 2,
		ArmShop : 3,
		HelmShop : 4
	}
}
var gameVersion = "0.0.5";
var cookieVersion = "0.1";
var gameState = state.Title;

var direction = 0;//Player look direction on the map
var loc = {x:10,y:10};//Player location on the map
var expMultiplier = 20;//TODO: Redesign this (used to determine how much exp per level the player needs to level up)

var hero = new Object();
var monster = new Object();
var gameinfo = {//Stores a lot of fun wibbly wobbly timey whimey shinanigans
	startTime:0,//Tracks when you started the game and lost / won.
	endTime:0,
	kills:0,//Kill count
	runs:0,//Pansy count
	heals:0,//Times healed
	magicBackfires:0//Best stat ever
};
//var effects = new Object[5];//Clouds, Error message, Levelup Message, damage indicators (heal and hurt).

Math.rand = function (num) {
	return Math.floor((Math.random()*num)+1);
}

window.addEventListener('keydown', function(event) {
	if (running) {
		inputNumber = event.keyCode;
    	inputHandler();
    }
}, false);

function newGame() {
	createMap(20,20);
	gameState = state.World;
	menuState = 0;
	hero = Object.create(entity);
	hero.imgx = 256;	
}

function stopGame() {running = false;}
function startGame() {running = true; setTimeout(mainLoop, loopTime);}

var gameTick = 0;//Max is 99
var loopTime = 5;
function mainLoop() {
	if (running) {
		gameTick++;
		if (gameTick >= 100) {gameTick = 0;}
		if (gameTick % 10 == 0) {
			switch (gameState) {
				case state.Battle: battleTick(); break;	
			}
		}
    	render();
    	setTimeout(mainLoop, loopTime);
   	}
};