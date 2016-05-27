var player;

var MainGame = function () {};
MainGame.prototype = {
    create: function () {
		var backdrop = game.add.sprite(0, 0, 'scene_backdrop');
		player = new Player(0, 0);
    },
    
    update: function () {
		player.update(game.time.elapsed);
    }
};

class Laser {
	constructor(posX, posY) {
		this.sprite = game.add.sprite(posX, posY, 'player_laser');
		this.fire();
	}
	fire() {
		this.sprite.y -= 100;
	}
}
class Player {
	constructor(posX, posY) {
		this.hp = 100;
		this.x = posX;
		this.y = (800-100) - posY;	// dont you love magic constants? its window height minus sprite height minus specified Y pos
		this.sprite = game.add.sprite(this.x, this.y, 'player_sprite');
		this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.space.onDown.add(v => {
			this.fire();
		}, this);
	}
	update(deltaTime) {
		// window borders for sprite
		if (this.sprite.x < 0) this.sprite.x = 1;
		else if (this.sprite.x > 538) this.sprite.x = 537;
		
		var speed = 0.25 * deltaTime;
		
		// if-elif here so they cant use A and D at same time
		if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.sprite.x -= speed;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.sprite.x += speed;
		}
	}
	fire(deltaTime)  {
		var s = new Laser(this.sprite.x, this.sprite.y);
		
	}
	damage(amount) {
		this.hp -= amount;
	}
	die() {
		// Game over
	}
}