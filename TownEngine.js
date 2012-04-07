/* Town Shops
 * 		menuPointer
 * 			0 ~ ? = buy / sell item (probably place a toggle to change between buy and sell mode on left / right or something)
 * 			? + 1 = Back (Cancel button does the same thing but you know how people are...)
 * 		Shops
 * 			Items
 * 			Weapons
 * 			Armor + helmets
 */

var selling = false;//A flag to flip selling and buying
var itemList;//A compiled list of every item with the type the particular shop is selling.
var itemLength;//How many items are in the itemList, used to make rendering it a tiny bit faster.
var itemListTop = 0;//This is the id of the top most item on the list.
var itemListTotal = 7;//How many items are shown at once max.

function handleTown() {
	if (menuState > 0) {
		handleStore();
	}
	else {
		switch (inputNumber) {
			case input.Up:
				if (menuPointer > 0) {menuPointer--;}
			break;
			case input.Down:
				if (menuPointer < 3) {menuPointer++;}
			break;
			case input.Cancel:
				gameState = state.World; menuPointer = 0; menuState = 0;
			break;
			case input.Enter:
				switch (menuPointer) {
					case 0: itemList = itemPopulate(itemInfo.Item); break;
					case 1: itemList = itemPopulate(itemInfo.Weapon); break; 
					case 2: itemList = itemPopulate(itemInfo.Armor); break;
					case 3: itemList = itemPopulate(itemInfo.Helm); break; //TODO: Useless?
				}
				menuState = 1;
				menuPointer = 0;
			break;
		}
	}
};

function handleStore() {
	switch (inputNumber) {
		case input.Left:
		case input.Right:
			selling = !selling;
		break;
		case input.Up:
			if (menuPointer > 0) {
				menuPointer--;
				if (itemListTop > 0 && itemListTop >= menuPointer) {
					itemListTop--;
				}
			}
		break;
		case input.Down:
			if (menuPointer < itemLength - 1) {
				menuPointer++;
				if (itemListTop + itemListTotal < itemList.length && itemListTop < menuPointer - 5) {
					itemListTop++;
				}
			}
		break;
		case input.Cancel:
			//menuPointer = menuState-1;
			
			menuState = 0;
			itemListTop = 0;
		break;
		case input.Enter:
			if (!selling) {itemBuy(itemList[menuPointer]);}
			else {itemSell(itemList[menuPointer]);}
		break;
	}
}

function openTown() {
	if (map[loc.y][loc.x] == tile.Town) {
		gameState = state.Town;
	}
};

function renderTown() {
	renderMap();
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.BG;
	ctx.fillRect(20, 20, 360, 260);
	ctx.fillStyle = color.Text;
	ctx.font = font.Large;
	if (menuState > 0) {
		renderStore(menuState);
	}
	else {
		var names = new Array("Items","Weapons","Armors","Helmets");
		for (var i = 0; i < 4; i++) {
			if (i == menuPointer) {ctx.fillStyle = color.MenuSelect;}
			else {ctx.fillStyle = color.MenuOption;}
			ctx.fillRect(40, 80+(i*40), 120, 30);
			ctx.fillStyle = color.Text;
			ctx.fillText(names[i], 50, 84+(i*40));
			
		}
	}
}

function renderStore(type) {
	var name;
	switch (type) {
		case 2: name = "Smithery"; break;
		case 3: name = "Armor Guild"; break;
		case 4: name = "Mad Hatter"; break;
		default: name = "Apothecary"; break;
	}
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(20, 48, 360, 3);
	ctx.fillRect(20, 72, 360, 4);
	ctx.fillRect(224, 72, 4, 210);
	ctx.fillRect(328, 72, 4, 210);
	//TODO: Add seperators for the different parts Name, Cost, Total
	
	ctx.fillStyle = color.Text;
	ctx.font = font.Large;
	ctx.fillText(name,30,22);
	
	ctx.font = font.Small;
	ctx.fillText("Gold " + hero.gold, 270, 30);
	if (selling) {ctx.fillText("Selling", 200, 30);} 
	else {ctx.fillText("Buying", 200, 30);}
	if (itemList.length != 0) {
		ctx.fillText(itemList[menuPointer].desc, 24, 55);
	
		ctx.fillText("Name", 30, 84);
		ctx.fillText("Cost", 236, 84);
		ctx.fillText("Total", 346, 84);
	
		//TODO: Setup for allowing scrolling based on the menuPointer location in the length variable.
		//7 items total, it scrolls when you reach the 2nd from the top or bottom
		for (var i = 0; i < itemLength && i < itemListTotal; i++) {
			if (i+itemListTop == menuPointer) {ctx.fillStyle = color.MenuSelect;}
			else {ctx.fillStyle = color.MenuOption;}
			ctx.fillRect(26, 104+(24*i), 192, 22);
		
			ctx.fillStyle = color.Text;
			ctx.fillText(itemList[i+itemListTop].name, 30, 108+(24*i));
			ctx.fillText("$ " + itemList[i+itemListTop].cost, 236, 108+(24*i));
			ctx.fillText("x " + itemList[i+itemListTop].total, 346, 108+(24*i));
		}
	}
}
