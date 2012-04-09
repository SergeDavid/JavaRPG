entity = {
	maxHealth : 100,
	health : 100,
	
	maxMana : 20,
	mana : 10,
	
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
	
	imgx : 128, //image location on the grid
	imgy : 0,
	imgs : 128
}
var magic = {
	Heal: {
		id:0,
		name:"Heal",
		power:15,
		type:1,
		mana:10
	}
};

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

function actionAttack(e1, e2) {
	//TODO: Add miss / bonus / glance chance, weapons, etc.
	// Damage based on weapon and strength ()(e1.str * e1.effect.str + e1.wep.dmg)*e1.bonus) or something along those lines
	// effect = potions / spells modifier
	// bonus = crit (1.2), normal (1.0), glance (0.8)
	hurt(e1.strength, e2);		
};

function actionMagic(e1, e2) {
	//TODO: chance to hurt yourself if the spell backfires.
	hurt(e1.strength, e2);	
};

function actionHeal(dmg, e) {
	e.health+=dmg;
	if (e.health > e.maxHealth) {
		e.health = e.maxHealth;
	}
};

function actionRun() {
	//TODO: If boss battle, disable this
	gameState = state.World;
	
};

function hurt(dmg, e) {
	dmg -= e.dexterity;
	if (dmg < 1) {dmg = 1;}
	e.health -= dmg;
	if (e.health <= 0) {
		e.health = 0;
		die(e);
	}
};

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
	if (e === hero) {
		gameState = "LOST";
	}
	else {
		lootCorpse(e);
		gameState = "WORLD";
	}
};

function battleBrain(e) {
	if (e.health/e.maxHealth < e.healDesire && Math.floor(Math.random() * 11) < 3) {
		actionHeal(15, e);
	}
	else { actionAttack(monster, hero); }
}