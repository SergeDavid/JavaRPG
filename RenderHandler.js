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
var color = {
	Text : "#ffffff",//Standard text color
	GrayText : "#aaaaaa",//Unselectable text color
	BG : "#242424",//Background
	Menu : "#242424",//Menu background (Might get replaced with images)
	MenuSelect : "#484848",//Highlighting currently selected item on menus
	MenuBorder : "#104410",//Border around the menu, might get replaced like above
	Health : "#00aa00",//Health bar color and Heal numbers
	Mana : "#0000aa",//Mana bar color and Regain mana numbers
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

function renderMap() {
	var xoff = loc.x * 64 - 200 + 32;
	var yoff = loc.y * 64 - 150 + 32;
	for (var y = 0; y < mapH; y++) {
		for (var x = 0; x < mapW; x++) {
			if (map[y][x].top == true) {
				renderImage(64, tile.Open.x, tile.Open.y, x*64-xoff, y*64-yoff);	
			}
			renderImage(64, map[y][x].x, map[y][x].y, x*64-xoff, y*64-yoff);
		}
	}	
};
