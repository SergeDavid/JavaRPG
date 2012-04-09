var saveSeperator = ",";

function saveGame() {
	var expireDate=new Date();//Experation date of cookie
    expireDate.setMonth(expireDate.getMonth()+1);//Makes the cookie expire 1 month from now
    
    /*TODO: Create a string containing... (gameVersion, playerName, numberVariales)
     * gameVersion (0.0.2) //Every version can only use its own save file
     * playerName (Serge) //I feel like letting people name their character... maybe
     * numberVariables (hero.level, game.speed, loc.x) //All of the important things that need to be saved 
     * Things not to save include inputNumber, gameState, menuPointer, etc. (You'll always start in state.World without a menu open)
     * TODO: Find a way to encode the numberVariables part to make it shrink (255 -> ff kind of thing)
    */
    gameData = gameVersion + saveSeperator;
    gameData += saveHero();
    gameData += saveInventory();
   
    try {
    	document.cookie = "gameData="+gameData+";path=/;expires="+expireDate.toGMTString();
    }
    catch (err) {
    	//TODO: Error message about not being able to save a cookie.
    }	
}

function saveHero() {
	var string = "";
	string += hero.level + saveSeperator;
	string += hero.health + saveSeperator;
	string += hero.maxHealth + saveSeperator;
	string += hero.mana + saveSeperator;
	string += hero.maxMana + saveSeperator;
	string += hero.exp + saveSeperator;
	string += hero.strength + saveSeperator;
	string += hero.dexterity + saveSeperator;
	string += hero.agility + saveSeperator;
	string += hero.ap + saveSeperator;
	string += hero.gold + saveSeperator;
	
	string += loc.x + saveSeperator;
	string += loc.y + saveSeperator;
	return string;
}

function saveInventory() {
	var string = "";
	/*for (int i = 0; i < items.size(); i++) {
		string += items[0].id + saveSeperator;
		string += items[0].quantity + saveSeperator;
	}*/
	return string;
}

function loadGame() {
	if (cookieVersion == cookieVersion) {
		//TODO: Transfer the strings data into the different variables.
	}
	else {
		//TODO Save File is broken.
	}
}