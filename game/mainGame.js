// The actual game will be scripted here

var MainGame = function () {};
MainGame.prototype = {
    switchFull: function () {
        game.scale.isFullScreen ? game.scale.stopFullScreen() : game.scale.startFullScreen(false);
    },
    
    create: function () {
        var pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.F6);
        pauseKey.onDown.add(this.switchFull, this);
    },
    
    update: function () {
    
    }
};