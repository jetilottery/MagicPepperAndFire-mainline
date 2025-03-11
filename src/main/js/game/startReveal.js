define(function(require) {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameFlow = require('skbJet/componentLIT/standardIW/gameFlow');
    const revealAll = require('game/revealAll');
    const gamePlay = require('game/components/gamePlay');
    const bonusMeter = require('game/components/bonus/bonusMeter');

    async function startReveal() {

        // Listen for autoplay activation which triggers the remaining cards to reveal automatically
        msgBus.subscribe('Game.AutoPlayStart', revealAll.start);
        msgBus.publish('game.gameArea.idle');
        msgBus.publish('game.bonusArea.idle');

        // Listen for autoplay deactivation which cancels the revealAll timeline
        msgBus.subscribe('Game.AutoPlayStop', revealAll.stop);

        bonusMeter.populateMeters();

        await gamePlay.gameState();

        // continue to the next state
        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(startReveal, 'START_REVEAL');
});