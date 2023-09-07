class Scorpion {
    constructor(gridSize, ctx, xMax, yMax) {
        this.xPos = Math.random() < .5 ? 1 : xMax;
        this.facingRight = this.xPos == 1;
        this.yPos = Math.floor(Math.random() * yMax / 2) + (yMax / 2);
        this.gridSize = gridSize;
        this.ctx = ctx;
        this.xMax = this.xMax;

        this.image = document.getElementById('scorpion');
    }

    paint() {
        this.ctx.drawImage(this.image, this.xPos * this.gridSize - this.gridSize - this.gridSize / 2, this.yPos * this.gridSize - this.gridSize);
    }

    move() {
        if(this.facingRight) {
            this.xPos++;
        }
        else {
            this.xPos--;
        }

        collidesWithMushrooms(this.xPos, this.yPos, true);
        
        if(this.xPos > this.xMax || this.xPos < 1) {
            removeEnemy(this);
        }
    }

    collidesWith(x, y) {
        return this.xPos == x && this.yPos == y;
    }
}