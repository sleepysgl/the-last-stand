const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zombies = [];
class Zombie {
    //Creates one blank object everytime called with assigned properties
    constructor() {
        this.width = 100;
        this.height = 50;
        //Spawn from right to left 
        this.x = canvas.width;
        //Horizontal spawn position, random number between 0 and canvas height
        this.y = Math.random() * (canvas.height - this.height);
        //Random horizontal speed
        this.directionX = Math.random() * 5 + 3;
        //Random vertical speed
        this.directionY = Math.random() * 5 - 2.5;
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
    const zombie = new Zombie();
//Animation loop
function animate (timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    zombie.update();
    zombie.draw();
    //Creates endless animation loop
    requestAnimationFrame(animate);
}
animate();