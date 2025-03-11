define(function(require) {
    const gameFlow = require('skbJet/componentLIT/standardIW/gameFlow');
    const numberState = require('game/state/numbers');
    const winUpTo = require('game/components/winUpTo');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    function prepareOrReset() {
        resetAll();
        gameFlow.next();
    }

    function resetAll() {
        numberState.reset();
        winUpTo.reset();

        msgBus.publish('game.bonus.reset');
        msgBus.publish('game.wheel.reset');
        msgBus.publish('game.meter.bonusReset');
        msgBus.publish('game.gameArea.reset');
        msgBus.publish('game.bonusArea.reset');
        msgBus.publish('game.endGame.reset');
        msgBus.publish('game.bonus.reset');
        msgBus.publish('game.multiplierMeter.reset');
        msgBus.publish('game.buyTryAnim.reset');


        // Make sure we hide the result
        msgBus.publish('UI.hideResult');

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying('winTerminator')) {
            audio.fadeOut('winTerminator', 1);
        }
        if (audio.isPlaying('loseTerminator')) {
            audio.fadeOut('loseTerminator', 1);
        }
    }

    // Subscribe to Ticket Cost +/- as we will not be in GAME_RESET when these are called
    msgBus.subscribe('TicketSelect.CostUp', resetAll);
    msgBus.subscribe('TicketSelect.CostMax', resetAll);
    msgBus.subscribe('TicketSelect.CostDown', resetAll);

    gameFlow.handle(prepareOrReset, 'GAME_RESET');
    gameFlow.handle(prepareOrReset, 'GAME_PREPARE');
});