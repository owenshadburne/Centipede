class Centipede {
    constructor(xPos, yPos, gridSize, ctx, xMax, yMax, body) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.gridSize = gridSize;
        this.ctx = ctx;
        this.xMax = xMax;
        this.yMax = yMax;
        this.radius = gridSize / 2;

        this.poisoned = false;
        this.isLeft = Math.random() < .5 ? false : true;
        this.isDown = true;
        if(body == null) { 
            this.length = Math.floor(Math.random() * 5) + 2;
            this.body = [];
        }
        else {
            this.length = body.length;
            this.body = body;
        }
    }

    paint() {
        if(this.length < 0) { return; }
        this.draw(this.xPos, this.yPos, true);
        for(let i = 0; i < this.body.length; i++) {
            let b = this.body[i];
            this.draw(b.x, b.y);
        }
    }
    draw(x, y, isFace) {
        this.ctx.beginPath();
        this.ctx.arc(x * this.gridSize - this.radius, y * this.gridSize - this.radius, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = isFace ? "red" : "green";
        this.ctx.closePath();
        this.ctx.fill();
    }

    move() {   
        if(this.length < 0) { return; }
        this.body.push(new pair(this.xPos, this.yPos));
        if(!this.poisoned) { this.moveX(); }
        else { this.movePoisoned(); }
        this.reloadBody();
    }
    moveX() {
        if(this.isLeft) {
            if(this.xPos > 1  && !collidesWithMushrooms(this.xPos - 1, this.yPos, false, this)
            && !collidesWithCentipede(this.xPos - 1, this.yPos)) {
                this.xPos--;
            }
            else{
                this.isLeft = false;
                this.moveY();
            }
        }
        else {
            if(this.xPos < this.xMax && !collidesWithMushrooms(this.xPos + 1, this.yPos, false, this) 
            && !collidesWithCentipede(this.xPos + 1, this.yPos)) {
                this.xPos++;
            }
            else {
                this.isLeft = true;
                this.moveY();
            }
        }
    }
    moveY() {
        if(this.poisoned) {
            this.movePoisoned();
        }
        else if(this.isDown) {
            if(this.yPos < this.yMax) {
                this.yPos++;
            }
            else {
                this.isDown = false;
                this.yPos--;
            }
        }
        else {
            if(this.yPos > yMax - 5) {
                this.yPos--;
            }
            else {
                this.isDown = true;
                this.yPos++;
            }
        }
    }
    movePoisoned() {
        if(this.isLeft && this.xPos > 1) {
            this.xPos--;
            this.isLeft = false;
        }
        else if(!this.isLeft && this.xPos < xMax) {
            this.xPos++;
            this.isLeft = true;
        }
        if(this.yPos < this.yMax) {
            this.yPos++;
        }
        else {
            this.poisoned = false;
            this.isDown = false;
            this.yPos--;
        }
    }

    checkHit() {
        if(collidesWithBullet(this.xPos, this.yPos)) {
            this.length--;
            spawnMushroom(this.xPos, this.yPos);
            if(this.length < 0) {
                removeCentipede(this);
                return;
            }
            this.xPos = this.body[this.body.length - 1].x;
            this.yPos = this.body[this.body.length - 1].y;
            this.body.splice(this.body.length - 1, 1);
            this.reloadBody();
        }
        for(let i = 0; i < this.body.length; i++) {
            let b = this.body[i];
            if(collidesWithBullet(b.x, b.y)) {
                if(i == 0) {
                    this.length--;
                    this.body.splice(0, 1);
                    this.reloadBody();
                }
                else {
                    let newBody = this.body.slice(0, i - 1);
                    let newHead = this.body[i - 1];

                    this.body.splice(0, i + 1);
                    this.length = this.body.length;
                    newCentipede(newHead.x, newHead.y, newBody);
                }

                spawnMushroom(b.x, b.y);
            }
        }
    }

    reloadBody() {
        while(this.body.length > this.length) {
            this.body.shift();
        }

        let str = "";
        for(let i = 0; i < this.body.length; i++) {
            str += "(" + this.body[i].x + ", " + this.body[i].y + "), ";
        }
        //console.log(this.xPos + ", " + this.yPos + " || " + str);
    }

    collidesWith(x, y) {
        if(this.xPos == x && this.yPos == y) {
            return true;
        }
        for(let i = 0; i < this.body.length; i++) {
            if(this.body[i].x == x && this.body[i].y == y) {
                return true;
            }
        }

        return false;
    }

    setPoisoned() {
        this.poisoned = true;
    }
}

class pair {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}