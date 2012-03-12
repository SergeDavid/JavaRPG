function handleEndGame() {
	gameState = state.Title;
	menuState = 0;	
	menuPointer = 0;
};

function renderLost() {
	renderImage(128+64, 0, 128, 100, 30);	
	//TODO: Add Menu
};

function renderWon() {
	renderImage(128+64, 0, 128, 100, 30);	
	//TODO add credit / stats scrolling stuff
};