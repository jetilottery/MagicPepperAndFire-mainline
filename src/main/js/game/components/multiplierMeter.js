define(function(require) {

    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var displayList = require('skbJet/componentLIT/standardIW/displayList');
    var orientation = require('skbJet/componentLIT/standardIW/orientation');
    const audio = require('skbJet/componentLIT/standardIW/audio');

    var columns = [
        [1],
        [1, 1],
        [1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1, 1]
    ];

    var activeColumns = [];

    function addMultiplier(position) {
        // Add multiplier and check if the columns are filled with multipliers.
        if (position > 9) {
            columns[4].shift();

            if (columns[4].length === 0) {
                multiplierFilled(5);
            }
        } else if (position > 5) {
            columns[3].shift();

            if (columns[3].length === 0) {
                multiplierFilled(4);
            }
        } else if (position > 2) {
            columns[2].shift();

            if (columns[2].length === 0) {
                multiplierFilled(3);
            }
        } else if (position > 0) {
            columns[1].shift();

            if (columns[1].length === 0) {
                multiplierFilled(2);
            }
        } else {
            columns[0].shift();

            if (columns[0].length === 0) {
                multiplierFilled(1);
            }
        }

    }

    function reset() {
        for (let i = 1; i < 6; i++) {

            displayList['multiplier' + i].visible = false;
            displayList['multiplier' + i + "Static"].visible = true;

        }

        columns = [
            [1],
            [1, 1],
            [1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1, 1]
        ];

        activeColumns = [];
    }

    function setMultiplierMask(){
        if (activeColumns.length){
            activeColumns.forEach(function(activeColumn){
                var mask = null;            
                //add the mask, only for portrait
                if (orientation.get() === orientation.PORTRAIT) {
                    mask = displayList['multiplier' + activeColumn + "Mask"];
                }
                displayList['multiplier' + activeColumn].mask = mask;
            });            
        }
    }

    msgBus.subscribe('GameSize.OrientationChange', setMultiplierMask);

    function multiplierFilled(column) {
        activeColumns.push(column);

        audio.play('revealMultiplierColumn');

        var columnToAnimate = displayList['multiplier' + column];

        setMultiplierMask();

        var staticMultiplerToHide = displayList['multiplier' + column + "Static"];
        columnToAnimate.visible = true;
        staticMultiplerToHide.visible = false;
        msgBus.publish('animation.play', {
            index: "multiplier" + column,
            anim: "Land_X" + column + "_intro",
            delay: 0,
            loop: false
        });
        msgBus.publish('animation.add', {
            index: "multiplier" + column,
            anim: "Land_X" + column + "_loop",
            delay: 0.9,
            loop: 1
        });
        msgBus.publish('animation.add', {
            index: "multiplier" + column,
            anim: "Land_X" + column + "_static",
            delay: 1.9,
            loop: true
        });
        msgBus.publish('game.pickPoint', {
            value: column
        });

        //update and multiply the prize * multiplier value when a row is filled.
        msgBus.publish('game.gameArea.updatePrize', {
            value: column
        });
    }

    msgBus.subscribe('game.multiplierMeter.reset', reset);

    return {
        addMultiplier: addMultiplier,
        reset: reset,
        multiplierFilled: multiplierFilled
    };
});