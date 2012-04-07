var itemInfo = {
	Item : 0,//A standard item like a potion or elixar
	Helm : 1,//A helmet, because two types of armor is cool
	Armor : 2,//Body Armor
	Weapon : 3,//Your weapon
	Magic : 4,//A spell to use in battle
	Quest : 5,//Key, wolfs heart, etc.
	//target
	Caster : 0,
	Enemy : 1
}
/* Ideas for how to handle items
 * Make an effect array and place the different effects in there.
 * Hopefully that makes it more manage-able to do. */
var items = {//TODO: Work on this so that I can handle many items such as drain life, potion, magic spells, equipment, and quest items.
	0 : {
		name : "Potion",//keep
		desc : "Restores 50 health to the user.",//keep
		target : itemInfo.Caster,//keep
		type : itemInfo.Item,//Is it a helm, armor, weapon, useable item, magic spell, quest item (key).
		cost : 10,//How much gold it takes to buy
		sell : 5,//How much gold it gives for selling
		total : 3,//Inventory count
		effect : {hp : 50}
	},
	1 : {
		name : "H-Potion",
		desc : "Restores 100 health to the user.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 40,
		sell : 20,
		total : 0,
		effect : {health : 100}
	},
	2 : {
		name : "M-Potion",
		desc : "Restores Cake to the user.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 80,
		sell : 40,
		total : 0,
		effect : {health : 200}
	},
	3 : {
		name : "Elixar",
		desc : "Replenishes 25 mana when used.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	4 : {
		name : "H-Elixar",
		desc : "Replenishes 26 mana when used.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	5 : {
		name : "M-Elixar",
		desc : "Replenishes 28 mana when used.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	6 : {
		name : "Dagger",
		desc : "Side Effects: Pointy end may cause external bleeding.",
		target : itemInfo.Enemy,//Not needed for
		type : itemInfo.Weapon,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {damage : 5}
	},
	7 : {
		name : "Sword",
		desc : "Side Effects: Pointy end may cause external bleeding.",
		target : itemInfo.Enemy,//Not needed for
		type : itemInfo.Weapon,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {damage : 5}
	},
	8 : {
		name : "Iron Helm",
		desc : "Side Effects: ringing in your ears.",
		target : itemInfo.Caster,//Not needed for
		type : itemInfo.Helm,
		cost : 42,
		sell : 84,
		total : 0,
		effect : {damage : 5}
	}
}
//TODO: See about using these arrays instead of populating an array every time I need to use one.
var shopItem;//Potions, elixars, antidotes, etc.
var shopWeapon;//Daggers, Swords, Bullwhips, etc.
var shopArmor;//Helmets, Shields, etc. (2 slots, head armor and body armor)

function itemPopulate(type) {
	var array = new Array();
	var a = 0;
	for (var i in items) {
		if (items[i].type == type) {
			array.push(items[i]);
			a++;
		}
	}
	itemLength = array.length;
	return array;
}

function itemBuy(i) {
	if (i.total < 99 && i.cost <= hero.gold) {
		hero.gold -= i.cost;
		i.total++;
	}
}

function itemSell(i) {
	if (i.total > 0) {
		i.total--;
		hero.gold += i.sell;
	}
}
