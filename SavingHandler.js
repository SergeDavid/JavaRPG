var saveSeperator = ",";

function saveGame() {
	var expireDate=new Date();//Experation date of cookie
    expireDate.setMonth(expireDate.getMonth()+1);//Makes the cookie expire 1 month from now
    
    gameData = cookieVersion + saveSeperator;
    gameData += saveHero();
    gameData += saveInventory();
    gameData += saveSettings();
   
    try {
    	document.cookie = "gameData="+gameData+"; path=/;expires="+expireDate.toGMTString();
    }
    catch (err) {
    	debugMessage("Unable to save game :" + err);
    }	
}

function saveHero() {
	var str = "";
	str += hero.level + saveSeperator;
	str += hero.health + saveSeperator;
	str += hero.maxHealth + saveSeperator;
	str += hero.mana + saveSeperator;
	str += hero.maxMana + saveSeperator;
	str += hero.exp + saveSeperator;
	str += hero.strength + saveSeperator;
	str += hero.dexterity + saveSeperator;
	str += hero.agility + saveSeperator;
	str += hero.ap + saveSeperator;
	str += hero.gold + saveSeperator;
	
	str += loc.x + saveSeperator;
	str += loc.y + saveSeperator;
	return str;
	//TODO: Save the players map location (starting level, 2nd level, etc)
	//And save where the player exitted out of (start level -> cave)
	//When randomly generating the worlds when continuing a game, this is where the player will spawn at
	//Or I could just save all the world data, but that might become a very large cookie
}

function saveInventory() {
	var str = "";
	for (var i = 0; i < items.length; i++) {
		str += items[i].id + saveSeperator;
		str += items[i].quantity + saveSeperator;
	}
	return str;
}

function saveSettings() {
	var str = "";
	str += gameInfo.startTime + saveSeperator;
	str += gameInfo.speed + saveSeperator;
	str += gameInfo.kills + saveSeperator;
	str += gameInfo.runs + saveSeperator;
	str += gameInfo.heals + saveSeperator;
	str += gameInfo.magicBackfires;
	return str;
	//TODO: I also need to save boss progress here along with optional bosses.
}

function loadGame() {
	var cocky = document.cookie.split('; ');//Splits the cookie up
	cocky = cocky[3].split("=");//Cheap way of grabbing the gameData part
	if (cocky[0] =! "gameData") {debugAlert("No Save Found!");}
	else {
		cocky = cocky[1].split(",");
		if (cocky[0] != cookieVersion) {debugAlert("Save Corrupted!");}	
		else {
			debugAlert("I can't let you do that Dave.");
		}
	}
}