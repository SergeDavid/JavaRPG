entity = {
	maxHealth : 100,
	health : 100,
	
	maxMana : 20,
	mana : 10,
	
	exp : 0,//Player exp or how much monsters give.
	level : 1,
	ap : 0,
	
	gold : 10,
	nextTurn : 2,
	healDesire : 0.45,
	
	//Stats
	strength : 40,
	dexterity : 5,
	agility : 5,
	
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

function attack(e1, e2) {
	var dmg = e1.strength;
	hurt(dmg, e2);		
};

function magic(e1, e2) {
	var dmg = e1.strength;
	hurt(dmg, e2);	
};

function heal(dmg, e) {
	e.health+=dmg;
	if (e.health > e.maxHealth) {
		e.health = e.maxHealth;
	}
};

function run() {
	//TODO: If boss battle, disable this
	gameState = state.World;
	
};

function hurt(dmg, e) {
	dmg -= e.dexterity;
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
		heal(15, e);
	}
	else { attack(monster, hero); }
}
