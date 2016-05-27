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