var LoadGame = function () {};

LoadGame.prototype = {
        
	// Load various scripts required to play the game.
    loadScripts: function () {
        game.load.script('MainGame', 'js/game/mainGame.js');
        game.load.script('options', 'js/game/options.js');
    },
	
	// Add audio assets
    loadAudio: function () {
        game.load.audio('hitmarker', 'js/game/assets/sounds/sound_hitmarker.wav', true);
        game.load.audio('explosion', 'js/game/assets/sounds/sound_explosion.wav', true);
    },
    
	// Load various image, atlas resources 
    loadImages: function () {
		game.load.image('scene_backdrop', 'js/game/assets/ui/space_background.png');
		game.load.image('asteroid', 'js/game/assets/entities/asteroid.png');
		game.load.image('player_sprite', 'js/game/assets/actors/player_ship.png');
		game.load.image('player_laser', 'js/game/assets/entities/laser.png');
		game.load.image('enemy_meme', 'js/game/assets/entities/dankmeme.png');
		game.load.image('ufo', 'js/game/assets/actors/alien_ufo.png');
		game.load.image('ayy', 'js/game/assets/actors/alien_ayy.png');
		game.load.image('upgrade1', 'js/game/assets/upgrade_icons/missilesLevel1.png');
		game.load.image('upgrade2', 'js/game/assets/upgrade_icons/missilesLevel2.png');
		game.load.image('upgrade3', 'js/game/assets/upgrade_icons/missilesLevel3.png');
    },
    
    loadFonts: function () {
    
    },
    
    init: function () {
        
    },
    
	// This is called right before the game starts
    preload: function () {
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadAudio();
		this.addGameMusic();
    },
    
	// Add all the game states
    addGameStates: function () {
        game.state.add("MainGame", MainGame);
        game.state.add("Options", Options);
    },
    
	// Start playing music
    addGameMusic: function () {
        game.load.audio('sad', 'js/game/assets/music/sadviolin.mp3', true);

    },
	// Finally, create is called  
    create: function () {
        this.addGameStates();
		game.state.start('MainGame');
    }
};