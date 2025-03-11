define(function(require) {
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const app = require('skbJet/componentLIT/standardIW/app');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const orientation = require('skbJet/componentLIT/standardIW/orientation');
    const resLib = require('skbJet/component/resourceLoader/resourceLib');


    //var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    require('com/gsap/TimelineMax');
    require('com/gsap/TweenMax');
    require('com/pixijs/pixi-particles');

    let Tween = window.TweenMax;
    let PIXI = require('com/pixijs/pixi');

    let baseGameBackground = ['LAND_Loop', 'PORT_Loop'];
    let bonusGameBackground = ['LAND_BonusLoop', 'PORT_BonusLoop'];
    let gameMode = 'baseGame';
    let Timeline = window.TimelineMax;
    let baseGameContainer;
    let bonusContainer;
    let baseGame;
    let bonusGame;
    let multiplierSpine;
    let transitionTimeline;
    let spineAnim_Base;
    let spineAnim_Bonus;
    let animating = false;
    let transitionResolve;
    let transitionSpine;
    let recivedResolve;
    let transitioning = false;

    function init() {

        baseGame = displayList.baseGameBackground;
        bonusGame = displayList.bonusGameBackground;
        multiplierSpine = displayList.multiplierContainer;
        baseGameContainer = displayList.symbolsBackground;
        bonusContainer = displayList.bonusContainer;
        baseGameContainer.visible = true;
        //bonusContainer.visible = false;
        baseGame.visible = true;
        bonusGame.visible = false;
        spineAnim_Base = new PIXI.spine.Spine(resLib.spine['BG'].spineData);
        spineAnim_Bonus = new PIXI.spine.Spine(resLib.spine['BG'].spineData);
        baseGame.addChild(spineAnim_Base);
        bonusGame.addChild(spineAnim_Bonus);
        spineAnim_Base.state.setAnimation(0, baseGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);
        spineAnim_Bonus.state.setAnimation(0, bonusGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);
        spineAnim_Bonus.alpha = 0;
        msgBus.subscribe('GameSize.OrientationChange', onOrientationchange);
        transitionTimeline = new Timeline({
            paused: true,
            onComplete: function onComplete() {
                msgBus.publish('game.transitionComplete');
            }
        });
        transitionTimeline.to(displayList.winUpToLabel, 0.1, {
            alpha: 0
        });
        transitionTimeline.to(displayList.winUpTo, 0.1, {
            alpha: 0
        }, 0);
        transitionTimeline.to(baseGameContainer, 0.1, {
            alpha: 0
        }, 0);

        displayList.transitionContainer.visible = false;

        // create a circle mask in order to mask the bonusContainer
        var gr = new PIXI.Graphics();
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.drawCircle(30, 30, 30);
        gr.endFill();
        var texture = app.renderer.generateTexture(gr);
        var circle = new PIXI.Sprite(texture);
        circle.anchor.set(0.5);

        // detect orientation and put the circle mask in the center depending on its orientation.
        if (orientation.get() === orientation.LANDSCAPE) {
            circle.x = 720;
            circle.y = 405;
        } else {
            circle.x = 405;
            circle.y = 720;
        }

        // apply the circle mask to the bonusContainer
        bonusContainer.mask = circle;

        transitionSpine = displayList.transitionContainer.children[0];


        transitionSpine.state.addListener({
            complete: (e) => {

                let anim = orientation.get() === orientation.LANDSCAPE ? 'LAND' : 'PORT';

                if (e.animation.name === anim + "_BonusTransOutro" || e.animation.name === anim + "_BaseTransIntro") {
                    completeTransition();
                }
                if (e.animation.name === anim + '_BonusTransIntro') {
                    transitionSpine.state.setAnimation(0, anim + '_BonusTransOutro', false);
                }

                animating = false;
            },
            event: (e, event) => {
                if (event.data.name === "swap" && !animating) {
                    switch (gameMode) {
                        case 'baseGame':
                            {


                                msgBus.publish('UI.updateButtons', {
                                    help: {
                                        enabled: false
                                    }
                                });

                                displayList.bonusRevealAllButton.enabled = false;

                                animating = true;
                                audio.stop('music', 11);
                                app.stage.addChild(circle);
                                baseGameContainer.alpha = 0;
                                transitionTimeline.play();
                                gameMode = 'bonusGame';
                                bonusGame.visible = true;
                                bonusGame.alpha = 1;
                                bonusContainer.visible = true;
                                multiplierSpine.alpha = 0;
                                spineAnim_Bonus.state.setAnimation(0, bonusGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);

                                Tween.to(circle.scale, 1, {
                                    x: 40,
                                    y: 40,
                                    onComplete: function() {
                                        bonusContainer.mask = null;
                                        circle.alpha = 0;


                                    }
                                });


                                Tween.delayedCall(0.5, function() {

                                    //baseGame.visible = false;
                                    baseGame.alpha = 0;
                                    Tween.to(spineAnim_Bonus, 0.5, {
                                        alpha: 1
                                    });

                                    // scale and move the logo if we are on LANDSCAPE ONLY for Bonus Area
                                    if (orientation.get() === orientation.LANDSCAPE) {
                                        Tween.to(displayList.logo_static.scale, 0.5, {
                                            x: 0.6,
                                            y: 0.6
                                        });
                                    } else {
                                        displayList.logo_static.alpha = 0;
                                    }
                                });

                                msgBus.publish('Game.setGameMode', 'bonusGame');


                                break;
                            }

                        case 'bonusGame':
                            {

                                msgBus.publish('UI.updateButtons', {
                                    help: {
                                        enabled: false
                                    }
                                });

                                animating = true;
                                audio.stop('bonusMusic', 0);
                                bonusContainer.visible = false;
                                baseGameContainer.alpha = 1;
                                transitionTimeline.reverse();
                                gameMode = 'baseGame';
                                baseGame.alpha = 1;
                                bonusGame.visible = false;
                                spineAnim_Base.state.setAnimation(0, baseGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);
                                spineAnim_Base.alpha = 1;
                                multiplierSpine.alpha = 1;
                                spineAnim_Base.alpha = 1;
                                baseGame.alpha = 1;
                                spineAnim_Bonus.alpha = 0;

                                circle.alpha = 1;
                                baseGame.mask = circle;

                                //baseGame.alpha = 1;
                                //baseGame.visible = true;

                                Tween.to(circle.scale, 1, {
                                    x: 40,
                                    y: 40,
                                    onComplete: function() {
                                        baseGame.mask = null;
                                        circle.alpha = 0;
                                        displayList.pointArray.interactiveChildren = true;
                                        displayList.pointArray.interactive = true;

                                    }
                                });

                                // scale and move the logo if we are on LANDSCAPE ONLY for Bonus Area
                                if (orientation.get() === orientation.LANDSCAPE) {
                                    Tween.to(displayList.logo_static.scale, 0.5, {
                                        x: 1,
                                        y: 1
                                    });
                                } else {
                                    displayList.logo_static.alpha = 1;
                                }
                                msgBus.publish('Game.setGameMode', 'baseGame');
                                break;
                            }
                    }
                }
            }
        });
    }

    function onOrientationchange() {
        if (transitioning) {
            if (transitionSpine.state.tracks[0] !== undefined) {
                let time = transitionSpine.state.tracks[0].trackLast;
                let ori = orientation.get() === orientation.LANDSCAPE ? 'LAND_' : 'PORT_';
                let reverseOri = orientation.get() === orientation.LANDSCAPE ? 'PORT_' : 'LAND_';

                if (transitionSpine.state.tracks[0].animation.name === (reverseOri) + transitionSpine.state.tracks[0].animation.name.slice(5)) {
                    transitionSpine.state.setAnimation(0, (ori) + transitionSpine.state.tracks[0].animation.name.slice(5), false);
                }

                transitionSpine.state.tracks[0].time = time;
            }

        }

        if (gameMode === "bonusGame") {

            displayList.logo_static.alpha = orientation.get() === orientation.LANDSCAPE ? 1 : 0;

            if (orientation.get() === orientation.LANDSCAPE) {
                displayList.logo_static.scale.set(0.6);
            }

        } else {

            displayList.logo_static.scale.set(1);
            displayList.logo_static.alpha = 1;
        }
        spineAnim_Base.state.setAnimation(0, baseGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);
        spineAnim_Bonus.state.setAnimation(0, bonusGameBackground[orientation.get() === orientation.LANDSCAPE ? 0 : 1], true);

    }

    function switchGameMode(amount) {
        displayList.transitionContainer.visible = true;
        audio.play('transition');
        msgBus.publish('game.gamePlay.updateDelay');

        transitioning = true;

        if (gameMode === "bonusGame") {

            Tween.to(displayList.logo_static.scale, 1, {
                x: 1,
                y: 1
            });

            transitionSpine.state.setAnimation(0, orientation.get() === orientation.LANDSCAPE ? 'LAND_BaseTransIntro' : 'PORT_BaseTransIntro', false);
            audio.play('music', 1, true);

            //console.log("AMOUNT IN SWITCH GAME MODE:", amount);

            msgBus.publish('game.pickPoint.showPrizeValueForBonus', {
                data: amount
            });

            msgBus.publish('game.GameArea.showAutoReveal');


        } else {
            transitionSpine.state.setAnimation(0, orientation.get() === orientation.LANDSCAPE ? 'LAND_BonusTransIntro' : 'PORT_BonusTransIntro', false);
            audio.play('bonusMusic', 1, true); //trasansition animation (Outro)
        }
    }

    function completeTransition() {
        transitionResolve();
        transitioning = false;
        if (recivedResolve !== undefined) {
            recivedResolve();
        }
    }

    msgBus.subscribe('game.transitionToNext', function() {});
    return {
        init: init,
        transitionToNext: (passedResolve = undefined, amount) => {
            return new Promise(resolve => {
                recivedResolve = passedResolve;
                Tween.delayedCall(gameConfig.delayBeforeTransitionToBonus, () => {
                    switchGameMode(amount);
                    transitionResolve = resolve;
                });
            });
        },
    };
});