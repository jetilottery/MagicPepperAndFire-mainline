define(require => {

    const animationController = require('game/components/animation/animationController');
    //const orientation = require('skbJet/componentLIT/standardIW/orientation');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');

    function init() {

        // BONUS POINTS

        for (let i = 1; i < 17; i++) {
            animationController.addAnimation({
                index: 'picker' + i,
                file: 'BonusSymbolCovers',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['picker' + i]
            });

            animationController.addAnimation({
                index: 'revealPointBonus' + i,
                file: 'BonusSymbolCovers',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['picker' + i]
            });

            animationController.addAnimation({
                index: 'revealPointBonus' + i,
                file: 'BonusSymbols',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['picker' + i]
            });

        }

        // PICKPOINTS
        for (let i = 1; i < 16; i++) {
            animationController.addAnimation({
                index: 'pickPoint' + i,
                file: 'SymbolCover',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['pickPoint' + i]
            });

            animationController.addAnimation({
                index: 'revealPoint' + i,
                file: 'SymbolCover',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['pickPoint' + i]
            });

            animationController.addAnimation({
                index: 'revealPoint' + i,
                file: 'Symbols',
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['pickPoint' + i]
            });

        }



        // MULTIPLIER BOXES

        for (let i = 1; i < 6; i++) {
            animationController.addAnimation({
                index: 'multiplier' + i,
                file: 'X' + i,
                loop: true,
                x: 0,
                y: 0,
                pivotX: 0,
                pivotY: 0,
                container: displayList['multiplier' + i]
            });
        }
        

        animationController.addAnimation({
            index: 'bonusSpineController',
            file: 'infoBox',
            loop: true,
            x: 180,
            y: 80,
            pivotX: 0,
            pivotY: 0,
            container: displayList.bonusSpineContainer
        });


        animationController.addAnimation({
            index: 'transition',
            file: 'Transition',
            loop: false,
            x: 0,
            y: 0,
            //pivotX: orientation.get() === orientation.LANDSCAPE ? -720 : -360,
            //pivotY: orientation.get() === orientation.LANDSCAPE ? -405 : -605,
            container: displayList.transitionContainer
        });

        animationController.addAnimation({
            index: 'winPlaqueAnim_v2',
            file: 'WinPlaque',
            loop: true,
            x: 0,
            y: 0,
            pivotX: 0,
            pivotY: 0,
            container: displayList.winPlaqueBG
        });

        animationController.addAnimation({
            index: 'endGameNoPlaque',
            file: 'WinPlaque',
            container: displayList.endGameWinNoPlaqueSpineContainer
        });
    }

    msgBus.subscribe('animation.play', data => {
        animationController.playAnimation(data);
    });

    msgBus.subscribe('animation.add', data => {
        animationController.queueAnimation(data);
    });

    msgBus.subscribe('animation.set', data => {
        animationController.setAnimation(data);
    });

    msgBus.subscribe('animation.setEvents', data => {
        animationController.setEvents(data);
    });

    msgBus.subscribe('animation.clearTrack', data => {
        animationController.clearTrack(data);
    });

    msgBus.subscribe('animation.emptyAnimations', data => {
        animationController.setEmptyAnimation(data);
    });

    msgBus.subscribe('animation.mix', data => {
        animationController.mix(data);
    });

    return {
        init
    };

});