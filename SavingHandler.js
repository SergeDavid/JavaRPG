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
    //GameData = MyLvL+"="+MyHP+"="+MaxHP+"="+MyExp+"="+MyAP+"="+MyStr+"="+MyDex+"="+MyAgi+"="+Gold+"="+Potion+"="+BuyAP+"="+WepName+"="+WepCost+"="+WepSell+"="+WepPlus+"="+ArmName+"="+ArmCost+"="+ArmSell+"="+ArmPlus+"="+MyH+"="+MyW+"="+MapType+"="+Keys[0]+"="+Keys[1]+"="+Keys[2]+"="+Keys[3]+"="+Keys[4]+"="+Keys[5]+"="+Keys[6]+"="+Keys[7]+"="+Keys[8]+"="+Keys[9]+"="+Keys[10]+"="+BattleSpeed+"="+MyBody.src+"="+EmyBonus+"="+ValidCookie;
    GameData = 
    	gameVersion + "," +
    	hero.level + "," +
    	hero.health;
    
    try {
    	document.cookie = "gameData="+GameData+";path=/;expires="+expireDate.toGMTString();
    }
    catch (err) {
    	//TODO: Error message about not being able to save a cookie.
    }	
}

function loadGame() {
	var cookieVersion2 = "0.0.2";//TODO: Remove this with the version saved in the cookie
	//Maybe add a cookieVersion to GameEngine so that gameVersions that can support the same save file can work together.
	if (cookieVersion === cookieVersion2) {
		//TODO: Transfer the strings data into the different variables.
	}
	else {
		//TODO Save File is broken.
	}
}
