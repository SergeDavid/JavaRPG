/* This file handles everything about drawing to the canvas
 * var font is for canvas_2D.font
 * var color is for canvas_2D.fillstyle
 *
 *  
 * @arthor Serge-David */

//Fonts and color enums
var font = {
	Small : "14px Helvetica",
	Medium : "18px Helvetica",
	Large : "24px Helvetica"
};
var color = {//TODO: Re-organize the colors by removing the old ones and adding needed ones for clearification.
	Text : "#ffffff",//Standard text color
	Grey : "#aaaaaa",
	//MenuOption (a different shade to tell what is an option and what isn't when scrolling through menus)
	BG : "#242424",//Background @Deprecated when I include background for each gamestate.
	//Menu : "#242424",//Menu background (Might get replaced with images) @Deprecated when bg images are made
	MenuSelect : "#4a4a5f",//Highlighting currently selected item on menus
	MenuSelect2 : "#404055",
	MenuOption : "#323232",//A menu option that is currently not selected.
	MenuBorder : "#104410",//Border around the menu, might get replaced like above @Deprecated when bg images are made
	Health : "#00aa00",//Health bar color and Heal numbers
	Mana : "#0000aa",//Mana bar color and Regain mana numbers
	Exp : "#aa0000",//Experience bar
	Damage : "#aa0000"//Damage numbers color
};

var ctx=canvas.getContext('2d');
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.font = font.Small;

//sprite sheet for all images that aren't static backgrounds
var spritesheet = {img:new Image(),width:512,height:512,ready:false};
spritesheet.img.onload = function() {
    spritesheet.ready = true;
};
spritesheet.img.src = 'sheet.png';
//background sheet for 400 x 300 (canvas size) images 
var background = {img:new Image(),ready:false};
background.img.onload = function() {
    background.ready = true;
};
background.img.src = 'bgsheet.png';

function render() {
	//Background
    ctx.fillStyle = color.BG;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    
    switch (gameState) {
    	case "TITLE": renderTitle(); break;
    	case "TOWN": renderTown(); break;
    	case "WORLD": renderWorld(); break;
    	case "BATTLE": renderBattle(); break;
    	case "LOST": renderLost(); break;
    	case state.Menu : renderWorldMenu(); break;
    }
};

//Shows what item is currently selected. by handling the highlight color of a fillRect
function selectedColor(pointer) {
	if (menuPointer == pointer) {ctx.fillStyle = (gameTick%50 < 25) ? color.MenuSelect : color.MenuSelect2;}
	else {ctx.fillStyle = color.MenuOption;}
}

//Used for determining what requirements are needed to grey text.
var itemGreying = {Buy:0,Sell:1,Equip:2,Use:3}
//Changes the color of text based on if you have more then 0.
function drawItemName(id, type, x, y) {
	if (id == -1) {
		ctx.fillStyle = color.Text;
		ctx.fillText("Nothing", x, y);
	}
	else {
		switch (type) {
			case itemGreying.Buy : type = (items[id].cost <= hero.gold && items[id].total < 99) ? 1 : 0 ; break;
			case itemGreying.Sell : type = (items[id].total > 0) ? 1 : 0 ; break;
			case itemGreying.Equip : type = (items[id].total > 0) ? 1 : 0 ; break;
			case itemGreying.Use : type = (items[id].target == itemInfo.Enemy && items[id].total > 0) ? 1 : 0 ; break;
		}
		ctx.fillStyle = (type == 1) ? color.Text : color.Grey ;
		ctx.fillText(items[id].name, x, y);
	}
}

//Renders an entity at X and Y.
function renderSprite (e, xx, yy) {
	if (spritesheet.ready) {
		ctx.drawImage(spritesheet.img, e.imgx, e.imgy, e.imgs, e.imgs, xx, yy, e.imgs, e.imgs);			
	}
};
function renderImage (s, x, y, xx, yy) {
	if (spritesheet.ready) {
		ctx.drawImage(spritesheet.img, x, y, s, s, xx, yy, s, s);
	}		
};
function renderBackground (x, y) {
	if (background.ready) {
		ctx.drawImage(background.img, x*400, y*300, 400, 300, 0, 0, 400, 300)
	}
};
