class Bullet {
    constructor(xPos, yPos, gridSize, ctx) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.gridSize = gridSize;
        this.ctx = ctx;
        this.bulletWidth = 5;
    }

    paint() {
        this.ctx.beginPath();
        this.ctx.rect(this.xPos * this.gridSize + (this.gridSize / 2) - (this.gridSize / this.bulletWidth / 2), this.yPos * this.gridSize, this.gridSize / this.bulletWidth, this.gridSize);
        this.ctx.fillStyle = "white";
        this.ctx.closePath();
        this.ctx.fill();
    }

    collidesWith(x, y) {
        return this.xPos + 1 == x && this.yPos == y;
    }

    move() {
        this.yPos--;
    }

    isOffscreen() {
        return this.yPos <= 0;
    }
}