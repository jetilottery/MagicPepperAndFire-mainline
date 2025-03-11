define(function(require) {
    const gameFlow = require('skbJet/componentLIT/standardIW/gameFlow');
    const meterData = require('skbJet/componentLIT/standardIW/meterData');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');


    require('com/gsap/TweenLite');
    const Tween = window.TweenLite;

    function resultScreen() {

        if (gameConfig.showResultScreen) {

            if (meterData.totalWin > 0) {

                displayList.resultPlaquesContainer.visible = false;

                Tween.to({ curr: 1 }, gameConfig.totalWinRollupInSeconds, {
                    curr: meterData.totalWin,
                    onStart: function() {
                        msgBus.publish('Result.RollupStarted');
                    },
                    onComplete: function() {
                        msgBus.publish('Result.RollupComplete');
                    }
                });

                msgBus.publish('game.endGame.run');


            } else {

                if (!gameConfig.suppressNonWinResultPlaque) {

                    var closePlaque = displayList.resultPlaquesContainer;
                    closePlaque.visible = true;
                    closePlaque.on('press', function() {
                        closePlaque.visible = false;
                        audio.play('click');
                    });
                }
            }
        }


        // ResultPlaques template component handles populating and showing the result screen
        // All that needs doing here is playing the result screen audio
        const terminator = meterData.totalWin > 0 ? 'winTerminator' : 'loseTerminator';
        audio.fadeOut('music', gameConfig.resultMusicFadeOutDuration);

        Tween.delayedCall(gameConfig.resultTerminatorFadeInDelay, function() {
            audio.play(terminator);
        });

    }

    gameFlow.handle(resultScreen, 'RESULT_SCREEN');
});