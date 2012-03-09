//Fonts and drawing things to the canvas
var font = {
	Small : "14px Helvetica",
	Medium : "18px Helvetica",
	Large : "24px Helvetica"
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

//All of the base colors that are used and not in an image
var color = {
	Text : "#ffffff",
	BG : "#242424",
	Menu : "#242424",
	MenuSelect : "#484848",
	MenuBorder : "#124812",
	Health : "#00aa00",
	Mana : "#0000aa",
	Damage : "#aa0000"
};

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

//Because one is the opposite of the other, I'm going to render them both at once since it's a 1 on 1 battle.
function renderStats(e1, e2) {
	ctx.fillStyle = color.Health;
	ctx.fillRect(184,20,(-184*(e1.health/e1.maxhealth)),18);
	ctx.fillRect(216,20,(184*(e2.health/e2.maxhealth)),18);
	
	ctx.fillStyle = color.Mana;
	ctx.fillRect(160,38,(-160*(e1.mana/e1.maxmana)),18);
	ctx.fillRect(240,38,(160*(e2.mana/e2.maxmana)),18);
    
    ctx.fillStyle = color.MenuBorder;
    ctx.beginPath();
    ctx.moveTo(190, 16);
    ctx.lineTo(210, 16);
    ctx.lineTo(240, 38);
    ctx.lineTo(240, 56);
    ctx.lineTo(160, 56);
    ctx.lineTo(160, 38);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = color.Text;
    ctx.fillText((e1.health/e1.maxhealth)*100 + "%", 120, 20);
    ctx.fillText((e1.mana/e1.maxmana)*100 + "%", 120, 40);
    ctx.fillText((e2.health/e2.maxhealth)*100 + "%", 260, 20);
    ctx.fillText((e2.mana/e2.maxmana)*100 + "%", 260, 40);
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
	
	if (menuState > 0) {renderWorldMenu();}
};

function renderWorldMenu() {
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.Menu;
	ctx.fillRect(20, 20, 360, 260);
	ctx.fillStyle = color.Text;	
	
	ctx.fillText("Health: " + hero.health + " / " + hero.maxhealth, 30, 30);
	ctx.fillText("Mana: " + hero.mana + " / " + hero.maxmana, 30, 50);
	ctx.fillText("Gold: " + hero.gold, 30, 70);
	ctx.fillText("str: " + hero.strength, 30, 90);
	ctx.fillText("dex: " + hero.dexterity, 30, 110);
	ctx.fillText("agi: " + hero.agility, 30, 130);
	
	ctx.fillText("level: " + hero.level, 30, 150);
	ctx.fillText("exp: " + hero.exp, 30, 170);
	ctx.fillText("ap: " + hero.ap, 30, 190);
};

function renderTitle() {
	ctx.font = font.Large;//Using this here for the title before I add it
	ctx.fillStyle = color.Text;
	ctx.fillText("GAME TITLE I NEED TO MAKE", 18, 40);
	ctx.fillText("About this tall, two lines worth", 18, 60);
	ctx.fillStyle = font.Medium;
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