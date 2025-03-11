define(require => {
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const orientation = require('skbJet/componentLIT/standardIW/orientation');
    const PIXI = require('com/pixijs/pixi');

    // const _howToPlayConfig = {
    //     landscape: {
    //         MAX_HEIGHT: 40,
    //         DEFAULT_FONT_SIZE: 35
    //     },
    //     portrait: {
    //         MAX_HEIGHT: 40,
    //         DEFAULT_FONT_SIZE: 35
    //     }
    // };

    /*
     *
     */
    function init() {
        doSetup();
        msgBus.subscribe('GameSize.OrientationChange', doSetup);
    }

    /*
     *
     */
    function doSetup() {
        console.debug('Do Set Up');
        // TMP012-79 - TMP012_IQA_siteId 0:text overflow on how to play page and total demo win dialog
        // Auto resizing is not implemented on the tutorial plaque by default
        // let maxHeight = _howToPlayConfig[orientation.get().toLowerCase()].MAX_HEIGHT;
        // let defFont = _howToPlayConfig[orientation.get().toLowerCase()].DEFAULT_FONT_SIZE;

        // utils.autoResize(displayList['howToPlayPage1TopText'], maxHeight, defFont);
        // utils.autoResize(displayList['howToPlayPage1Line1'], maxHeight, defFont);
        // utils.autoResize(displayList['howToPlayPage1Line2'], maxHeight, defFont);

        // for (let i = 0; i < displayList.howToPlayPages.children.length; i++){
        //     utils.autoResize(displayList['howToPlayPage'+(i+1)], maxHeight, defFont);
        // }
        setHitArea();
    }

    function setHitArea() {
        if(orientation.get() === orientation.LANDSCAPE) {
            displayList.buyButton.hitArea = createRoundHitArea(64, 120);
            displayList.tryButton.hitArea = createRoundHitArea(64, 120);
            displayList.autoPlayStartButton.hitArea = createRoundHitArea(64, 120);
            displayList.autoPlayStopButton.hitArea = createRoundHitArea(64, 120);
            displayList.bonusRevealAllButton.hitArea = createRoundHitArea(64, 120);
        } else {
            displayList.buyButton.hitArea = new PIXI.Rectangle(-137,-43,275,85);
            displayList.tryButton.hitArea = new PIXI.Rectangle(-137,-43,275,85);
            displayList.autoPlayStartButton.hitArea = new PIXI.Rectangle(-137,-43,275,85);
            displayList.autoPlayStopButton.hitArea = new PIXI.Rectangle(-137,-43,275,85);
            displayList.bonusRevealAllButton.hitArea = new PIXI.Rectangle(-137,-43,275,85);

        }
    }

    function createRoundHitArea(segmentSize, wheelRadius) {
        let _wheelPins = [];

        function degToRad(degrees) {
            return degrees * 0.0174532925;
        }

        for (let i = 0; i < segmentSize; i++) {
            _wheelPins[i] = new PIXI.Point(
                wheelRadius * Math.cos(degToRad(360 / segmentSize * i)),
                wheelRadius * Math.sin(degToRad(360 / segmentSize * i))
            );
        }

        return new PIXI.Polygon(_wheelPins);
    }

    return {
        init
    };
});