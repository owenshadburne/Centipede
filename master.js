let canvas, ctx;
let gridSize = 25, xMax = 28, yMax = 36;
let player;
let mushrooms = [], centipedes = [], enemies = [], bullets = [];
let ticks = 0, moveOnTick = 10;


window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

    player = new Player(gridSize, ctx, xMax, yMax);
    spawnMushrooms();
    spawnEnemies();

    requestAnimationFrame(mainLoop);
});

function spawnMushrooms() {
    for(let x = 1; x < xMax; x++) {
        for(let y = 1; y < yMax - 3; y++) {
            if(Math.random() < .1) {
                let mush = new Mushroom(x, y, gridSize, ctx);
                //mush.setPoison();
                mushrooms.push(mush);
            }
        }
    }
}
function spawnMushroom(x, y) {
    for(let i = 0; i < mushrooms.length; i++) {
        if(mushrooms[i].xPos == x && mushrooms[i].yPos == y) {
            return;
        }
    }
    
    mushrooms.push(new Mushroom(x, y, gridSize, ctx));
}
function spawnBullet(x, y) {
    bullets.push(new Bullet(x - 1, y - 1, gridSize, ctx));
}
function spawnEnemies() {
    refreshLists();
    centipedes.push(new Centipede(1, 1, gridSize, ctx, xMax, yMax));
    enemies.push(new Dragonfly(gridSize, ctx, xMax, yMax));
    enemies.push(new Scorpion(gridSize, ctx, xMax, yMax));
}

function newCentipede(x, y, length) {
    centipedes.push(new Centipede(x, y, gridSize, ctx, xMax, yMax, length));
}
function removeMushroom(m) {
    mushrooms.splice(mushrooms.indexOf(m), 1);
}
function removeCentipede(c) {
    centipedes.splice(centipedes.indexOf(c), 1);
}
function removeEnemy(e) {
    enemies.splice(enemies.indexOf(e), 1)
}

function refreshLists() {
    for(let i = 0; i < bullets.length; i++) {
        if(bullets[i].isOffscreen()) {
            bullets.splice(i, 1);
        }
    }
}


function collidesWithMushrooms(x, y, isScorpion, thisCentipede) {
    for(let i = 0; i < mushrooms.length; i++) {
        if(mushrooms[i].collidesWith(x, y)) {
            if(isScorpion) { mushrooms[i].setPoison(); }
            if(thisCentipede != null && mushrooms[i].poison) { thisCentipede.setPoisoned(); }
            return true;
        }
    }

    return false;
}
function collidesWithCentipede(x, y) {
    for(let i = 0; i < centipedes.length; i++) {
        if(centipedes[i].collidesWith(x, y)) {
            return true;
        }
    }

    return false;
}
function collidesWithBullet(x, y) {
    for(let i = 0; i < bullets.length; i++) {
        if(bullets[i].collidesWith(x, y)) {
            bullets.splice(i, 1);
            return true;
        }
    }

    return false;
}


//#region paint
function mainLoop() {
    repaint();
    ticks++;
    requestAnimationFrame(mainLoop);
}

function repaint() {
    background();
    player.paint();
    for(let x = 0; x < mushrooms.length; x++) {
        let mush = mushrooms[x];
        mush.checkHit();
        mush.paint();
    }
    for(let x = 0; x < bullets.length; x++) {
        if(ticks % 2 == 0) { bullets[x].move(); }
        bullets[x].paint();
    }
    for(let x = 0; x < centipedes.length; x++) {
        let centi = centipedes[x];
        centi.checkHit();
        if(ticks > moveOnTick) { centi.move(); }
        centi.paint();
    }
    for(let x = 0; x < enemies.length; x++) {
        let enemy = enemies[x];
        if(ticks > moveOnTick) { enemy.move(); }
        enemy.paint();
    }

    refreshLists();

    if(ticks > moveOnTick) {
        ticks = 0;
    }
}

function background() {
    ctx.beginPath();
    ctx.rect(0, 0, 700, 900);
    ctx.fillStyle = "black";
    ctx.fill();
}
//#endregion
