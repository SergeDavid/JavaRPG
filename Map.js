//0 = open, 1 = blocked, 2 = town
var mapW;
var mapH;
var map;//TODO: Redesign the map to be about a 1/2 or 1/4th of the characters footprint, so then I can generate it in a more interesting fashion. 
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
		if (Math.rand(100) < battleChance) {
			randomBattle();
		}
	}
}

function renderMap() {
	var xoff = loc.x * 64 - 200 + 32;
	var yoff = loc.y * 64 - 150 + 32;
	for (var y = 0; y < mapH; y++) {
		for (var x = 0; x < mapW; x++) {
			if (map[y][x].top == true) {
				renderImage(64, tile.Open.x, tile.Open.y, x*64-xoff, y*64-yoff);	
			}
			renderImage(64, map[y][x].x, map[y][x].y, x*64-xoff, y*64-yoff);
		}
	}	
}
function renderMapNew() {
	var size = 64;
	var xoff = loc.x * size - 200 + size/2;
	var yoff = loc.y * size - 150 + size/2;
	for (var y = 0; y < mapH; y++) {
		for (var x = 0; x < mapW; x++) {
			if (map[y][x].top == true) {
				renderImage(size, tile.Open.x, tile.Open.y, x*size-xoff, y*size-yoff);	
			}
			renderImage(size, map[y][x].x, map[y][x].y, x*size-xoff, y*size-yoff);
		}
	}	
}
