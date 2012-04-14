entity = {
	maxHealth : 100,
	health : 100,
	maxMana : 50,
	mana : 25,
	
	exp : 0,//Player: total exp which resets when you reach a level, Monster: How much you get from looting.
	level : 1,//Both: Level
	ap : 0,//Player: how much stats you can place into str, dex, agi.
	gold : 10,//Player: Gold ammount, Monster: Loot ammount.
	nextTurn : 2,//Both: Count down timer to turn.
	healDesire : 0.45,//Monster: 1.0 means a monster will want to heal almost as soon as it gets hurt while 0.0 is never.
	
	//Stats
	strength : 40,//How much damage you deal
	dexterity : 5,//How much damage you block
	agility : 5,//How fast you attack
	wep : 0,
	arm : 0,
	helm : 0,
	
	imgx : 128, //image location on the grid
	imgy : 0,
	imgs : 128
}
var magic = {
	0: {
		name:"Heal",
		power:60,
		type:1,
		cost:10
	}
};

entity.Heal = function (dmg, e) {//Refills an entities health (doesn't go above max)
	e.health+=dmg;
	if (e.health > e.maxHealth) {
		e.health = e.maxHealth;
	}
}
entity.Refill = function (dmg, e) {//Refills an entities mana (doesn't go above max)
	e.mana+=dmg;
	if (e.mana > e.maxMana) {
		e.mana = e.maxMana;
	}
}
entity.Attack = function (e1, e2) {//Attacks an enemy, has a small chance of doing extra and less damage
	var dmg = e1.strength + item.damage(e1.wep);
	switch (Math.rand(10)) {
		case 0 :
		case 1 : dmg *= 0.8; break;//glance
		case 2 : dmg *= 1.2; debugAlert("Critical!");break;//crit
		default : dmg *= 1; break;
	}
	dmg -= e2.dexterity + item.defense(e2.arm);
	entity.Hurt(dmg, e2);
}
entity.Magic = function (magic, e1, e2) {//Uses a magic spell (id) from (e1) to (e2), will only effect e1 if target = caster
	if (e1.mana >= magic.cost) {
		e1.mana-=magic.cost;	
		entity.Hurt(magic.power, e2);
	}
}
entity.Run = function () {//Be a pansy and run away from battle
	gameState = state.World;
}
entity.Hurt = function (dmg, e) {//Deals damage (dmg) to entity (e), will probably have to move dexterity to attack/magic
	if (dmg < 1) {debugAlert("Blocked!");}
	else {
		e.health -= dmg;
		if (e.health <= 0) {e.health = 0; die(e);}
	}
}

function addStat(e, num) {
	if (e.ap > 0) {
		switch (num) {
			case 0 : e.strength++; break;
			case 1 : e.dexterity++; break;
			case 2 : e.agility++; break;
		}
		e.ap--;	
	}	
}

function equipName(id) {
	if (id == 0) return "Nothing";
	else {return items[id].name;}
}

function lootCorpse(e) {
	hero.gold += e.gold;
	hero.exp += e.exp;
	if (hero.exp >= hero.level*10) {
		while (hero.exp >= hero.level*expMultiplier) {
			hero.exp -= hero.level*expMultiplier;
			hero.level++;
			hero.ap += 3;
		}	
	}
};

function die(e) {
	if (e === hero) {gameState = "LOST";}
	else {lootCorpse(e);gameState = "WORLD";}
};

function battleBrain(e) {
	if (e.health/e.maxHealth < e.healDesire && Math.floor(Math.random() * 11) < 3) {
		entity.Heal(15, e);
	}
	else { entity.Attack(monster, hero); }
}