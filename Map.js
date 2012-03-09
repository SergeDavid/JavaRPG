//0 = open, 1 = blocked, 2 = town
var mapW;
var mapH;
var map;
var tile = {
	Open: {
		id: 0,
		x: 0,//image x,y
		y: 448,
		block: false,
		top: false
	},
	Wall: {
		id: 1,
		x: 64,
		y: 448,
		block: true,
		top: false
	},
	TallGrass: {
		id: 3,
		x: 128,
		y: 448,
		block: false,
		top: true
	},
	Town: {
		id: 2,
		x: 192,
		y: 448,
		block: false,
		top: true
	}
};

function createMap(width, height) {
	//Create the array
	mapW = width;
	mapH = height;
	map = new Array(height);
	for (var i = 0; i < height; i++) {
		map[i] = new Array(width);
	}
	//Create the borders and sets the tiles
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			if ((x == 0 || x == width-1) || (y == 0 || y == height-1)) {
				map[y][x] = tile.Wall;
			}
			else {
				if (Math.floor(Math.random()*11) < 5) {
					map[y][x] = tile.TallGrass;	
				}
				else if (Math.floor(Math.random()*11) < 1) {
					map[y][x] = tile.Town;	
				}
				else {
					map[y][x] = tile.Open;
				}
			}
		}	
	}
}

function move() {
	switch (direction) {
		case 0:
			if (map[loc.y-1][loc.x].block == false) {loc.y--;}
		break;
		case 1:
			if (map[loc.y][loc.x+1].block == false) {loc.x++;}
		break;
		case 2:
			if (map[loc.y+1][loc.x].block == false) {loc.y++;}
		break;
		case 3:
			if (map[loc.y][loc.x-1].block == false) {loc.x--;}
		break;	
	}	
	if (map[loc.y][loc.x] == tile.TallGrass) {
		if (Math.floor(Math.random()*11) < 2) {// 10%
			randomBattle();
		}
	}
}
