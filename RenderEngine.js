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

//sprite sheet work
var spritesheet = {img:new Image(),width:512,height:512,ready:false};
spritesheet.img.onload = function() {
    spritesheet.ready = true;
};
spritesheet.img.src = 'sheet.png';
//This following is reserved for a seperate image file for background images that go 400 x 300 for items
//Like the title, win, and lose screens.
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

function renderWorld() {
	renderMap();
	
	switch (direction) {
		case 0: renderImage(64, 0, 0 ,200-32, 150-32); break;
		case 1: renderImage(64, 64, 0 ,200-32, 150-32); break;
		case 2: renderImage(64, 0, 64 ,200-32, 150-32); break;
		case 3: renderImage(64, 64, 64 ,200-32, 150-32); break;
	}
	
	ctx.fillStyle = color.Text;
	ctx.fillText("Loc x : " + loc.x,32,32);
	ctx.fillText("Loc y : " + loc.y,32,64);
	
	if (map[loc.y][loc.x] == tile.Town)	{
		ctx.font = font.Large;
		ctx.fillText("Town", 200-20, 80);
		ctx.font = font.Medium;
		ctx.fillText("Press A", 200-20, 110);
		ctx.font = font.Small;
	}
};

function renderTitle() {
	renderBackground(0,0);
	ctx.font = font.Large;
	if (menuState == 0) {
		ctx.fillStyle = color.MenuSelect;
		switch (menuPointer) {//400
			case 0: ctx.fillRect(110, 140, 180, 40);break;
			case 1: ctx.fillRect(110, 180, 180, 40);break;
			case 2: ctx.fillRect(110, 220, 180, 40);break;	
		}
		ctx.fillStyle = color.Text;
		ctx.fillText(" New Game", 136, 150);
		ctx.fillText("  Continue", 140, 190);
		ctx.fillText("   About", 150, 230);
	}
	else {
		ctx.font = font.Small;
		ctx.fillStyle = color.Text;
		ctx.fillText("My goal is making a Canvas & Javascript game", 28, 120);
		ctx.fillText("This started as a pokemon red / blue emulator", 28, 136);
		ctx.fillText("However making it faithful became boring", 28, 152);
		ctx.fillText("So I decided to just make an rpg game for fun", 28, 168);
		ctx.fillText('\\    //\\    //  ==||==  ||\\\\  ||', 80, 190);
		ctx.fillText(' \\  //  \\  //       ||      || \\\\ ||', 80, 204);
		ctx.fillText('  \\//    \\//    ==||==  ||  \\\\||', 80, 218);
	}
	ctx.font = font.Small;	
	ctx.fillText("Created by Serge-David", 6, 280);
	ctx.fillText("Version : " + gameVersion, 300, 280);
};

function renderLost() {
	renderImage(128+64, 0, 128, 100, 30);	
	//TODO: Add Menu
};