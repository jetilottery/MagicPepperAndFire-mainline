define(function(require) {

    var PIXI = require('com/pixijs/pixi');
    var displayList = require('skbJet/componentLIT/standardIW/displayList');
    var resLib = require('skbJet/component/resourceLoader/resourceLib');
    var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var audio = require('skbJet/componentLIT/standardIW/audio');
    const prizeData = require('skbJet/componentLIT/standardIW/prizeData');


    var arrayOfMultiplierNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var collectPrizes = [];
    var redPips = [];
    var orangePips = [];
    var yellowPips = [];
    var greenPips = [];
    var audioIndex = 0;
    var redPipIndex = 0;
    var orangePipIndex = 0;
    var yellowPipIndex = 0;
    var greenPipIndex = 0;
    var currentMultiplierNumber = 1;
    var redBonusMeter;
    var orangeBonusMeter;
    var yellowBonusMeter;
    var greenBonusMeter;
    var multiplierMeter;
    var multiplierNumberAnimation;

    require('com/gsap/TweenLite');
    var Tween = window.TweenLite;

    function init() {

        // Bonus meters spine sources.

        redBonusMeter = new PIXI.spine.Spine(resLib.spine['RedPepperMeter'].spineData);
        orangeBonusMeter = new PIXI.spine.Spine(resLib.spine['OrangePepperMeter'].spineData);
        yellowBonusMeter = new PIXI.spine.Spine(resLib.spine['YellowPepperMeter'].spineData);
        greenBonusMeter = new PIXI.spine.Spine(resLib.spine['GreenPepperMeter'].spineData);

        // add meters to the displayList

        displayList.redPepperMeter.addChild(redBonusMeter);
        displayList.orangePepperMeter.addChild(orangeBonusMeter);
        displayList.yellowPepperMeter.addChild(yellowBonusMeter);
        displayList.greenPepperMeter.addChild(greenBonusMeter); // add prize Table values to the meters

        // Create pips meter squares (not visible at the beginning of the bonus game)

        for (var i = 1; i < 5; i++) {
            redPips[i - 1] = new PIXI.spine.Spine(resLib.spine['RedMeterIcon'].spineData);
            displayList['redPip' + i].addChild(redPips[i - 1]);
        }

        for (var j = 1; j < 5; j++) {
            orangePips[j - 1] = new PIXI.spine.Spine(resLib.spine['OrangeMeterIcon'].spineData);
            displayList['orangePip' + j].addChild(orangePips[j - 1]);
        }

        for (var k = 1; k < 5; k++) {
            yellowPips[k - 1] = new PIXI.spine.Spine(resLib.spine['YellowMeterIcon'].spineData);
            displayList['yellowPip' + k].addChild(yellowPips[k - 1]);
        }

        for (var l = 1; l < 5; l++) {
            greenPips[l - 1] = new PIXI.spine.Spine(resLib.spine['GreenMeterIcon'].spineData);
            displayList['greenPip' + l].addChild(greenPips[l - 1]);
        }

        // init stuff

        initMultiplierBoxAndNumber();
        pauseAtFirstFrame();
        createBonusMultiplierMeter();

    }

    function initMultiplierBoxAndNumber() {
        multiplierNumberAnimation = new PIXI.spine.Spine(resLib.spine['BonusMultiplierBox'].spineData);
        displayList.multiplierNumbersBox.addChild(multiplierNumberAnimation);
        displayList.multiplierNumbersBox.x = displayList.multiplierNumberValue.x = displayList['numberMeter' + 1].x + 13;
        displayList.multiplierNumbersBox.y = displayList.multiplierNumberValue.y = displayList['numberMeter' + 1].y + 25;
    }

    function pauseAtFirstFrame() {
        redBonusMeter.state.setAnimation(0, 'RedPepperMeter_IDLE', true);
        redPips.forEach(function(e) {
            e.state.setAnimation(0, 'Static', false);
            e.renderable = false;
        });
        orangeBonusMeter.state.setAnimation(0, 'OrangePepperMeter_IDLE', true);
        orangePips.forEach(function(e) {
            e.state.setAnimation(0, 'Static', false);
            e.renderable = false;
        });
        yellowBonusMeter.state.setAnimation(0, 'YellowPepperMeter_IDLE', true);
        yellowPips.forEach(function(e) {
            e.state.setAnimation(0, 'Static', false);
            e.renderable = false;
        });
        greenBonusMeter.state.setAnimation(0, 'GreenPepperMeter_IDLE', true);
        greenPips.forEach(function(e) {
            e.state.setAnimation(0, 'Static', false);
            e.renderable = false;
        });
    }

    function idle() {
        redBonusMeter.state.setAnimation(0, 'RedPepperMeter_IDLE', true);
        orangeBonusMeter.state.setAnimation(0, 'OrangePepperMeter_IDLE', true);
        yellowBonusMeter.state.setAnimation(0, 'YellowPepperMeter_IDLE', true);
        greenBonusMeter.state.setAnimation(0, 'GreenPepperMeter_IDLE', true);
    }

    function populateMeters() {
        collectPrizes = [
            prizeData.prizeTable["G"],
            prizeData.prizeTable["K"],
            prizeData.prizeTable["M"],
            prizeData.prizeTable["O"],
        ];

        displayList.redPepperPrize.text = SKBeInstant.formatCurrency(collectPrizes[0]).formattedAmount;
        displayList.orangePepperPrize.text = SKBeInstant.formatCurrency(collectPrizes[1]).formattedAmount;
        displayList.yellowPepperPrize.text = SKBeInstant.formatCurrency(collectPrizes[2]).formattedAmount;
        displayList.greenPepperPrize.text = SKBeInstant.formatCurrency(collectPrizes[3]).formattedAmount;
    }

    // Add the proper PIP depending on the color. :)

    function addPipToMeter(colour) {

        switch (colour) {
            case "red":
                {
                    redPips[redPipIndex].renderable = true;
                    redPips[redPipIndex].state.setAnimation(0, 'Reveal', false);
                    redBonusMeter.state.setAnimation(0, 'RedPepperMeter_REVEAL', false);
                    redPipIndex++;
                    audioIndex = redPipIndex;
                    break;
                }

            case "orange":
                {
                    orangePips[orangePipIndex].renderable = true;
                    orangePips[orangePipIndex].state.setAnimation(0, 'Reveal', false);
                    orangeBonusMeter.state.setAnimation(0, 'OrangePepperMeter_REVEAL', false);
                    orangePipIndex++;
                    audioIndex = orangePipIndex;
                    break;
                }

            case "yellow":
                {
                    yellowPips[yellowPipIndex].renderable = true;
                    yellowPips[yellowPipIndex].state.setAnimation(0, 'Reveal', false);
                    yellowBonusMeter.state.setAnimation(0, 'YellowPepperMeter_REVEAL', false);
                    yellowPipIndex++;
                    audioIndex = yellowPipIndex;
                    break;
                }

            case "green":
                {
                    greenPips[greenPipIndex].renderable = true;
                    greenPips[greenPipIndex].state.setAnimation(0, 'Reveal', false);
                    greenBonusMeter.state.setAnimation(0, 'GreenPepperMeter_REVEAL', false);
                    greenPipIndex++;
                    audioIndex = greenPipIndex;
                    break;
                }
        }

        // https://jira.g2-networks.net/browse/CANDY-85
        // Adding audio delay here, rather than delaying overall update by a second in 'bonusPickPoint'
        // as this could result in the bonus prize value being updated too late on return to BaseGame,
        // and therefore prize value on bonus symbol showing incorrect value
        Tween.delayedCall(1, () => {
            audio.play('BonusMeterReveal' + audioIndex);
        });

        checkFilledPips();


    }

    function createBonusMultiplierMeter() {
        multiplierMeter = new PIXI.spine.Spine(resLib.spine['bonusMultiplierMeter'].spineData);
        multiplierMeter.state.setAnimation(0, 'MultiplierMeter_STATIC', true);
        displayList.multiplierMeter.addChild(multiplierMeter);
    }

    function checkFilledPips() {


        if (redPipIndex === 4) {

            redBonusMeter.state.setAnimation(0, 'RedPepperMeter_FILLED', true);
            msgBus.publish('game.bonusArea.updateBonusMoney', {
                collect: collectPrizes[0],
                multiplier: currentMultiplierNumber,
                data: collectPrizes[0] * currentMultiplierNumber
            });

            msgBus.publish('game.bonusArea.meterFilled');


        }

        if (orangePipIndex === 4) {
            orangeBonusMeter.state.setAnimation(0, 'OrangePepperMeter_FILLED', true);
            msgBus.publish('game.bonusArea.updateBonusMoney', {
                collect: collectPrizes[1],
                multiplier: currentMultiplierNumber,
                data: collectPrizes[1] * currentMultiplierNumber
            });
            msgBus.publish('game.bonusArea.meterFilled');

        }

        if (yellowPipIndex === 4) {
            yellowBonusMeter.state.setAnimation(0, 'YellowPepperMeter_FILLED', true);
            msgBus.publish('game.bonusArea.updateBonusMoney', {
                collect: collectPrizes[2],
                multiplier: currentMultiplierNumber,
                data: collectPrizes[2] * currentMultiplierNumber
            });
            msgBus.publish('game.bonusArea.meterFilled');

        }

        if (greenPipIndex === 4) {
            greenBonusMeter.state.setAnimation(0, 'GreenPepperMeter_FILLED', true);
            msgBus.publish('game.bonusArea.updateBonusMoney', {
                collect: collectPrizes[3],
                multiplier: currentMultiplierNumber,
                data: collectPrizes[3] * currentMultiplierNumber
            });
            msgBus.publish('game.bonusArea.meterFilled');

        }

    }

    // Animate multipliers numbers on the bottom.

    function checkMultipliers(number) {

        this.number = number;
        currentMultiplierNumber = currentMultiplierNumber + this.number;
        var values = arrayOfMultiplierNumbers.slice(0, currentMultiplierNumber);

        // highlight all numbers achieved, including the one with animation. :)

        Tween.delayedCall(1, () => {
            values.forEach(function(number) {

                // position the multiplier Box in the current number achieved. 
                displayList.multiplierNumbersBox.x = displayList.multiplierNumberValue.x = displayList['numberMeter' + number].x + 13;
                displayList.multiplierNumbersBox.y = displayList.multiplierNumberValue.y = displayList['numberMeter' + number].y + 25;
                displayList.multiplierNumberValue.visible = true;

                if (number < 10) {
                    displayList['numberMeter' + number].texture = PIXI.Texture.from('bonusMultiMeterNum_0' + number + '_On');
                    displayList.multiplierNumberValue.texture = PIXI.Texture.from('bonusMultiMeterBoxNum_0' + number);
                } else {
                    displayList['numberMeter' + number].texture = PIXI.Texture.from('bonusMultiMeterNum_' + number + '_On');
                    displayList.multiplierNumberValue.texture = PIXI.Texture.from('bonusMultiMeterBoxNum_' + number);
                }

                multiplierNumberAnimation.renderable = true;
                multiplierNumberAnimation.state.setAnimation(0, 'MultiplierBox_TRIGGER', false);

                audio.play('increment');


            });

        });


    }

    function reset() {
        [
            redPips,
            orangePips,
            yellowPips,
            greenPips,
        ].forEach((pipType) => {
            pipType.forEach(pip => {
                pip.state.clearTrack(0);
                pip.skeleton.setToSetupPose();
            });
        });

        collectPrizes = [];
        currentMultiplierNumber = 1;
        audioIndex = 0;
        redPipIndex = 0;
        orangePipIndex = 0;
        yellowPipIndex = 0;
        greenPipIndex = 0;

        displayList.multiplierNumbersBox.x = displayList.multiplierNumberValue.x = displayList['numberMeter' + 1].x + 13;
        displayList.multiplierNumbersBox.y = displayList.multiplierNumberValue.y = displayList['numberMeter' + 1].y + 25;
        multiplierMeter.state.setAnimation(0, 'MultiplierMeter_STATIC', true);

        displayList.multiplierNumberValue.texture = PIXI.Texture.from('bonusMultiMeterBoxNum_01');


        for (let i = 1; i <= 20; i++) {

            if (i < 10) {
                displayList['numberMeter' + i].texture = PIXI.Texture.from('bonusMultiMeterNum_0' + i + '_Off');

            } else {
                displayList['numberMeter' + i].texture = PIXI.Texture.from('bonusMultiMeterNum_' + i + '_Off');

            }

        }


        pauseAtFirstFrame();
    }



    return {
        init: init,
        reset: reset,
        idle: idle,
        addPipToMeter: addPipToMeter,
        checkMultipliers: checkMultipliers,
        pause: pauseAtFirstFrame,
        populateMeters: populateMeters
    };
});