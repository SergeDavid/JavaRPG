var enemies = {
	rat : {
		basehp : 5,//Base health every so levels?
		lvlhp : 0.5,//Possibly need a health modifier to work with basehp, of course going to randomize stuff along the way.
		//Or maybe have the multihp be the one that is updated every level so basehp + (level * multihp)
		//I'd also probably do the same with str, agi, dex
		gold : 0.0,//Multiplier based on level like below?
		exp : 0.0//level * exp = exp earned, so 2.5exp and level 10 would give 25 exp
	}	
}

function buildEnemy(enemy, level) {
	//Level and health (mana too later?)
	monster.level = level;
	monster.maxHealth = enemy.basehp + enemy.lvlhp * level;
	monster.health = monster.maxHealth;
	
	//Stats
	/* monster.strength = 0;
	 * monster.dexterity = 0;
	 * monster.agility = 0;
	 */
	
	//Loot
	monster.exp = enemy.exp * level;
	monster.gold = enemy.gold * level;
}
