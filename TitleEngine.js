/* This file handles everything to do with gameState = state.Title || "TITLE"
 * @arthor Serge-David */

function handleTitle() {
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
}

function renderTitle() {
	renderBackground(0,0);
	ctx.font = font.Large;
	if (menuState == 0) {
		ctx.fillStyle = color.MenuSelect;
		switch (menuPointer) {//400
			case 0: ctx.fillRect(110, 140, 180, 40);break;
			case 1: ctx.fillRect(110, 180, 180, 40);break;
			case 2: ctx.fillRect(110, 220, 180, 40);break;	
		}
		ctx.fillStyle = color.Text;
		ctx.fillText(" New Game", 136, 150);
		ctx.fillText("  Continue", 140, 190);
		ctx.fillText("   About", 150, 230);
	}
	else {
		ctx.font = font.Small;
		ctx.fillStyle = color.Text;
		ctx.fillText("My goal is making a Canvas & Javascript game", 28, 120);
		ctx.fillText("This started as a pokemon red / blue emulator", 28, 136);
		ctx.fillText("However making it faithful became boring", 28, 152);
		ctx.fillText("So I decided to just make an rpg game for fun", 28, 168);
		ctx.fillText('\\    //\\    //  ==||==  ||\\\\  ||', 80, 190);
		ctx.fillText(' \\  //  \\  //       ||      || \\\\ ||', 80, 204);
		ctx.fillText('  \\//    \\//    ==||==  ||  \\\\||', 80, 218);
	}
	ctx.font = font.Small;	
	ctx.fillText("Created by Serge-David", 6, 280);
	ctx.fillText("Version : " + gameVersion, 300, 280);
};