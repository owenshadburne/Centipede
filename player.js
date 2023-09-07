class Player {
    constructor(gridSize, ctx, xMax, yMax) {
        this.gridSize = gridSize;
        this.ctx = ctx;
        this.xMax = xMax;
        this.yMax = yMax;
        this.image = document.getElementById('spaceship');

        this.xPos = Math.floor(this.xMax / 2);
        this.yPos = this.yMax - 1;
        this.radius = this.gridSize / 2;

        document.addEventListener('keydown', (event) => {
            let code = event.code;
            this.processCommand(code);
        }, false);
    }

    processCommand(code) {
        if(code == "KeyA" || code == "ArrowLeft") {
            if(this.xPos > 1 && !collidesWithMushrooms(this.xPos - 1, this.yPos)) { 
                this.xPos--; 
            }
        }
        else if(code == "KeyW" || code == "ArrowUp") {
            if(this.yPos > 1 && !collidesWithMushrooms(this.xPos, this.yPos - 1)) { 
                this.yPos--; 
            }
        }
        else if(code == "KeyD" || code == "ArrowRight") {
            if(this.xPos < xMax && !collidesWithMushrooms(this.xPos + 1, this.yPos)) { 
                this.xPos++;
            }
        }
        else if(code == "KeyS" || code == "ArrowDown") {
            if(this.yPos < yMax && !collidesWithMushrooms(this.xPos, this.yPos + 1)) { 
                this.yPos++; 
            }
        }
        else if(code == "Space") {
            spawnBullet(this.xPos, this.yPos);
        }
    }

    paint() {
        this.ctx.drawImage(this.image, this.xPos * this.gridSize - this.gridSize, this.yPos * this.gridSize - this.gridSize);
    }

    collidesWith(other) {
        return this.xPos == other.xPos && this.yPos == other.yPos;
    }
}