define(function(require) {
    var displayList = require('skbJet/componentLIT/standardIW/displayList');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var meterData = require('skbJet/componentLIT/standardIW/meterData');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    //var orientation = require('skbJet/componentLIT/standardIW/orientation');
    var resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');
    var audio = require('skbJet/componentLIT/standardIW/audio');


    require('com/gsap/easing/EasePack');

    require('com/gsap/TimelineMax');

    require('com/gsap/TweenLite');

    var Timeline = window.TimelineMax;
    var Tween = window.TweenLite;
    var endgameDismissArea;
    var endgameArea;
    var endGameText;
    var transformTimeline;
    var winTextTimeline;
    var endGameOverlay;
    var endGameTotalWin;

    function init() {
        endgameDismissArea = displayList.endGameDismissRectangle;
        endgameArea = displayList.endGameWinNoPlaque;
        endGameText = displayList.endGameWinNoPlaqueValue;
        endGameOverlay = displayList.endGameNoPlaqueContainerClick;
        endGameTotalWin = displayList.endGameWinNoPlaqueLabel;
        endgameArea.renderable = false;
        //endgameArea.y = orientation.get() === orientation.LANDSCAPE ? 410 : 600;
        winTextTimeline = new Timeline({
            paused: true,
            onComplete: function onComplete() {
                endGameOverlay.interactive = true;
                endgameDismissArea.renderable = true;
                endgameDismissArea.interactive = true;
                endgameDismissArea.interactiveChildren = true;
            }
        });
        transformTimeline = new Timeline({
            paused: true,
            onStart: function onStart() {
                endgameArea.renderable = true;
                endgameDismissArea.renderable = true;
                endgameDismissArea.interactive = true;
                endgameDismissArea.interactiveChildren = true;

                //make the popupArea interactive! :)
                endgameDismissArea.visible = true;
            }

        });
        endGameOverlay.interactive = false;
        endGameOverlay.renderable = false;
        endgameDismissArea.on('press', function() {
            audio.play('click');
            endgameArea.renderable = false;
            endGameOverlay.interactive = false;
            endGameOverlay.renderable = false;
            endgameArea.interactive = false;
            endgameDismissArea.renderable = false;
            endgameDismissArea.interactive = false;
        });
        endGameOverlay.on('press', function() {
            audio.play('click');
            endgameArea.renderable = false;
            endGameOverlay.interactive = false;
            endGameOverlay.renderable = false;
            endgameArea.interactive = false;
            endgameDismissArea.renderable = false;
            endgameDismissArea.interactive = false;
        });
        endGameText.alpha = 0;
        endGameOverlay.alpha = 0;
        endgameDismissArea.alpha = 0;
        winTextTimeline.to(endGameText, 0.5, {
            alpha: 1
        }, 0);
        //transformTimeline.to(endgameArea, 0.5, {
        //  y: orientation.get() === orientation.LANDSCAPE ? 410 : 600
        //}, 0);
        //transformTimeline.to(endgameDismissArea, 0.5, {
        //  y: orientation.get() === orientation.LANDSCAPE ? 200 : 550
        //}, 0);
        msgBus.publish('animation.play', {
            index: 'endGameNoPlaque',
            anim: 'Intro'
        });
        msgBus.publish('animation.add', {
            index: 'endGameNoPlaque',
            anim: 'Loop',
            delay: 0,
            loop: true
        });
        msgBus.publish('animation.setEvents', {
            index: 'endGameNoPlaque',
            event: {
                'winText': function winText() {
                    winTextTimeline.play();
                }
            }
        });
    }

    function endGame() {
        if (meterData.win > 0) {
            endgameArea.renderable = true;
            endGameOverlay.renderable = true;
            endgameArea.renderable = true;
            endgameDismissArea.interactive = true;
            endGameOverlay.interactive = true;
            endgameDismissArea.interactiveChildren = true; //endgameDismissArea.x = endgameArea.x;
            //endgameDismissArea.y = endgameArea.y;

            transformTimeline.play();
            Tween.killTweensOf(endGameOverlay);
            Tween.to(endGameOverlay, 0.5, {
                alpha: 1
            });
            Tween.to(endgameDismissArea, 0.5, {
                alpha: 0
            });
            var endGameWinNoPlaqueValue = meterData.win;
            endGameText.text = SKBeInstant.formatCurrency(endGameWinNoPlaqueValue).formattedAmount;

            //detect wagerType and show proper text.
            endGameTotalWin.text = (SKBeInstant.config.wagerType === 'BUY') ? resources.i18n.Game.message_win.BUY : resources.i18n.Game.message_win.TRY;

            Tween.to(endGameText, 0.5, {
                alpha: 1
            });
            msgBus.publish('animation.play', {
                index: 'endGameNoPlaque',
                anim: 'Intro'
            });
            msgBus.publish('animation.add', {
                index: 'endGameNoPlaque',
                anim: 'Loop',
                delay: 0,
                loop: true
            });
        }
    }

    function reset() {
        //endgameArea.y = 1400;
        endGameText.alpha = 0;
        endgameArea.renderable = false;
        Tween.killTweensOf(endGameOverlay);
        endGameOverlay.renderable = false;
        endGameOverlay.alpha = 0;
        endGameOverlay.interactive = false;
        endgameArea.interactive = false;
        endgameDismissArea.alpha = 0;
        endgameDismissArea.renderable = false;
        endgameDismissArea.interactive = false;
        transformTimeline.pause(0);
        winTextTimeline.pause(0);
        msgBus.publish('animation.clearTrack', {
            index: 'endGameNoPlaque',
            all: true
        });
    } //
    // function showWinPlaque() {
    //     tween.to()
    // }


    msgBus.subscribe('game.endGame.init', init);
    msgBus.subscribe('game.endGame.run', endGame);
    msgBus.subscribe('game.endGame.reset', reset);

    // TRIPLAT-137 - IXF WLA/COM - Total win message becomes offset when rotating [MOB/TAB]
    // Reposition on orientation change

    //msgBus.subscribe('GameSize.OrientationChange', function() {
    //if (endgameArea) {
    //  endgameArea.y = orientation.get() === orientation.LANDSCAPE ? 410 : 600;
    //}
    //if (endgameDismissArea) {
    //endgameDismissArea.y = orientation.get() === orientation.LANDSCAPE ? 200 : 550;
    //}
    //});
});