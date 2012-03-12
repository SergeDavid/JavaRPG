
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
	ctx.fillStyle = color.Menu;
	ctx.fillRect(20, 20, 360, 260);
	
	//Health, Mana, and Exp bars
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(73, 22, 136, 64);
	ctx.fillStyle = color.Health;
	ctx.fillRect(76, 26, (130*(hero.health/hero.maxHealth)), 20);
	ctx.fillStyle = color.Mana;
	ctx.fillRect(76, 46, (130*(hero.mana/hero.maxMana)), 20);
	ctx.fillStyle = color.Damage;//EXP
	ctx.fillRect(76, 66, (130*(hero.exp/(hero.level*expMultiplier))), 20);	
	
	ctx.fillStyle = color.Text;	
	
	ctx.fillText("Health:   " + hero.health + " / " + hero.maxHealth, 26, 30);
	ctx.fillText("Mana:    " + hero.mana + " / " + hero.maxMana, 26, 50);
	ctx.fillText("Exp:        " + hero.exp + " / " + (hero.level*expMultiplier), 26, 70);
	
	ctx.fillText("Gold: " + hero.gold, 30, 170);
	
	ctx.fillText("level: " + hero.level, 30, 150);
	
	renderMenuStats();
};

function renderMenuStats() {
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