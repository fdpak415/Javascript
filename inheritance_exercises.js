Function.prototype.inherits = function(parent) {
  function Surrogate () {}
    Surrogate.prototype = parent.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
};

function MovingObject (name) {
  this.name = name;
};

MovingObject.prototype.fly = function() {
  console.log(this.name + " is flying");
}

function Asteroid (name) {
  MovingObject.call(this, name);
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.collide = function() {
  console.log(this.name + " collides");
}

const mO = new MovingObject("moving object");
mO.fly();

const A = new Asteroid("astro");
A.fly();
A.collide();
