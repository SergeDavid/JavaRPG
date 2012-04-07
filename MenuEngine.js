
/* TODO
Reposition Level and Gold numbers
Add in an Item menu (Those you can use right now)
Add in equipped items (select them and then press Enter to change them)
Add in the Game speed and Save game elements
 */

function handleMenu() {
	switch(inputNumber) {
		case input.Left : 
			menuState--;
			if (menuState < 0) {menuState = 2;}
		break;
		case input.Right : 
			menuState++;
			if (menuState > 2) {menuState = 0;}
		break;
		case input.Cancel : gameState = state.World; break;
		case input.Up : 
			if (menuPointer > 0) {menuPointer--;}
		break;
		case input.Down : 
			if (menuPointer < 2) {menuPointer++;}
		break;
		case input.Enter :
			switch (menuState) {
				case 0:
					switch (menuPointer) {
						case 0 : addStat(hero, 0); break;
						case 1 : addStat(hero, 1); break;
						case 2 : addStat(hero, 2); break;
					}
				break;
			}
		break;
	}
}

function renderWorldMenu() {
	renderMap();
	
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.BG;
	ctx.fillRect(18, 18, 364, 264);
	ctx.fillStyle = color.MenuOption;
	ctx.fillRect(150,22,104,30);//Middle
	ctx.fillRect(24,28,104,24);//Left
	ctx.fillRect(272,28,104,24);//Right
	
	switch (menuState) {
		case 0:
			renderMenuTabs("Inventory","Stats","Settings");
			renderMenuBars(26, 66, 130);
			ctx.fillText("Gold: " + hero.gold, 36, 200);
			ctx.fillText("level: " + hero.level, 36, 180);
			renderMenuStats(336,88);	
		break;
		case 1 :
			renderMenuTabs("Stats","Settings","Inventory");
			renderGameSettings(26,66);
		break;
		case 2 :
			renderMenuTabs("Settings","Inventory","Stats");
		break;
	}
	//renderMenuEquipped(); //Helm, Armor, Weapon, Magic (TODO: Decide if I want to allow the use of 1 or more magics in battle)
	//renderMenuOptions(); //Battle Speed, Save / Load
};

function renderMenuTabs(left, middle, right) {
	ctx.fillStyle = color.Text;
	ctx.font = font.Large;
	ctx.fillText(middle, 154, 25);
	ctx.font = font.Medium;
	ctx.fillText(left, 30, 30);
	ctx.fillText(right, 278, 30);
	ctx.font = font.Small;	
}

//X and Y is the top left location while w is the width of the stat bars.
function renderMenuBars(x, y, w) {
	ctx.fillStyle = color.MenuBorder;//Border for the bars
	ctx.fillRect(x+47, y-8, w+6, 64);
	ctx.fillStyle = color.Health;
	ctx.fillRect(x+50, y-4, (w*(hero.health/hero.maxHealth)), 20);
	ctx.fillStyle = color.Mana;
	ctx.fillRect(x+50, y+16, (w*(hero.mana/hero.maxMana)), 20);
	ctx.fillStyle = color.Damage;//EXP
	ctx.fillRect(x+50, y+36, (w*(hero.exp/(hero.level*expMultiplier))), 20);	
	
	ctx.fillStyle = color.Text;	
	
	ctx.fillText("Health:   " + hero.health + " / " + hero.maxHealth, x, y);
	ctx.fillText("Mana:    " + hero.mana + " / " + hero.maxMana, x, y+20);
	ctx.fillText("Exp:        " + hero.exp + " / " + (hero.level*expMultiplier), x, y+40);
}

function renderMenuStats(x, y) {
	ctx.fillStyle = color.MenuOption;
	ctx.fillRect(x, y, 40, 24);
	ctx.fillRect(x, y+26, 40, 24);
	ctx.fillRect(x, y+52, 40, 24);
	ctx.fillStyle = color.MenuSelect;
	switch (menuPointer) {
		case 0 : ctx.fillRect(x, y, 40, 24); break;
		case 1 : ctx.fillRect(x, y+26, 40, 24); break;
		case 2 : ctx.fillRect(x, y+52, 40, 24); break;
	}
	ctx.fillRect(x-108, y-26, 148, 22);
	
	ctx.fillStyle = color.Text;
	ctx.fillText("Ability Points: " + hero.ap, x-104, y-22);
	ctx.fillText("Strength: " + hero.strength, x-122, y+4);
	ctx.fillText("Dexterity: " + hero.dexterity, x-122, y+30);
	ctx.fillText("Agility: " + hero.agility, x-122, y+56);	
	
	ctx.font = font.Medium;
	ctx.fillText("Add", x+4, y+4);
	ctx.fillText("Add", x+4, y+30);
	ctx.fillText("Add", x+4, y+56);
	ctx.font = font.Small;
}

function renderGameSettings(x, y) {
	ctx.fillStyle = color.Text;
	ctx.fillText("Save Game", x, y);	
	ctx.fillText("Save", x+40, y+20);	
	ctx.fillText("Load", x+40, y+40);	
	ctx.fillText("Battle Speed", x, y+60);	
	ctx.fillText("Fast", x+40, y+80);	
	ctx.fillText("Slow", x+40, y+100);	
	/* TODO: Include more options such as difficulty setting
	 * Also I want to display something on the right hand like monsters killed, etc.
	 */
}