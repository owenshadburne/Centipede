class Mushroom {
    constructor(xPos, yPos, gridSize, ctx) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.gridSize = gridSize;
        this.ctx = ctx;

        this.hits = 0;
        this.poison = false;
        this.m0 = document.getElementById('mushroom');
        this.m1 = document.getElementById('mushroom1');
        this.m2 = document.getElementById('mushroom2');
        this.m3 = document.getElementById('mushroom3');
        this.pm0 = document.getElementById('poisonmushroom');
        this.pm1 = document.getElementById('poisonmushroom1');
        this.pm2 = document.getElementById('poisonmushroom2');
        this.pm3 = document.getElementById('poisonmushroom3');
    }

    paint() {
        let image = this.m0;
        if(this.poison) {
            if(this.hits == 0)
                image = this.pm0;
            else if(this.hits == 1)
                image = this.pm1;
            else if(this.hits == 2)
                image = this.pm2;
            else if(this.hits == 3)
                image = this.pm3;
        }
        else {
            if(this.hits == 1)
                image = this.m1;
            else if(this.hits == 2)
                image = this.m2;
            else if(this.hits == 3)
                image = this.m3;
        }

        this.ctx.drawImage(image, this.xPos * this.gridSize - this.gridSize, this.yPos * this.gridSize - this.gridSize);
    }

    collidesWith(x, y) {
        return this.xPos == x && this.yPos == y;
    }
    setPoison() {
        this.poison = true;
    }

    checkHit() {
        if(collidesWithBullet(this.xPos, this.yPos)) {
            this.hits++;
            if(this.hits > 3) {
                removeMushroom(this);
            }
        }
    }
}