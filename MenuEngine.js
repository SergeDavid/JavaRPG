
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
			menuPointer = 0;
			if (menuState < 0) {menuState = 2;}
			if (menuState == menues.Menu.Inventory) {menuPointer = 0; inventoryPopulate(item.type.Item);}
		break;
		case input.Right : 
			menuState++;
			menuPointer = 0;
			if (menuState > 2) {menuState = 0;}
			if (menuState == menues.Menu.Inventory) {menuPointer = 0; inventoryPopulate(item.type.Item);}
		break;
		case input.Cancel : 
			if (menuState > menues.Menu.Inventory) {
				menuPointer = menuState;
				menuState = menues.Menu.Player;
			}
			else {gameState = state.World; menuPointer = 0; menuState = 0;} 
		break;
		case input.Up : 
			switch (menuState) {
				default : if (menuPointer > 0) {menuPointer--;} break;
				case menues.Menu.EquipWep :
				case menues.Menu.EquipArm :
				case menues.Menu.EquipHelm :
				case menues.Menu.Inventory : 
					if (menuPointer > 0) {menuPointer--;}
					if (itemListTop > 0 && itemListTop >= menuPointer) {itemListTop--;}
				break;
			}
		break;
		case input.Down : 
			switch (menuState) {
				default : if (menuPointer < 5) {menuPointer++;} break;
				case menues.Menu.EquipWep :
				case menues.Menu.EquipArm :
				case menues.Menu.EquipHelm :
				case menues.Menu.Inventory : 
					if (menuPointer < itemLength-1) {menuPointer++;} 
					if (itemListTop + itemListTotal < itemList.length && itemListTop < menuPointer - 5) {itemListTop++;}
				break;
				case menues.Menu.Settings :
					if (menuPointer < 3) {menuPointer++;}
				break;
			}
		break;
		case input.Enter :
			switch (menuState) {
				case menues.Menu.Player://Player Stats page
					switch (menuPointer) {
						case 0 : addStat(hero, 0); break;
						case 1 : addStat(hero, 1); break;
						case 2 : addStat(hero, 2); break;
						case 3 : 
							inventoryPopulate(item.type.Weapon);
							menuPointer = 0;
							menuState = menues.Menu.EquipWep;  
						break;
						case 4 : 
							inventoryPopulate(item.type.Armor);
							menuPointer = 0;
							menuState = menues.Menu.EquipArm; 
						break;
						case 5 : 
							inventoryPopulate(item.type.Helm);
							menuPointer = 0;
							menuState = menues.Menu.EquipHel; 
						break;
					}
				break;
				case menues.Menu.Inventory: 
					item.use(itemList[menuPointer].id);
				break;
				case menues.Menu.Settings:
					switch (menuPointer) {
						case 0: saveGame(); break;
						case 1: loadGame(); break;
						case 2: gameInfo.speed = 1; break;
						case 3: gameInfo.speed = 0; break;
					}
				break;
				case menues.Menu.EquipWep:
					if (menuPointer == 0) {hero.wep = 0;menuState = 0;menuPointer = 3;}
					else if (itemList[menuPointer].total > 0 && itemList[menuPointer].type == item.type.Weapon) {
						hero.wep = itemList[menuPointer].id;
						menuState = 0;
						menuPointer = 3;
					}
				break;
				case menues.Menu.EquipArm:
					if (menuPointer == 0) {hero.arm = 0;menuState = 0;menuPointer = 4;}
					else if (itemList[menuPointer].total > 0 && itemList[menuPointer].type == item.type.Armor) {
						hero.arm = itemList[menuPointer].id;
						menuState = 0;
						menuPointer = 4;
					}
				break;
				case menues.Menu.EquipHelm:
					if (menuPointer == 0) {hero.helm = 0;menuState = 0;menuPointer = 5;}
					else if (itemList[menuPointer].total > 0 && itemList[menuPointer].type == item.type.Helmet) {
						hero.helm = itemList[menuPointer].id;
						menuState = 0;
						menuPointer = 5;
					}
				break;
			}
		break;
	}
}

//Base menu render handler
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
	/*TODO:
	 *1) Make the three different equipment options selectable in the Stats menu (wep, arm, helm) 
	 *2) Display your items in the inventory menu (usable are white, non are greyed)
	 *3) Probably add a sorting system (Will probably need another button)
	 */
	switch (menuState) {
		case menues.Menu.Player :
			renderMenuTabs("Inventory","Stats","Settings");
			renderMenuBars(26, 66, 130);
			ctx.fillText("Gold: " + hero.gold, 36, 136);
			ctx.fillText("level: " + hero.level, 36, 150);
			renderMenuStats(336,88);	
			renderMenuEquipped(26, 174, 260);
		break;
		case menues.Menu.Settings :
			renderMenuTabs("Stats","Settings","Inventory");
			renderGameSettings(26,66);
		break;
		case menues.Menu.Inventory :
			renderMenuTabs("Settings","Inventory","Stats");
			renderMenuInventory();
		break;
		case menues.Menu.EquipWep :
			renderMenuTabs("---","Weapons","---");
			renderMenuInventory();
		break;
		case menues.Menu.EquipArm :
			renderMenuTabs("---","Armor","---");
			renderMenuInventory();
		break;
		case menues.Menu.EquipHel :
			renderMenuTabs("---","Helmets","---");
			renderMenuInventory();
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

function renderMenuInventory() {//TODO: Redesign a bit more to make it prettier!
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(20, 48, 360, 3);
	ctx.fillRect(20, 72, 360, 4);
	ctx.fillRect(224, 72, 4, 210);
	ctx.fillStyle = color.Text;
	ctx.font = font.Small;

	if (itemList.length != 0) {
		ctx.fillText(itemList[menuPointer].desc, 24, 55);
	
		ctx.fillText("Name", 30, 84);
	
		for (var i = 0; i < itemLength && i < itemListTotal; i++) {
			selectedColor(i+itemListTop);
			ctx.fillRect(26, 104+(24*i), 192, 22);
			ctx.fillStyle = color.Text;
			drawItemName(itemList[i+itemListTop].id, itemGreying.Equip, 30, 108+(24*i));
			item.effectInfo(itemList[i+itemListTop].id, 232, 108+(24*i));
		}
	}
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
	selectedColor(0); ctx.fillRect(x, y, 40, 24);
	selectedColor(1); ctx.fillRect(x, y+26, 40, 24);
	selectedColor(2); ctx.fillRect(x, y+52, 40, 24);
	ctx.fillStyle = color.MenuSelect;
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

function renderMenuEquipped(x, y, w) {
	ctx.fillStyle = color.MenuOption;
	ctx.fillRect(x, y, 76, 28);
	ctx.fillRect(x, y+36, 76, 28);
	ctx.fillRect(x, y+72, 76, 28);
	selectedColor(3); 
	ctx.fillRect(x+84, y, w, 28);
	selectedColor(4); 
	ctx.fillRect(x+84, y+36, w, 28);
	selectedColor(5); 
	ctx.fillRect(x+84, y+72, w, 28);
	ctx.fillStyle = color.Text;
	ctx.font = font.Medium;
	ctx.fillText("Weapon", x+4, y+6);
	ctx.fillText("Armor", x+7, y+42);
	ctx.fillText("Helmet", x+6, y+78);
	ctx.font = font.Small;
	ctx.fillText(equipName(hero.wep), x+90, y+10);
	ctx.fillText(equipName(hero.arm), x+90, y+46);
	ctx.fillText(equipName(hero.helm), x+90, y+82);
}

function renderGameSettings(x, y) {
	selectedColor(0); 
	ctx.fillRect(x+20, y+22, 80, 20);
	selectedColor(1); 
	ctx.fillRect(x+20, y+46, 80, 20);
	selectedColor(2); 
	ctx.fillRect(x+20, y+94, 80, 20);
	selectedColor(3); 
	ctx.fillRect(x+20, y+118, 80, 20);
	
	ctx.fillStyle = color.Text;
	ctx.font = font.Medium;
	ctx.fillText("Save Game", x, y);	
	ctx.fillText("Game Speed", x, y+72);
	ctx.font = font.Small;
	ctx.fillText("Save", x+36, y+24);	
	ctx.fillText("Load", x+36, y+48);		
	ctx.fillText("Fast", x+36, y+96);	
	ctx.fillText("Slow", x+36, y+120);
	
	ctx.fillText("Total Kills : " + gameInfo.kills, x+140, y);
	ctx.fillText("Being A Pansy : " + gameInfo.runs, x+140, y+1*24);
	ctx.fillText("Total Heals : " + gameInfo.heals, x+140, y+2*24);
	ctx.fillText("Magic backfires : " + gameInfo.magicBackfires, x+140, y+3*24);
	ctx.fillText("Magic backfires : " + gameInfo.magicBackfires, x+140, y+4*24);
	/* TODO: Include more options such as difficulty setting
	 * Also I want to display something on the right hand like monsters killed, etc.
	 */
}