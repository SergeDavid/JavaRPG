function handleWorld() {
	switch (inputNumber) {
		case input.Up: direction = 0; move(0); break;
		case input.Right: direction = 1; move(1); break;
		case input.Down: direction = 2; move(2); break;
		case input.Left: direction = 3; move(3); break;
		case input.Cancel:
			gameState = state.Menu;
		break;//Open menu
		case input.Enter: openTown(); break;//Enter Town
	}
}


function renderWorld() {
	renderMap();
	
	switch (direction) {
		case 0: renderImage(64, 0, 0 ,200-32, 150-32); break;
		case 1: renderImage(64, 64, 0 ,200-32, 150-32); break;
		case 2: renderImage(64, 0, 64 ,200-32, 150-32); break;
		case 3: renderImage(64, 64, 64 ,200-32, 150-32); break;
	}
	
	ctx.fillStyle = color.Text;
	ctx.fillText("Loc x : " + loc.x,32,32);
	ctx.fillText("Loc y : " + loc.y,32,64);
	
	if (map[loc.y][loc.x] == tile.Town)	{
		ctx.font = font.Large;
		ctx.fillText("Town", 200-20, 80);
		ctx.font = font.Medium;
		ctx.fillText("Press A", 200-20, 110);
		ctx.font = font.Small;
	}
}