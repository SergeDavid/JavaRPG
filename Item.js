var item = {
	target : {Caster : 0, Enemy : 1},
	type : {Item : 0, Helm : 1, Armor : 2, Weapon : 3, Quest : 4}
}
/* Ideas for how to handle items
 * Make an effect array and place the different effects in there.
 * Hopefully that makes it more manage-able to do. */
var items = {//TODO: Work on this so that I can handle many items such as drain life, potion, magic spells, equipment, and quest items.
	0 : {
		name : "Potion",//keep
		desc : "Restores 50 health to the user.",//keep
		target : item.target.Caster,//keep
		type : item.type.Item,//Is it a helm, armor, weapon, useable item, magic spell, quest item (key).
		cost : 10,//How much gold it takes to buy
		sell : 5,//How much gold it gives for selling
		total : 3,//Inventory count
		effect : {health : 10}
	},
	1 : {
		name : "H-Potion",
		desc : "Restores 100 health to the user.",
		target : item.target.Caster,
		type : item.type.Item,
		cost : 40,
		sell : 20,
		total : 1,
		effect : {health : 25, mana : 20, str : 5}
	},
	2 : {
		name : "M-Potion",
		desc : "Restores Cake to the user.",
		target : item.target.Caster,
		type : item.type.Item,
		cost : 80,
		sell : 40,
		total : 2,
		effect : {health : 50}
	},
	3 : {
		name : "Elixar",
		desc : "Replenishes 25 mana when used.",
		target : item.target.Caster,
		type : item.type.Item,
		cost : 25,
		sell : 15,
		total : 1,
		effect : {mana : 25}
	},
	4 : {
		name : "H-Elixar",
		desc : "Replenishes 26 mana when used.",
		target : item.target.Caster,
		type : item.type.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 30}
	},
	5 : {
		name : "M-Elixar",
		desc : "Replenishes 28 mana when used.",
		target : item.target.Caster,
		type : item.type.Item,
		cost : 25,
		sell : 15,
		total : 1,
		effect : {mana : 40}
	},
	6 : {
		name : "Dagger",
		desc : "Side Effects: Pointy end may cause external bleeding.",
		target : item.target.Enemy,//Not needed for
		type : item.type.Weapon,
		cost : 25,
		sell : 15,
		total : 1,
		effect : 8
	},
	7 : {
		name : "Sword",
		desc : "Side Effects: Pointy end may cause external bleeding.",
		target : item.target.Enemy,//Not needed for
		type : item.type.Weapon,
		cost : 25,
		sell : 15,
		total : 1,
		effect : 15
	},
	8 : {
		name : "Iron Helm",
		desc : "Side Effects: ringing in your ears.",
		target : item.target.Caster,//Not needed for
		type : item.type.Helm,
		cost : 42,
		sell : 84,
		total : 1,
		effect : 10
	}
}
var itemList;//A compiled list of every item with the type the particular shop is selling.
var itemLength;//How many items are in the itemList, used to make rendering it a tiny bit faster.
var itemListTop = 0;//This is the id of the top most item on the list.
var itemListTotal = 7;//How many items are shown at once max.

function itemPopulate(type) {
	itemList = new Array();
	var a = 0;
	for (var i in items) {
		if (items[i].type == type) {
			itemList.push(items[i]);
			itemList[itemList.length-1].id = i;
			a++;
		}
	}
	itemLength = itemList.length;
}
function inventoryPopulate(type) {
	itemList = new Array();
	var a = 0;
	if (type == item.type.Weapon || type == item.type.Armor || type == item.type.Helmet) {
		itemList.push({name:"Nothing",id:-1,desc:"Nothing"});
	}
	for (var i in items) {
		if (items[i].total > 0 && (items[i].type == type || type == -1)) {
			itemList.push(items[i]);
			itemList[itemList.length-1].id = i;
			a++;
		}
	}
	itemLength = itemList.length;
}

item.damage = function (id) {
	if (id != 0) return items[id].effect;
	else return 0;
}
item.defense = function (id) {
	if (id != 0) return items[id].effect;
	else return 0;
}

item.use = function (id) {
	if (items[id].target == item.target.Caster && items[id].total > 0) {
		items[id].total--;
		item.effect(items[id].effect, hero);
		if (items[id].total == 0) {
			inventoryPopulate(item.type.Item);
			if (menuPointer > 0) {menuPointer--;}
		}
	}
}
item.battleUse = function (id, e1, e2) {
	if (items[id].total > 0 || e1 instanceof monster) {
		if (e1 instanceof hero) {items[id].total--;}
		if (items[id].target == item.target.Caster) {
			item.effect(items[id].effect, e1);
			//item.effect(items[id].effect2, e2);//For multiple target items
		}
		else {
			item.effect(items[id].effect, e2);
			//item.effect(items[id].effect2, e1);//For multiple target items
		}
	}	
}
item.effect = function (effects, entity) {//Applies item effects (from item type items) to the chosen entity (+10 hp, -5 mana, etc.)
	for (eff in effects) {
		debugPush("item:  " + eff + " = " + effects[eff]);
		switch (eff) {
			case "health": entity.Heal(effects[eff],entity); break;
			case "mana": entity.Refill(effects[eff],entity); break;
			case "hurt": entity.Hurt(effects[eff],entity); break;
			default: debugPush("Item Effect " + eff + " not found."); break;
		}
	}
}
item.buy = function (i) {
	if (i.total < 99 && i.cost <= hero.gold) {
		hero.gold -= i.cost; i.total++;
	}
}
item.sell = function (i) {
	if (i.total > 0) {
		hero.gold += i.sell; i.total--;
	}
}
item.effectInfo = function (id, x, y) {
	for (var eff in items[id].effect) {//TODO: Randomize it so that when there are more then one effect it will loop through them based on gameTick
		var msg;
		switch (eff) {
			case "health" : 
				msg = (hero.health+items[id].effect[eff] < hero.maxHealth) ? hero.health + " -> " + (hero.health+items[id].effect[eff])*1 : hero.health + " -> " + hero.maxHealth; 
				ctx.fillText("x" + items[id].total + "  Health: " + msg, x, y);
			break;
			case "mana" : 
				msg = (hero.mana+items[id].effect[eff] < hero.maxMana) ? hero.mana + " -> " + (hero.mana+items[id].effect[eff])*1 : hero.mana + " -> " + hero.maxMana; 
				ctx.fillText("x" + items[id].total + "  Mana: " + msg, x, y);
			break;
		
		}
		break;
	}
}
