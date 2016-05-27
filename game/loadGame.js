var LoadGame = function () {};

LoadGame.prototype = {
        
	// Load various scripts required to play the game.
    loadScripts: function () {
        game.load.script('MainGame', 'js/game/mainGame.js');
        game.load.script('options', 'js/game/options.js');
    },
	
	// Add audio assets
    loadAudio: function () {
        
    },
    
	// Load various image, atlas resources 
    loadImages: function () {
		game.load.image('player_sprite', 'js/game/assets/actors/player_ship.png');
		game.load.image('player_laser', 'js/game/assets/entities/laser.png');
		game.load.image('scene_backdrop', 'js/game/assets/ui/space_background.png');
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
    },
    
	// Add all the game states
    addGameStates: function () {
        game.state.add("MainGame", MainGame);
        game.state.add("Options", Options);
    },
    
	// Start playing music
    addGameMusic: function () {
        
    },
	// Finally, create is called  
    create: function () {
        this.addGameStates();
        this.addGameMusic();
		game.state.start('MainGame');
    }
};