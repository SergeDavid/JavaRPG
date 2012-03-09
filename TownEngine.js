var town = {
	Cake : {
		id : 0,
		name : "" 
	}
};

function openTown() {
	if (map[loc.y][loc.x] == tile.Town) {
		gameState = "TOWN";
	}
};

function leaveTown() {
	gameState = "WORLD";
};

function renderTown() {
	renderMap();
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(10, 10, 380, 280);
	ctx.fillStyle = color.Menu;
	ctx.fillRect(20, 20, 360, 260);
	ctx.fillStyle = color.Text;
}
