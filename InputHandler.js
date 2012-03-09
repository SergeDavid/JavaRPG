var input = {
	Up : 38,
	Down : 40,
	Left : 37,
	Right : 39,
	Enter : 65,//A
	Cancel : 83//S
}

function handleMenu() {
	switch (gameState) {
		case "TOWN": HandleTown(); break;
		case "TITLE": HandleTitle(); break;
		case "WORLD": HandleWorld(); break;
		case "BATTLE": HandleBattle(); break;	
		case state.Won:
		case state.Lost: HandleEndGame(); break;
	}
	if (inputNumber == input.Enter) {menuPointer = 0;}
}

function HandleEndGame() {
	gameState = state.Title;
	menuState = 0;	
};

function HandleTown() {
	switch (inputNumber) {
		case input.Cancel:
			gameState = state.World;
		break;
	};
};

function HandleTitle() {
	switch (inputNumber) {
		case input.Up: 
			if (menuPointer > 0) menuPointer--; 
		break;
		case input.Down: 
			if (menuPointer < 2) menuPointer++;
		break;
		case input.Cancel:
			if (menuState > 0) {menuState = 0;}
		break;//Open menu
		case input.Enter: 
			switch (menuState) {
				case 0:  
					switch (menuPointer) {
						case 0: newGame(); break;//New Game
						case 1: newGame(); break;//Continue
						case 2: menuState = 1; break;//New Menu
					}
				break;
				case 1:
					menuState = 0;
				break;
			}
		break;//Enter Town
	}	
};

function HandleWorld() {
	switch (inputNumber) {
		case input.Up: direction = 0; move(0); break;
		case input.Right: direction = 1; move(1); break;
		case input.Down: direction = 2; move(2); break;
		case input.Left: direction = 3; move(3); break;
		case input.Cancel:
			if (menuState > 0) {menuState = 0;}
			else {menuState = 1;} 
		break;//Open menu
		case input.Enter: openTown(); break;//Enter Town
	}
}
