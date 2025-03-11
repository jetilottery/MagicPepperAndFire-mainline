define(require => {
    const gameArea = require('game/components/gameArea');
    const transitionMananger = require('game/components/transitionManager');
    const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const bonusArea = require('game/components/bonus/bonusArea');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const scenarioData = require('skbJet/componentLIT/standardIW/scenarioData');
    const autoPlay = require('skbJet/componentLIT/standardIW/autoPlay');


    require('com/gsap/TweenMax');

    const Tween = window.TweenMax;

    let delay = 0;

    function init() {

        gameArea.init();
        transitionMananger.init();
        bonusArea.init();

        //-----------------------------------------------------------------------
        // FADE IN THE MAIN GAME AREA 
        //-----------------------------------------------------------------------

        displayList.gameAreas.alpha = 0;
        displayList.background.alpha = 0;
        displayList.logo_static.alpha = 0;
        displayList.winUpToLabel.alpha = 0;
        displayList.winUpTo.alpha = 0;
        displayList.buttonBar.alpha = 0;
        //displayList.ticketSelectBarSmall.alpha = 0;

        // FIX PEPPER-192
        //The text "Play With Money" is out of border for siteId 16.
        displayList.moveToMoneyButton.label.maxWidth = 230;


        Tween.to(displayList.background, 1.5, {
            delay: 0.2,
            alpha: 1
        });
        Tween.to(displayList.gameAreas, 1.5, {
            delay: 0.2,
            alpha: 1
        });
        Tween.to(displayList.logo_static, 1.5, {
            delay: 0.2,
            alpha: 1
        });
        Tween.to(displayList.winUpToLabel, 1.5, {
            delay: 0.2,
            alpha: 1
        });
        Tween.to(displayList.winUpTo, 1.5, {
            delay: 0.2,
            alpha: 1
        });
        Tween.to(displayList.buttonBar, 1.5, {
            delay: 0.2,
            alpha: 1
        });

        displayList.pointArray.alpha = 0.5;


    }

    function gameState() {
        return new Promise(async (resolve) => {

            delay = 0;

            await Promise.all(
                gameArea.enable()
            );

            if (scenarioData.scenario.bonusData.length > 1) {
                if (!bonusArea.complete()) {

                    msgBus.publish('UI.updateButtons', {
                        ticketSelect: false,
                        help: {
                            enabled: false
                        }
                    });

                    autoPlay._enabled = false;

                    await transitionMananger.transitionToNext();
                    await bonusArea.enable();

                } else {
                    autoPlay._enabled = true;
                }
            }

            Tween.delayedCall(gameConfig.gameEndDelay + delay, resolve);

        });
    }

    function updateDelay() {
        delay = 2;
    }

    msgBus.subscribe('game.gamePlay.updateDelay', updateDelay);

    return {
        init,
        gameState
    };

});