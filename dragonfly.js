class Dragonfly {
    constructor(gridSize, ctx, xMax, yMax) {
        this.xPos = Math.floor(Math.random() * xMax) + 1;
        this.yPos = 1;
        this.gridSize = gridSize;
        this.ctx = ctx;
        this.yMax = yMax;

        this.image = document.getElementById('dragonfly');
    }

    paint() {
        this.ctx.drawImage(this.image, this.xPos * this.gridSize - this.gridSize - this.gridSize / 2, this.yPos * this.gridSize - this.gridSize);
    }

    move() {
        this.yPos++;

        if(Math.random() < .25) {
            spawnMushroom(this.xPos, this.yPos);
        }

        if(this.yPos > this.yMax) {
            removeEnemy(this);
        }
    }

    collidesWith(x, y) {
        return this.xPos == x && this.yPos == y;
    }
}