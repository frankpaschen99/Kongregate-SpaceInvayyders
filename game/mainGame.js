// todo: asteroids, upgrades, health bars, meme bar,

var mobCount = 0;
var grossMobCount = 0;
var score = 0;
var level = 0;
var memePoints = 0;
var memePointsNeeded = 100;	// 100 for first upgrade
var MainGame = function () {};
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
		this.damageToGive = 20;	// increased with upgrades
		this.upgradeLevel = 1;
	}
	update(deltaTime) {
		// window borders for sprite
		if (this.sprite.x < 0) this.sprite.x = 1;
		else if (this.sprite.x > 538) this.sprite.x = 537;
		
		var speed = 0.25 * deltaTime;
		
		// if-elif here so they cant use A and D simultaneously
		if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			this.sprite.x -= speed;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.sprite.x += speed;
		}
		if (memePoints >= memePointsNeeded) {
			this.upgrade();
		}
	}
	fire(deltaTime)  {
		bh.addPlayerBullet(new PlayerBullet(this.sprite.x, this.sprite.y));
	}
	damage(amount) {
		game.sound.play('hitmarker', 0.1, false);
		this.hp -= amount;
		if (this.hp <= 0) this.die();
	}
	die() {
		// Game over
		game.sound.play('sad', 0.06, true);
		console.log("Game over!");
		this.sprite.destroy();
	}
	getSprite() {
		return this.sprite;
	}
	getDamage() {
		return this.damageToGive;
	}
	upgrade() {
		this.upgradeLevel++;
		memePointsNeeded *= 5;
	}
	getUpgradeLevel() {
		return this.upgradeLevel;
	}
}
class LevelCreator {
	constructor() {
		this.mobs = [];
		this.asteroids = [];
		this.spawnMobs();	// start level 1;
		this.lastTime = 0;
		this.lastTimeAsteroids = 0;
		this.firstSpawn = true;
		this.style = { font: "32px Arial", fill: "#00FF00", wordWrap: true, wordWrapWidth: 0, align: "center", backgroundColor: "" };
		this.text = game.add.text(250, 25, "Bitcoins: " + score, this.style);
	}
	spawnMobs() {	// called after a level is completed
		if (!this.firstSpawn) level++;
		var numToSpawn = Math.floor(Math.random() * 2) + Math.ceil((score / 5)) + level;
		var variation;
		if (score > 5) {
			if (Math.floor(Math.random() * 3) == 1) variation = 'ayy';
			else variation = 'ufo';
		} else {
			variation = 'ayy';
		}
		for (var i = 0; i < numToSpawn / 2; i++) this.mobs.push(new Enemy(Math.floor(Math.random() * 537), Math.floor(Math.random() * 200), 100, variation, grossMobCount, Math.random() * (2 - 0.25) + 0.25));
		var opposite = variation == 'ayy' ? 'ufo' : 'ayy';
		for (var i = numToSpawn / 2; i < numToSpawn; i++) this.mobs.push(new Enemy(Math.floor(Math.random() * 537), Math.floor(Math.random() * 200), 100, opposite, grossMobCount, Math.random() * (2 - 0.25) + 0.25));
		this.firstSpawn = false;
	}
	update(deltaTime) {
		if (mobCount == 0) {
			level++;
			this.spawnMobs();
		}
		if (game.time.now - this.lastTime > Math.floor(Math.random() * 10000 || this.lastTime == 0)) {
			if (this.mobs.length > 0) this.mobs[Math.floor(Math.random() * (this.mobs.length))].shoot();
			this.lastTime = game.time.now;
		}
		if (game.time.now - this.lastTimeAsteroids > 2500 || this.lastTimeAsteroids == 0) {
			this.asteroids.push(new Asteroid(Math.floor(Math.random() * 537)));
			this.lastTimeAsteroids = game.time.now;
		}
		
		for (var i = 0; i < this.mobs.length; i++) this.mobs[i].update(deltaTime);
		for (var i = 0; i < this.asteroids.length; i++) this.asteroids[i].update(deltaTime);
	}
	returnMobsArray() {
		return this.mobs;
	}
	drawScore() {
		
		this.text.setText("Bitcoins: " + score)
	}
	removeFromArray(obj) {
		var index = this.mobs.indexOf(obj);
		if (index > -1) {
			this.mobs.splice(index, 1);
		}
	}
}
// EnemyBullet and PlayerBullet will both be added to the BulletHandler 
class EnemyBullet {
	constructor(posX, posY, scale) { 
		this.sprite = game.add.sprite(posX, posY, 'enemy_meme');
		this.sprite.lifespan = 10000; // 5 seconds then remove it
		this.sprite.scale.setTo(scale, scale);
	}
	update(deltaTime) {
		this.sprite.y += 0.5*deltaTime;
		this.sprite.tint = Math.random() * 0xffffff;
	}
	
}
class PlayerBullet {
	constructor(posX, posY) {
		this.sprite = game.add.sprite(posX+31, posY, 'player_laser');
		this.sprite.lifespan = 15000;
	}
	update(deltaTime) {
		this.sprite.y -= 1*deltaTime;
	}
	getSprite() {
		return this.sprite;
	}
	destroy() {
		this.sprite.destroy();
	}
}
class BulletHandler {
	constructor() {
		this.playerBullets = [];
		this.enemyBullets = [];
	}
	update(deltaTime) {
		
		/* PlayerBullet collision with Enemies */
		for (var i = 0; i < this.playerBullets.length; i++) {
			this.playerBullets[i].update(deltaTime);

			for (var j = 0; j < lc.returnMobsArray().length; j++) {
				if (typeof this.playerBullets[i] == "undefined") this.playerBullets[i] = new PlayerBullet(-100, 0);
				if (Phaser.Rectangle.intersects(this.playerBullets[i].sprite.getBounds(), lc.returnMobsArray()[j].sprite.getBounds())) {
					this.playerBullets[i].destroy();
					this.removeFromPlayerBullets(this.playerBullets[i]);
					lc.returnMobsArray()[j].damage(player.getDamage(), lc.returnMobsArray()[j]);
				}
			}
		}
		/* EnemyBullet collision with Player */
		for (var i = 0; i < this.enemyBullets.length; i++) {
			// if (typeof this.enemyBullets[i] == "undefined") this.enemyBullets[i] = new EnemyBullet(-100, 0);
			this.enemyBullets[i].update(deltaTime);
			if (Phaser.Rectangle.intersects(this.enemyBullets[i].sprite.getBounds(), player.getSprite().getBounds())) {
				this.enemyBullets[i].sprite.destroy();
				this.removeFromEnemyBullets(this.enemyBullets[i]);
				player.damage(7);
			}
		}
	}
	addPlayerBullet(bullet) {
		this.playerBullets.push(bullet);
	}
	addEnemyBullet(bullet) {
		this.enemyBullets.push(bullet);
	}
	removeFromPlayerBullets(obj) {
		var index = this.playerBullets.indexOf(obj);
		if (index > -1) {
			this.playerBullets.splice(index, 1);
		}
	}
	removeFromEnemyBullets(obj) {
		var index = this.enemyBullets.indexOf(obj);
		if (index > -1) {
			this.enemyBullets.splice(index, 1);
		}
	}
}
class Enemy {
	constructor(posX, posY, hp, variation, id, scale) {
		this.hp = (hp * scale) / 0.75;
		this.variation = variation;
		this.sprite = game.add.sprite(posX, posY, variation);	// x, y, 'ufo' or 'ayy'
		this.sprite.tint = Math.random() * 0xffffff;
		this.sprite.scale.setTo(scale, scale);
		this.movingLeft = false;
		this.id = id;
		this.scale = scale;
		mobCount++;
		grossMobCount++;
	}
	update(deltaTime) {
		if (!this.movingLeft) this.sprite.x--; else this.sprite.x++;
		if (this.sprite.x < 0) this.movingLeft = true;
		if (this.sprite.x > 548) this.movingLeft = false;
	}
	shoot() {
		// console.log("Enemy [id " + this.id + "] fired.");
		bh.addEnemyBullet(new EnemyBullet(this.sprite.x + this.sprite.getBounds().width / 2, this.sprite.y, this.scale));
	}
	damage(hp, obj) {
		game.sound.play('hitmarker', 0.1, false);
		this.hp -= hp;
		if (this.hp <= 0) this.die(obj);
	}
	die(obj) {
		game.sound.play('explosion', 0.06, false);
		this.sprite.destroy();
		lc.removeFromArray(obj);
		mobCount--;
		score++;
		memePoints += 33.4;
		lc.drawScore();
	}
}
class Asteroid {
	constructor(posX) {
		// this.sprite = game.add.sprite(posX, 0, 'asteroid');
	}
	update(deltaTime) {
		// this.sprite.y += 0.2*deltaTime;
	}
}
var player;
var lc;
var bh;
MainGame.prototype = {
    create: function () {
		var backdrop = game.add.sprite(0, 0, 'scene_backdrop');
		lc = new LevelCreator();
		player = new Player(0, 0);
		bh = new BulletHandler();
		this.lastTime = 0;
    },
    update: function () {
		player.update(game.time.elapsed);
		lc.update(game.time.elapsed);
		bh.update(game.time.elapsed);
    }
};