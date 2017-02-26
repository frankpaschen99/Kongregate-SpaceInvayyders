var game = new Phaser.Game(windowSize.width, windowSize.height, Phaser.AUTO, 'body'), Main = function () {};

Main.prototype = {

	// Load game scripts
    preload: function () {
        game.load.script('loadGame', 'js/game/loadGame.js');
        game.load.script('utils', 'js/game/utils.js');
    },

	// Add various game states and start LoadGame
    create: function () {
        game.state.add('LoadGame', LoadGame);
        game.state.start('LoadGame');
    }

};

// Start the whole process by adding the Main state and beginning it.
game.state.add('Main', Main);
game.state.start('Main');