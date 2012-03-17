
/* TODO
Reposition Level and Gold numbers
Add in an Item menu (Those you can use right now)
Add in equipped items (select them and then press Enter to change them)
Add in the Game speed and Save game elements
 */

function handleMenu() {
	switch(inputNumber) {
		case input.Cancel : gameState = state.World; break;
		case input.Up : 
			if (menuPointer > 0) {menuPointer--;}
		break;
		case input.Down : 
			if (menuPointer < 2) {menuPointer++;}
		break;
		case input.Enter : 
			switch (menuPointer) {
				case 0 : addStat(hero, 0); break;
				case 1 : addStat(hero, 1); break;
				case 2 : addStat(hero, 2); break;
			}
		break;
	}
}

function renderWorldMenu() {
	renderMap();
	
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.BG;
	ctx.fillRect(20, 20, 360, 260);
	
	renderMenuBars(26, 30, 130);
	ctx.fillText("Gold: " + hero.gold, 30, 170);
	ctx.fillText("level: " + hero.level, 30, 150);
	renderMenuStats();
	//renderMenuEquipped(); //Helm, Armor, Weapon, Magic (TODO: Decide if I want to allow the use of 1 or more magics in battle)
	//renderMenuOptions(); //Battle Speed, Save / Load
};

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

function renderMenuStats() {
	ctx.fillStyle = color.MenuOption;
	ctx.fillRect(336, 52, 40, 24);
	ctx.fillRect(336, 78, 40, 24);
	ctx.fillRect(336, 104, 40, 24);
	ctx.fillStyle = color.MenuSelect;
	switch (menuPointer) {
		case 0 : ctx.fillRect(336, 52, 40, 24); break;
		case 1 : ctx.fillRect(336, 78, 40, 24); break;
		case 2 : ctx.fillRect(336, 104, 40, 24); break;
	}
	ctx.fillRect(228, 26, 148, 22);
	
	ctx.fillStyle = color.Text;
	ctx.fillText("Ability Points: " + hero.ap, 232, 30);
	ctx.fillText("Strength: " + hero.strength, 214, 56);
	ctx.fillText("Dexterity: " + hero.dexterity, 214, 82);
	ctx.fillText("Agility: " + hero.agility, 214, 108);	
	
	ctx.font = font.Medium;
	ctx.fillText("Add", 340, 56);
	ctx.fillText("Add", 340, 82);
	ctx.fillText("Add", 340, 108);
	ctx.font = font.Small;
};