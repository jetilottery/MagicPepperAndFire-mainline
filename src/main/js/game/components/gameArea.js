define(
    /**
     *
     * @param require
     * @returns {{init: init, enable: (function(): any[]), populate: populate, reset: reset, revealAll: (function(): TweenMax[])}}
     */
    require => {
        const pickPoint = require('game/components/pickPoint');
        const displayList = require('skbJet/componentLIT/standardIW/displayList');
        const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
        const meterData = require('skbJet/componentLIT/standardIW/meterData');
        const audio = require('skbJet/componentLIT/standardIW/audio');
        const gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
        const autoPlay = require('skbJet/componentLIT/standardIW/autoPlay');
        //const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
        const textStyles = require('skbJet/componentLIT/standardIW/textStyles');
        //const orientation = require('skbJet/componentLIT/standardIW/orientation');

        require('com/gsap/TweenLite');
        require('com/gsap/easing/EasePack');

        require('com/gsap/TimelineMax');
        const Timeline = window.TimelineMax;

        const Tween = window.TweenLite;

        let pickPointArray = [];
        let numberData;
        let lastIndex = 0;
        let counter = 0;
        let rows;
        let bonusPickPoint;
        let infoTimeLine;


        /**
         * @function init
         * @description initialises the game play area/
         */
        function init() {
            // init the 15 pickpoints
            pickPointArray = [
                pickPoint.fromContainer(displayList.pickPoint1),
                pickPoint.fromContainer(displayList.pickPoint2),
                pickPoint.fromContainer(displayList.pickPoint3),
                pickPoint.fromContainer(displayList.pickPoint4),
                pickPoint.fromContainer(displayList.pickPoint5),
                pickPoint.fromContainer(displayList.pickPoint6),
                pickPoint.fromContainer(displayList.pickPoint7),
                pickPoint.fromContainer(displayList.pickPoint8),
                pickPoint.fromContainer(displayList.pickPoint9),
                pickPoint.fromContainer(displayList.pickPoint10),
                pickPoint.fromContainer(displayList.pickPoint11),
                pickPoint.fromContainer(displayList.pickPoint12),
                pickPoint.fromContainer(displayList.pickPoint13),
                pickPoint.fromContainer(displayList.pickPoint14),
                pickPoint.fromContainer(displayList.pickPoint15)
            ];

            rows = [
                [pickPointArray[0]],
                [pickPointArray[1], pickPointArray[2]],
                [pickPointArray[3], pickPointArray[4], pickPointArray[5]],
                [pickPointArray[6], pickPointArray[7], pickPointArray[8], pickPointArray[9]],
                [pickPointArray[10], pickPointArray[11], pickPointArray[12], pickPointArray[13], pickPointArray[14]]
            ];

            infoTimeLine = new Timeline({
                repeat: -1
            });
            infoTimeLine.add(Tween.to(displayList.bonusInfoText2, 0.5, {
                alpha: 1
            }), 3);
            infoTimeLine.add(Tween.to(displayList.bonusInfoText, 0.5, {
                alpha: 0
            }), 3);
            infoTimeLine.add(Tween.to(displayList.chiliSprite, 0.5, {
                alpha: 0
            }), 3);
            infoTimeLine.add(Tween.to(displayList.yellowChileSprite, 0.5, {
                alpha: 1
            }), 3);
            infoTimeLine.add(Tween.to(displayList.bonusInfoText, 0.5, {
                alpha: 1
            }), 6);
            infoTimeLine.add(Tween.to(displayList.bonusInfoText2, 0.5, {
                alpha: 0
            }), 6);

            infoTimeLine.add(Tween.to(displayList.chiliSprite, 0.5, {alpha: 1}), 6);
            infoTimeLine.add(Tween.to(displayList.yellowChileSprite, 0.5, {alpha: 0}), 6);

        }

        /**
         *
         * @param data
         */
        function populate(data) {
            numberData = data;

            pickPointArray.forEach((e) => {
                let nextData = numberData.mainGame[getColumn(e) - 1].shift();
                let nextPrize = nextData[1];
                e.populate(nextData, nextPrize);
            });
        }


        /**
         *
         * @returns {any[]}
         */
        function enable() {

            //move infoBar down so that the Multipliers can be visible.
            hideInfoBarAndText();

            return pickPointArray.map(async (pickPoint, i, a) => {
                await pickPoint.enable();

                if (!autoPlay.enabled) {
                    audio.play('revealBaseGame');
                }
                counter = counter + 1;

                if (counter - 1 === a.length - 1) {

                    // disable all elements as all symbols were clicked

                    msgBus.publish('Game.AutoPlayStop');

                    pickPoint.lastPoint = true;

                    msgBus.publish('UI.updateButtons', {
                        autoPlay: {visible: false},
                        help: {
                            enabled: false
                        }
                    });
                }

                await pickPoint.uncover();
                if (pickPoint.bonus === true) {

                    bonusPickPoint = pickPoint;

                    msgBus.subscribe('game.gameArea.updateBonusSymbolAmount', updateBonusSymbolAmount);
                }

                if (!autoPlay.enabled) {
                    if (lastIndex === pickPoint.childPosition) {
                        msgBus.publish('game.gameArea.idle');
                    }
                }

                msgBus.publish('Game.PlayerNumber', pickPoint.number[0]);

            });
        }

        function hideAutoReveal() {

            //console.log("hiding auto-reveal (baseGame) on first click");

            msgBus.publish('UI.updateButtons', {
                //autoPlay: false,
                autoPlay: {visible: false},
                help: {
                    enabled: false
                }
            });
        }

        function updateBonusSymbolAmount(data) {
            bonusPickPoint.prizeValue.visible = true;
            bonusPickPoint.prizeValue.alpha = 1;
            bonusPickPoint.prizeValue.style = textStyles.parse('prizeValueWin');
            bonusPickPoint.prizeValue.text = data.data;
        }

        function hideInfoBarAndText() {

            //msgBus.publish('animation.add', {
            //index: 'infoBarIndex',
            //anim: 'Outro',
            //delay: 0,
            //loop: false
            //});
            Tween.to(displayList.infoBarContainer, 0.5, {
                y: displayList.infoBarContainer.y + 100,
                alpha: 0
            });


        }

        // if a column is filled, let's multiply the total prize * value of multiplier.

        function updatePrize(multiplier) {

            const columns = {
                total: pickPointArray.filter(pickPoint => pickPoint.prize),
                row0: rows[0].filter(pickPoint => pickPoint.prize),
                row1: rows[1].filter(pickPoint => pickPoint.prize),
                row2: rows[2].filter(pickPoint => pickPoint.prize),
                row3: rows[3].filter(pickPoint => pickPoint.prize),
                row4: rows[4].filter(pickPoint => pickPoint.prize)
            };

            var sum = 0;
            var value = multiplier.value;

            switch (value) {
                case 1:

                    sum = columns.row0.reduce(function (sum, current) {
                        return sum + current.prize;
                    }, 0);
                    break;

                case 2:

                    sum = columns.row1.reduce(function (sum, current) {
                        return sum + current.prize;
                    }, 0);

                    meterData.win += (sum * 1);
                    break;

                case 3:

                    sum = columns.row2.reduce(function (sum, current) {
                        return sum + current.prize;
                    }, 0);

                    meterData.win += (sum * 2);
                    break;

                case 4:

                    sum = columns.row3.reduce(function (sum, current) {
                        return sum + current.prize;
                    }, 0);

                    meterData.win += (sum * 3);
                    break;

                case 5:

                    sum = columns.row4.reduce(function (sum, current) {
                        return sum + current.prize;
                    }, 0);

                    meterData.win += (sum * 4);
                    break;
            }

        }

        function getColumn(pickPoint) {
            let col = -1;
            if (pickPoint.childPosition > 9) {
                col = 5;
            } else if (pickPoint.childPosition > 5) {
                col = 4;
            } else if (pickPoint.childPosition > 2) {
                col = 3;
            } else if (pickPoint.childPosition > 0) {
                col = 2;
            } else {
                col = 1;
            }

            return col;
        }

        /**
         *
         */
        function reset() {
            pickPointArray.forEach(pickPoint => pickPoint.reset());
            lastIndex = 0;
            counter = 0;
        }

        /**
         *
         * @returns {TweenMax[]}
         */
        function revealAll() {

            //msgBus.publish('Game.AutoPlayStart');

            //pickPointArray.forEach(e => e.hover);
            pickPointArray.forEach(pickPoint => pickPoint.stopAnimation());

            const unrevealed = {
                total: pickPointArray.filter(numberData => !numberData.revealed),
                row1: rows[0].filter(numberData => !numberData.revealed),
                row2: rows[1].filter(numberData => !numberData.revealed),
                row3: rows[2].filter(numberData => !numberData.revealed),
                row4: rows[3].filter(numberData => !numberData.revealed),
                row5: rows[4].filter(numberData => !numberData.revealed)
            };


            // Return an array of tweens that calls reveal on each card in turn
            return unrevealed.total.map(numberData => Tween.delayedCall(addDelay(unrevealed, numberData), numberData.reveal, null, numberData));


        }

        function addDelay(data, number) {

            let delay = 0;
            let thisRow = 0;

            // Find the row number is on
            if (data.row1.indexOf(number) > -1) {
                thisRow = 1;
            } else if (data.row2.indexOf(number) > -1) {
                thisRow = 2;
            } else if (data.row3.indexOf(number) > -1) {
                thisRow = 3;
            } else if (data.row4.indexOf(number) > -1) {
                thisRow = 4;
            } else if (data.row5.indexOf(number) > -1) {
                thisRow = 5;
            }

            // We only need to add a delay to row 2 items if row 1 has unrevealed items in it
            if (thisRow > 1) {
                delay += data.row1.length > 0 ? gameConfig.autoPlayPlayerRowInterval : 0;
            }

            // Likewise, only add a delay to row 3 if row 2 has unrevealed items in it
            if (thisRow > 2) {
                delay += data.row2.length > 0 ? gameConfig.autoPlayPlayerRowInterval : 0;
            }

            if (thisRow > 3) {
                delay += data.row3.length > 0 ? gameConfig.autoPlayPlayerRowInterval : 0;
            }

            if (thisRow > 4) {
                delay += data.row4.length > 0 ? gameConfig.autoPlayPlayerRowInterval : 0;
            }


            return delay;
        }

        function hoverOver(data) {
            pickPointArray.forEach(e => {
                e.hover(data);
            });
        }

        function mouseout(data) {
            pickPointArray.forEach(e => {
                e.mouseout(data);
            });
        }

        function idle() {

            //avoid to animate a revealed pickpoint when idle is triggered. :)
            //pickPointArray.forEach(e => e.hover);
            Tween.delayedCall(1, () => {
                pickPointArray.forEach(e => {
                    e.idle();
                });
            });
        }

        function updateLastIndex(data) {
            lastIndex = data.index;
        }


        msgBus.subscribe('game.gameArea.hoverOver', hoverOver);
        msgBus.subscribe('game.gameArea.mouseout', mouseout);
        msgBus.subscribe('game.gameArea.idle', idle);
        msgBus.subscribe('game.gameArea.updateLastIndex', updateLastIndex);
        msgBus.subscribe('game.gameArea.reset', reset);
        msgBus.subscribe('game.gameArea.updatePrize', updatePrize);
        msgBus.subscribe('game.gameArea.hideAutoReveal', hideAutoReveal);
        //msgBus.subscribe('game.GameArea.enableUI', enableUI);

        //if not all symbols are revealed, we have to enable auto-reveal again!

        msgBus.subscribe('game.GameArea.showAutoReveal', () => {

            if (counter < 15) {

                Tween.delayedCall(1.5, function () {

                    msgBus.publish('UI.updateButtons', {
                        autoPlay: {visible: true},
                        //ticketSelect: true,
                        help: {
                            enabled: true
                        }
                    });
                });
            }

        });


        return {
            init,
            enable,
            populate,
            revealAll,
            getColumn,
        };

    }
);