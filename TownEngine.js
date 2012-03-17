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
			if (menuPointer > 0) {menuPointer--;}
		break;
		case input.Down:
			if (menuPointer < itemLength - 1) {menuPointer++;}
		break;
		case input.Cancel:
			menuPointer = 0;//TODO: Base it on which menu is up currently displayed.
			menuState = 0;
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
		//itemList = new Array(items.Potion, items[1], items[2], items[3]);
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
		renderStore(0);
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
		case 0: 
		default: name = "Apothecary"; break;
	}
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(20, 50, 360, 6);
	ctx.fillStyle = color.Text;
	ctx.font = font.Large;
	ctx.fillText(name,40,24);
	ctx.fillText("gold " + hero.gold, 200, 24);
	ctx.font = font.Small;
	//TODO: Setup for allowing scrolling based on the menuPointer location in the length variable.
	for (var i = 0; i < itemLength; i++) {
		if (i == menuPointer) {
			ctx.fillStyle = color.MenuSelect;
			ctx.fillRect(28, 68+(20*i), 60, 20);
		}
		else {
			ctx.fillStyle = color.MenuOption;
			ctx.fillRect(28, 68+(20*i), 60, 20);
		}
		ctx.fillStyle = color.Text;
		ctx.fillText(itemList[i].name, 30, 70+(20*i));
		ctx.fillText("Total : " + itemList[i].total, 200, 70+(20*i));
	}
	
}
