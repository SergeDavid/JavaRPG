function battleTick(delta) {
	if (hero.nextturn > 0) {
		hero.nextturn--;
		monster.nextturn--;
		if (monster.nextturn <= 0) {
			battleBrain(monster);
			monster.nextturn = 100;
		}
	}	
};

function randomBattle() {
	gameState = "BATTLE";
	hero.nextturn = 1;
	monster = Object.create(entity);
	monster.exp = 15;
};

function HandleBattle() {
	switch (inputNumber) {
		case input.Left:
			if (menuPointer > 0) {menuPointer--;} 
		break;
		case input.Right:
			if (menuPointer < 3) {menuPointer++;} 
		break;
		case input.Enter:
			if (hero.nextturn <= 0) {
				switch (menuPointer) {
					case 0: attack(hero, monster); break;
					case 1: magic(hero, monster); break;
					case 2: heal(50, hero); break;
					case 3: run(); break;	
				};
				hero.nextturn = 30;
			};
		break;
	};
};

function renderBattle() {
	waiting = true;
	//TODO: Render effects such as attacking, damage, etc.
	renderStats(hero, monster);
	renderSprite(hero, 32, 96);
	if (monster.imgs == 192) {
		renderSprite(monster, 204, 60);	
	}
	else {
		renderSprite(monster, 240, 96);
	}
	renderBattleMenu();	
}

function renderBattleMenu() {
	ctx.fillStyle = color.MenuBorder;
	ctx.fillRect(0, 256, 400, 4);
	ctx.fillStyle = color.MenuSelect;
	switch (menuPointer) {//400
		case 0: ctx.fillRect( 10, 264, 80, 30);break;
		case 1: ctx.fillRect(110, 264, 80, 30);break;
		case 2: ctx.fillRect(210, 264, 80, 30);break;
		case 3: ctx.fillRect(310, 264, 80, 30);break;	
	}
	ctx.fillStyle = color.Text;
	ctx.font = font.Large;
	ctx.fillText("Attack", 18, 270);
	ctx.fillText("Magic", 118, 270);
	ctx.fillText("Item", 224, 270);
	ctx.fillText("Run", 328, 270);
	ctx.font = font.Small;
	ctx.fillText("Hero: " + hero.nextturn, 20, 180);
	ctx.fillText("Enmy: " + monster.nextturn, 20, 200);
}