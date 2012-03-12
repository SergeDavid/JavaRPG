var town = {
	Cake : {
		id : 0,
		name : "" 
	}
};

function handleTown() {
	switch (inputNumber) {
		case input.Cancel:
			gameState = state.World; menuPointer = 0; menuState = 0;
		break;
	};
};

function openTown() {
	if (map[loc.y][loc.x] == tile.Town) {
		gameState = "TOWN";
	}
};

function renderTown() {
	renderMap();
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.Menu;
	ctx.fillRect(20, 20, 360, 260);
	ctx.fillStyle = color.Text;
}
