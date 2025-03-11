define(
    /**
     *
     * @param require
     * @returns {{init: init, enable: (function(): any[]), populate: populate, reset: reset, revealAll: (function(): TweenMax[])}}
     */
    require => {
        const PIXI = require('com/pixijs/pixi');
        const bonusPickPoint = require('game/components/bonus/bonusPickPoint');
        const displayList = require('skbJet/componentLIT/standardIW/displayList');
        const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
        const meterData = require('skbJet/componentLIT/standardIW/meterData');
        const audio = require('skbJet/componentLIT/standardIW/audio');
        const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
        const bonusMeter = require('game/components/bonus/bonusMeter');
        const orientation = require('skbJet/componentLIT/standardIW/orientation');
        const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
        const scenarioData = require('skbJet/componentLIT/standardIW/scenarioData');
        const transitionMananger = require('game/components/transitionManager');

        require('com/gsap/easing/EasePack');

        require('com/gsap/TimelineMax');

        require('com/gsap/TweenLite');

        let Timeline = window.TimelineMax;
        let Tween = window.TweenLite;
        let endgameArea;
        let endGameText;
        let transformTimeline;
        let winTextTimeline;
        let endGameOverlay;
        let endGameTotalWin;
        let totalBonusWinAmount = 0;
        let collectValue = 0;
        let multiplierValue = 0;
        let bonusPickPointArray = [];
        let numberData;
        let lastIndex = 0;
        let currentIndex = 0;

        let revealAllBtn;
        let autoPlayEnabled = false;

        let complete = false;

        const textureUpdateArray = {
            bonusRevealAllButton: {
                enabled: ['mainButtonLandEnabled', 'mainButtonEnabled'],
                disabled: ['mainButtonLandDisabled', 'mainButtonDisabled']
            }
        };

        /**
         * @function init
         * @description initialises the bonus area/
         */
        function init() {



            // init the 16 bonusPickers

            bonusPickPointArray = [
                bonusPickPoint.fromContainer(displayList.picker1),
                bonusPickPoint.fromContainer(displayList.picker2),
                bonusPickPoint.fromContainer(displayList.picker3),
                bonusPickPoint.fromContainer(displayList.picker4),
                bonusPickPoint.fromContainer(displayList.picker5),
                bonusPickPoint.fromContainer(displayList.picker6),
                bonusPickPoint.fromContainer(displayList.picker7),
                bonusPickPoint.fromContainer(displayList.picker8),
                bonusPickPoint.fromContainer(displayList.picker9),
                bonusPickPoint.fromContainer(displayList.picker10),
                bonusPickPoint.fromContainer(displayList.picker11),
                bonusPickPoint.fromContainer(displayList.picker12),
                bonusPickPoint.fromContainer(displayList.picker13),
                bonusPickPoint.fromContainer(displayList.picker14),
                bonusPickPoint.fromContainer(displayList.picker15),
                bonusPickPoint.fromContainer(displayList.picker16),
            ];

            bonusMeter.init();
            revealAllBtn = displayList.bonusRevealAllButton;
            revealAllBtn.enabled = false;
            Object.keys(textureUpdateArray).forEach((e) => {

                if (orientation.get() === orientation.LANDSCAPE) {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['disabled'][0]);
                } else {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['disabled'][1]);

                }
            });

            // PEPPER-137 - More symbols are revealed at the same time after clicking "AutoReveal" button in the Bonus.
            // Add event handling for revealAllBtn here
            revealAllBtn.on('press', () => {
                audio.play('click');
                revealAllBtn.enabled = false;
                msgBus.publish('Game.AutoPlayStart');
                msgBus.publish('UI.updateButtons', {
                    help: {
                        enabled: false
                    },
                });
                hideAutoReveal();
            });
        }

        function enableRevealAllButton() {

            revealAllBtn.enabled = true;

            Object.keys(textureUpdateArray).forEach((e) => {

                if (orientation.get() === orientation.LANDSCAPE) {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['enabled'][0]);
                } else {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['enabled'][1]);

                }
            });
        }

        function disableRevealAllButton() {
            revealAllBtn.enabled = false;

            Object.keys(textureUpdateArray).forEach((e) => {
                if (orientation.get() === orientation.LANDSCAPE) {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['disabled'][0]);
                } else {
                    displayList[e].states.enabled.texture = new PIXI.Texture.from(textureUpdateArray[e]['disabled'][1]);

                }
            });
        }

        /**
         *
         * @param data
         */
        function populate(data) {
            numberData = data;
        }

        /**
         *
         * @returns {any[]}
         */
        function enable() {

            complete = true;

            if (!autoPlayEnabled){
                idle();
            }

            console.log("REVEAL ALL BUTTON ENABLED!");
            enableRevealAllButton();

            let totalPoints = scenarioData.scenario.bonusData.length;


            msgBus.publish('UI.updateButtons', {
                help: {
                    enabled: true
                }
            });

            return new Promise(resolve => {
                bonusPickPointArray.map(async (bonusPickPoint) => {
                    await bonusPickPoint.enable();

                    if (!autoPlayEnabled) {
                        audio.playSequential('BonusSymbolReveal');
                    }

                    const nextBonus = numberData.bonusData.shift();
                    currentIndex = currentIndex + 1;
                    bonusPickPoint.populate(nextBonus);


                    if (currentIndex - 1 === totalPoints - 1) {

                        msgBus.publish('Game.AutoPlayStop');

                        bonusPickPointArray.forEach(e => e.hover);
                        bonusPickPoint.last = true;

                        bonusPickPointArray.forEach(e => {

                            e.dimNonRevealedPickPoints();
                            e.disable();
                        });


                        msgBus.publish('UI.updateButtons', {
                            help: {
                                enabled: false
                            }
                        });

                        revealAllBtn.enabled = false;

                        Tween.to(revealAllBtn, 0.5, {
                            alpha: 0
                        });
                    }

                    await bonusPickPoint.uncover();

                    if (!autoPlayEnabled) {
                        if (lastIndex === bonusPickPoint.childPosition) {
                            idle();
                        }
                    }

                    if (bonusPickPoint.last) {
                        returnToBaseGame(resolve);
                    }

                    msgBus.publish('Game.PlayerNumber', nextBonus);

                });
            });

        }

        function hideAutoReveal() {

            Tween.to(revealAllBtn, 0.5, {
                alpha: 0
            });
        }

        function updateBonusMoney(data) {
            meterData.win += data.data;
            totalBonusWinAmount = data.data;
            collectValue = SKBeInstant.formatCurrency(data.collect).formattedAmount;
            multiplierValue = data.multiplier;
        }

        async function returnToBaseGame(resolve) {


            //stop auto-reveal
            msgBus.publish('Game.AutoPlayStop');


            if (meterData.win > 0) {

                endgameArea = displayList.endGameWinNoPlaque;
                endGameText = displayList.endGameWinNoPlaqueValue;
                endGameOverlay = displayList.endGameNoPlaqueContainerClick;
                endGameTotalWin = displayList.endGameWinNoPlaqueLabel;

                endgameArea.renderable = false;

                winTextTimeline = new Timeline({
                    paused: true,
                    onComplete: function onComplete() {
                        endGameOverlay.interactive = false;
                    }
                });

                transformTimeline = new Timeline({
                    paused: true,
                    onStart: function onStart() {
                        endgameArea.renderable = true;
                    }
                });

                endGameOverlay.interactive = false;
                endGameOverlay.renderable = false;
                endGameText.alpha = 0;
                endGameOverlay.alpha = 0;

                winTextTimeline.to(endGameText, 0.5, {
                    alpha: 1
                }, 0);
                Tween.delayedCall(3, function() {

                    endgameArea.renderable = true;
                    endGameOverlay.renderable = true;
                    transformTimeline.play();
                    winTextTimeline.play();

                    Tween.killTweensOf(endGameOverlay);

                    Tween.to(endGameOverlay, 0.5, {
                        alpha: 1
                    });

                    audio.fadeOut('bonusMusic', gameConfig.resultMusicFadeOutDuration);
                    audio.play('winTerminator');

                    //overwrite the text in order to avoid a ton of duplicates in the layout.js
                    endGameTotalWin.text = collectValue + ' X ' + multiplierValue;

                    var endGameWinNoPlaqueValue = totalBonusWinAmount; 
                    endGameText.text = SKBeInstant.formatCurrency(endGameWinNoPlaqueValue).formattedAmount;

                    msgBus.publish('animation.play', {
                        index: 'endGameNoPlaque',
                        anim: 'Intro'
                    });
                    msgBus.publish('animation.add', {
                        index: 'endGameNoPlaque',
                        anim: 'Loop',
                        delay: 0,
                        loop: 0
                    });
                    msgBus.publish('animation.add', {
                        index: 'endGameNoPlaque',
                        anim: 'Outro',
                        delay: 0,
                        loop: 0
                    });

                    Tween.to(endGameText, 0.5, {
                        alpha: 0,
                        delay: 2.5
                    });
                });

                Tween.delayedCall(6, async () => {
                    endGameOverlay.interactive = false;
                    endGameOverlay.renderable = false;
                    endgameArea.renderable = false;

                    await transitionMananger.transitionToNext(resolve, totalBonusWinAmount);
                });

            } else {

                await transitionMananger.transitionToNext(resolve, totalBonusWinAmount);

            }
        }

        /**
         *
         */
        function reset() {
            autoPlayEnabled = false;
            bonusPickPointArray.forEach(bonusPickPoint => bonusPickPoint.reset());
            bonusMeter.reset();
            bonusPickPoint.last = false;
            lastIndex = 0;
            complete = false;
            revealAllBtn.alpha = 1;
            revealAllBtn.enabled = false;
            currentIndex = 0;

            if (endgameArea) {

                console.log("ENDGAMEAREA PRESENT!!!");
                endGameText.alpha = 0;
                endgameArea.renderable = false;
                Tween.killTweensOf(endGameOverlay);
                endGameOverlay.renderable = false;
                endGameOverlay.alpha = 0;
                endGameOverlay.interactive = false;
                endgameArea.interactive = false;
                endgameArea.interactiveChildren = false;

                transformTimeline.pause(0);
                winTextTimeline.pause(0);
            } else {
                console.log("ENDGAMEAREA NOT PRESENT!!!");
            }

            // reset the collector x multiplier plaque.
            msgBus.publish('animation.clearTrack', {
                index: 'endGameNoPlaque',
                all: true
            });

        }



        function revealAll() {
            autoPlayEnabled = true;
            // Get all the cards yet to be revealed
            const unrevealed = bonusPickPointArray.filter(bonusPickPoint => !bonusPickPoint.revealed);

            shuffleArray(unrevealed);

            // Return an array of tweens that calls reveal on each card in turn
            return unrevealed.map(bonusPickPoint => Tween.delayedCall(0, bonusPickPoint.reveal, null, bonusPickPoint));
        }

        /**
         * Randomize array element order in-place.
         * Using Durstenfeld shuffle algorithm.
         */
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        function hoverOver(data) {
            bonusPickPointArray.forEach(e => {
                e.hover(data);
            });
        }

        function mouseout(data) {
            bonusPickPointArray.forEach(e => {
                e.mouseout(data);
            });
        }

        function idle() {
            if (!autoPlayEnabled){
                bonusPickPointArray.forEach(e => {
                    e.idle();
                });
            }
        }

        function updateLastIndex(data) {
            lastIndex = data.index;
        }

        msgBus.subscribe('game.bonusArea.hoverOver', hoverOver);
        msgBus.subscribe('game.bonusArea.mouseout', mouseout);
        msgBus.subscribe('game.bonusArea.idle', idle);
        msgBus.subscribe('game.bonusArea.updateLastIndex', updateLastIndex);
        msgBus.subscribe('game.bonusArea.reset', reset);
        msgBus.subscribe('game.bonusArea.updateBonusMoney', updateBonusMoney);
        msgBus.subscribe('game.bonusArea.hideAutoReveal', hideAutoReveal);
        msgBus.subscribe('UI.showHelp', disableRevealAllButton);
        msgBus.subscribe('UI.hideHelp', enableRevealAllButton);



        return {
            init,
            enable,
            populate,
            revealAll,
            complete: () => {
                return complete;
            }
        };

    }
);