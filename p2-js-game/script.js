const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Accumulate milli-second values(starts at 0)
let timeToNextZombie = 0;
//A value in milli-seconds, resets and triggers next zombie when time is reached
let zombieInterval = 500;
//Holds value of timestamp from previous loop
let lastTime = 0;

let zombies = [];
class Zombie {
    //Creates one blank object everytime its called with assigned properties
    constructor() {
        //Zombie frame
        this.zombieWidth = 96;
        this.zombieHeight = 96;
        this.width = this.zombieWidth/2;
        this.height = this.zombieHeight/2;
        //Spawn from right to left 
        this.x = canvas.width;
        //Horizontal spawn position, random number between 0 and canvas height
        this.y = Math.random() * (canvas.height - this.height);
        //Random horizontal speed
        this.directionX = Math.random() * 0.5 + 0.5;
        //Random vertical speed
        this.directionY = Math.random() * 0.5 - 0.5;
        this.deleteZombie = false;
        this.image = new Image();
        this.image.src = 'Images/Zombie/Walk.png';
        //Random gets last frame of enemy img since it's inverted
        this.frame = 4;
        //Starts frame animation from right to left
        this.maxFrame = 1;
        this.timeSinceWalk = 0;
        //Random animation speed of zombie walk
        this.walkInterval = Math.random() * 75 + 75 
    }
    //Moves zombies
    update(deltatime){
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.deleteZombie = true;
        //Interval of frames per milli-second
        this.timeSinceWalk += deltatime;
        //Loops thru frames of img
        if (this.timeSinceWalk > this.walkInterval){
            if (this.frame < this.maxFrame) this.frame = 4;
            else this.frame--;
            this.timeSinceWalk = 0;
        }
    }
    //Represents a single zombie object
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        //source.i, source.x, source.y, source.w, source.h, dest.x, dest.y, dest.w, dest.h)
        ctx.drawImage(this.image, this.frame * this.zombieWidth, 0, 
            this.zombieWidth, this.zombieHeight, this.x, this.y, this.width, this.height);
    }
}
//Animation loop
function animate (timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //A value that calculates frames in milli-seconds
    let deltatime =  timestamp - lastTime;
    lastTime = timestamp;
    timeToNextZombie += deltatime;
    //Pushes a new zombie when 0 reaches 500 milli-seconds in deltatime
    if (timeToNextZombie > zombieInterval){
        zombies.push(new Zombie());
        timeToNextZombie = 0;
    };
    //Array literals and spread operator(...)
    //Cycles thru zombies[] and triggers update()
    [...zombies].forEach(object => object.update(deltatime));
    [...zombies].forEach(object => object.draw());
    //Takes zombies[] and deletes it, replaces it with the same contents in zombies[] but only with deleteZombie property set to false
    zombies = zombies.filter(object => !object.deleteZombie);
    //console.log(zombies);
    //Creates endless animation loop
    requestAnimationFrame(animate);
}
animate(0);