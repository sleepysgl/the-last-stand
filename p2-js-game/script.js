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
        this.width = 100;
        this.height = 50;
        //Spawn from right to left 
        this.x = canvas.width;
        //Horizontal spawn position, random number between 0 and canvas height
        this.y = Math.random() * (canvas.height - this.height);
        //Random horizontal speed
        this.directionX = Math.random() * 0.5 + 0.5;
        //Random vertical speed
        this.directionY = Math.random() * 0.5 - 0.5;
    }
    //Moves zombies around
    update(){
        this.x -= this.directionX;
    }
    //Represents a single zombie object
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
    //Expands zombies array into another array, spawns zombies periodically
    [...zombies].forEach(object => object.update());
    [...zombies].forEach(object => object.draw());
    //Creates endless animation loop
    requestAnimationFrame(animate);
}
animate(0);