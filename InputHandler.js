var input = {
	Up : 38,
	Down : 40,
	Left : 37,
	Right : 39,
	Enter : 65,//A
	Cancel : 83//S
}

//Pointer is current option in the menu it is pointing at
var menuPointer = 0;
//This is the currect layer of the menu, such as TitleScreen(0) and AboutGame(1) for the Title
var menuState = 0;
//The last button you pressed, used as "switch (inputNumber) {case input.Enter: break;}"
var inputNumber = 0;

function inputHandler() {
	switch (gameState) {
		case state.Town : handleTown(); break;
		case state.Title : handleTitle(); break;
		case state.World : handleWorld(); break;
		case state.Battle : handleBattle(); break;	
		case state.Menu : handleMenu(); break;
		case state.Won :
		case state.Lost : handleEndGame(); break;
	}
}
