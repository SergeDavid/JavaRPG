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
		desc : "An item that heals the user for 50 health.",//keep
		target : itemInfo.Caster,//keep
		type : itemInfo.Item,//Is it a helm, armor, weapon, useable item, magic spell, quest item (key).
		cost : 10,//How much gold it takes to buy
		sell : 5,//How much gold it gives for selling
		total : 3,//Inventory count
		effect : {hp : 50}
	},
	1 : {
		name : "H-Potion",
		desc : "",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 40,
		sell : 20,
		total : 0,
		effect : {health : 100}
	},
	2 : {
		name : "M-Potion",
		desc : "",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 80,
		sell : 40,
		total : 0,
		effect : {health : 200}
	},
	3 : {
		name : "Elixar",
		desc : "An item that restores 25 mana to the user.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	4 : {
		name : "H-Elixar",
		desc : "An item that restores 25 mana to the user.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	5 : {
		name : "M-Elixar",
		desc : "An item that restores 25 mana to the user.",
		target : itemInfo.Caster,
		type : itemInfo.Item,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {mana : 25}
	},
	6 : {
		name : "Dagger",
		desc : "An item that restores 25 mana to the user.",
		target : itemInfo.Enemy,//Not needed for
		type : itemInfo.Weapon,
		cost : 25,
		sell : 15,
		total : 0,
		effect : {damage : 5}
	},
}
var shopItem;//Potions, elixars, antidotes, etc.
var shopWeapon;//Daggers, Swords, Bullwhips, etc.
var shopArmor;//Helmets, Shields, etc. (2 slots, head armor and body armor)

function itemPopulate(type) {//TODO: All of this crap isn't working ARRRGH!!!!
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
