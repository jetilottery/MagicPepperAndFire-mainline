define(require => {
    const Timeline = require('com/gsap/TimelineLite');
    const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const gameArea = require('game/components/gameArea');
    const bonusArea = require('game/components/bonus/bonusArea');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    let revealAllTimeline;
    let revealAllTimelineBonus;
    let gameMode = "baseGame";

    function start() {

        //console.log('starting auto-reveal', gameMode);

        gameMode === 'baseGame' ? startBG() : startBonus();

    }

    function startBG() {

        //console.log('auto-reveal basegame.');

        msgBus.publish('game.gameArea.hideAutoReveal');

        revealAllTimeline = new Timeline();
        let revealPickPoints;
        revealPickPoints = gameArea.revealAll();
        displayList.pointArray.interactiveChildren = false;
        revealAllTimeline.add(revealPickPoints, 0, 'normal', gameConfig.autoPlayPlayerNumberInterval);

        return revealAllTimeline;
    }

    function startBonus() {

        //console.log('auto-reveal bonus.');

        const revealBonusPickPoints = bonusArea.revealAll();

        displayList.pickerContainer.interactiveChildren = false;

        revealAllTimelineBonus = new Timeline({
            tweens: [
                new Timeline({ tweens: revealBonusPickPoints, stagger: 1.5 /*gameConfig.autoPlayPlayerNumberInterval*/ }),
            ],
            align: 'sequence'
        });
        return revealAllTimelineBonus;
    }

    function stopBG() {
        // re-enable all interaction at the parent container level
        displayList.pointArray.interactiveChildren = true;

        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        } else if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    function stopBonus() {
        // re-enable all interaction at the parent container level
        displayList.pickerContainer.interactiveChildren = true;

        // kill the revealAll timeline if active
        if (revealAllTimelineBonus) {
            revealAllTimelineBonus.kill();
            revealAllTimelineBonus = undefined;
        }
    }

    function stop() {

        //console.log("STOP AUTO-REVEAL TRIGERED!", gameMode);
        gameMode === 'baseGame' ? stopBG() : stopBonus();
    }

    msgBus.subscribe('Game.setGameMode', (val) => {
        gameMode = val;
    });

    return {
        start,
        stop,
    };
});