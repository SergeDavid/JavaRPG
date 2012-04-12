/* This file handles everything to do with gameState = state.Battle || "BATTLE"
 * Logic is handled from battleTick()
 * Rendering is handled from renderBattle()
 * Inputs is handled from handleBattle()
 * 
 * @arthor Serge-David */

function battleTick(delta) {
	if (hero.nextTurn > 0) {
		hero.nextTurn--;
		monster.nextTurn--;
		if (monster.nextTurn <= 0) {
			battleBrain(monster);
			monster.nextTurn = 100;
		}
	}	
};

function randomBattle() {
	gameState = "BATTLE";
	hero.nextTurn = 1;
	monster = Object.create(entity);
	monster.exp = 15;
};

function handleBattle() {
	switch (inputNumber) {
		case input.Left:
			if (menuPointer > 0) {menuPointer--;} 
		break;
		case input.Right:
			if (menuPointer < 3) {menuPointer++;} 
		break;
		case input.Enter:
			if (hero.nextTurn <= 0) {
				switch (menuPointer) {
					case 0: entity.Attack(hero, monster); break;
					case 1: entity.Magic(0, hero, monster); break;
					case 2: entity.Heal(50, hero); break;
					case 3: entity.Run(); break;	
				};
				hero.nextTurn = 30;
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
	ctx.fillText("Hero: " + hero.nextTurn, 20, 180);
	ctx.fillText("Enmy: " + monster.nextTurn, 20, 200);
}

//Because one is the opposite of the other, I'm going to render them both at once since it's a 1 on 1 battle.
function renderStats(e1, e2) {
	ctx.fillStyle = color.Health;
	ctx.fillRect(184,20,(-184*(e1.health/e1.maxHealth)),18);
	ctx.fillRect(216,20,(184*(e2.health/e2.maxHealth)),18);
	
	ctx.fillStyle = color.Mana;
	ctx.fillRect(160,38,(-160*(e1.mana/e1.maxMana)),18);
	ctx.fillRect(240,38,(160*(e2.mana/e2.maxMana)),18);
    
    ctx.fillStyle = color.MenuBorder;
    ctx.beginPath();
    ctx.moveTo(190, 16);
    ctx.lineTo(210, 16);
    ctx.lineTo(240, 38);
    ctx.lineTo(240, 56);
    ctx.lineTo(160, 56);
    ctx.lineTo(160, 38);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = color.Text;
    ctx.fillText((e1.health/e1.maxHealth)*100 + "%", 120, 20);
    ctx.fillText((e1.mana/e1.maxMana)*100 + "%", 120, 40);
    ctx.fillText((e2.health/e2.maxHealth)*100 + "%", 260, 20);
    ctx.fillText((e2.mana/e2.maxMana)*100 + "%", 260, 40);
};
