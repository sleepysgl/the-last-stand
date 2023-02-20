const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Accumulate milli-second values(starts at 0)
let timeToNextZombie = 0;
//A value in milli-seconds, resets and triggers next zombie when time is reached
let zombieInterval = 1300;
//Holds value of timestamp from previous loop
let lastTime = 0;

let zombies = [];
class Zombie {
    //Creates one blank object everytime its called with assigned properties
    constructor() {
        //Zombie frame
        this.zombieWidth = 96;
        this.zombieHeight = 96;
        this.width = this.zombieWidth/1;
        this.height = this.zombieHeight/1;
        //Spawn from right to left 
        this.x = canvas.width;
        //Horizontal spawn position, random number between 0 and canvas height
        this.y = Math.random() * (canvas.height - this.height);
        //Random horizontal speed
        this.directionX = Math.random() * 0.2 + 0.2;
        //Random vertical speed
        this.directionY = Math.random() * 0.5 - 0.5;
        this.deleteZombie = false;
        this.image = new Image();
        this.image.src = 'Images/Zombie/Walk1.png';
        //Random gets last frame of enemy img since it's inverted
        this.frame = 8;
        //Starts frame animation from right to left
        this.maxFrame = 1;
        this.timeSinceWalk = 0;
        //Random animation speed of zombie walk
        this.walkInterval = Math.random() * 100 + 100 
    }
    //Moves zombies
    update(deltatime){
        //Prevents enemies from going out of bounds in y axis
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
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

let zombiesTwo = [];
class ZombieTwo {
    constructor (){
        this.zombieWidth = 96;
        this.zombieHeight = 96;
        this.width = this.zombieWidth/1;
        this.height = this.zombieHeight/1;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 0.3 + 0.3;
        this.directionY = Math.random() * 0.5 - 0.5;
        this.deleteZombie = false;
        this.image = new Image();
        this.image.src = 'Images/Zombie/Walk2.png';
        this.frame = 8;
        this.maxFrame = 1;
        this.timeSinceWalk = 0;
        this.walkInterval = Math.random() * 100 + 100 
    }
    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.deleteZombie = true;
        this.timeSinceWalk += deltatime;
        if (this.timeSinceWalk > this.walkInterval){
            if (this.frame < this.maxFrame) this.frame = 4;
            else this.frame--;
            this.timeSinceWalk = 0;
            
        }
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        //source.i, source.x, source.y, source.w, source.h, dest.x, dest.y, dest.w, dest.h)
        ctx.drawImage(this.image, this.frame * this.zombieWidth, 0, 
            this.zombieWidth, this.zombieHeight, this.x, this.y, this.width, this.height);
    }
}
let zombiesThree = [];
class ZombieThree {
    constructor (){
        this.zombieWidth = 96;
        this.zombieHeight = 96;
        this.width = this.zombieWidth/1;
        this.height = this.zombieHeight/1;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 0.6 + 0.6;
        this.directionY = Math.random() * 0.5 - 0.5;
        this.deleteZombie = false;
        this.image = new Image();
        this.image.src = 'Images/Zombie/Run3.png';
        this.frame = 8;
        this.maxFrame = 1;
        this.timeSinceWalk = 0;
        this.walkInterval = Math.random() * 100 + 100 
    }
    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.deleteZombie = true;
        this.timeSinceWalk += deltatime;
        if (this.timeSinceWalk > this.walkInterval){
            if (this.frame < this.maxFrame) this.frame = 7;
            else this.frame--;
            this.timeSinceWalk = 0;
            
        }
    }
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
        zombiesTwo.push(new ZombieTwo());
        timeToNextZombie = 0;
        zombiesThree.push(new ZombieThree());
        timetoNextZombie = 0;
    }
    //Array literals and spread operator(...)
    //Cycles thru zombies[] and triggers update()
    [...zombies, ...zombiesTwo, ...zombiesThree].forEach(object => object.update(deltatime));
    [...zombies, ...zombiesTwo, ...zombiesThree].forEach(object => object.draw());
    //Takes zombies[] and deletes it, replaces it with the same contents in zombies[] but only with deleteZombie property set to false
    zombies = zombies.filter(object => !object.deleteZombie);
    zombiesTwo = zombiesTwo.filter(object => !object.deleteZombie);
    //console.log(zombies);
    //Creates endless animation loop
    requestAnimationFrame(animate);
}
animate(0);