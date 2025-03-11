define(function(require) {
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var displayList = require('skbJet/componentLIT/standardIW/displayList');
    var resLib = require('skbJet/component/resourceLoader/resourceLib');
    var gameConfig = require('skbJet/componentLIT/standardIW/gameConfig');
    var PIXI = require('com/pixijs/pixi');
    require('com/pixijs/pixi-particles');
    require('com/gsap/plugins/PixiPlugin');
    require('com/gsap/TweenLite');

    var Tween = window.TweenLite;
    var spineAnim_Buy;
    var anims = {}; // Button overrides. Some buttons should *never* show based on env or config
    var overrides = {}; // Keep track of scheduled button updates so we can cancel if needed
    var timeouts = {};

    function init() {
        var buyButton = displayList.buyButtonAnim;

        anims = {
            buy: buyButton,
        };

        // Set up spine project
        spineAnim_Buy = new PIXI.spine.Spine(resLib.spine['BuyButtonPrompt'].spineData);
        buyButton.addChild(spineAnim_Buy);
        buyButton.visible = false;

        setStateOut({
            loop: true
        });

        // Add listeners to buy and try buttons

        displayList.buyButton.on('press', function() {
            showHide(buyButton, false);
        });

        displayList.buyButton.on('mouseover', function() {
            setStateOver({
                loop: true
            });
        });

        displayList.buyButton.on('mouseout', function() {
            setStateOut({
                loop: true
            });
        });

        //msgBus.subscribe('GameSize.OrientationChange', onOrientationChange);
        msgBus.subscribe('UI.updateButtons', updateButtons);
    }



    function setStateOut(data) {
        var nextState;
        var doLoop = data.loop || false;
        var syncTime = data.sync || 0;
        nextState = 'LAND_prompt';
        spineAnim_Buy.state.setAnimation(syncTime, nextState, doLoop);
    }

    function setStateOver(data) {
        var nextState;
        var doLoop = data.loop || false;
        var syncTime = data.sync || 0;
        nextState = 'LAND_overlay';
        spineAnim_Buy.state.setAnimation(syncTime, nextState, doLoop);
    }

    /**
     * Duplicate of updateButtons from standardIW buttonBar - so we can show/hide the animations using the same events
     * used to show/hide the buttons themselves, taking into account compulsion delays etc
     */

    function updateButtons(inConfig) {
        Object.keys(inConfig).forEach(function updateButton(buttonName) {

            // Skip if not a named button animation
            if (anims[buttonName] === undefined) {
                return;
            }

            var bConf = inConfig[buttonName];

            // If we're altering visibility cancel any scheduled updates to this button animation

            if (timeouts[buttonName] !== undefined && (bConf.visible !== undefined || typeof bConf === 'number' || typeof bConf === 'boolean')) {
                clearTimeout(timeouts[buttonName]);
                timeouts[buttonName] = undefined;
            } // Update button animation visibility


            if (bConf === true || bConf.visible === true) {
                if (buttonName === 'buy') {
                    timeouts[buttonName] = setTimeout(function showButtonAfterDelay() {
                      showHide(anims[buttonName], true);
                      timeouts[buttonName] = undefined;
                    }, 2000);
                  } else {
                  // Button animation will be shown if it isn't blocked in this environment
                    showHide(anims[buttonName], overrides[buttonName] !== false);
                  }
            } else if (bConf === false || bConf.visible === false) {
                // Button animation will be hidden
                showHide(anims[buttonName], false);
            } else if (typeof bConf === 'number') {
                // Button animation will be shown after the specified delay
                timeouts[buttonName] = setTimeout(function showButtonAfterDelay() {
                    showHide(anims[buttonName], true);
                    timeouts[buttonName] = undefined;
                }, bConf * 1000);
            }
        });
    }



    /**
     * Duplicate of showHide from standardIW buttonBar - so we can show/hide the animations in sync with the buttons
     * including fastFade/fastFadeDuration
     */

    function showHide(anim, show) {
        if (gameConfig.fastFadeButtons) {
            Tween.to(anim, gameConfig.fastFadeDuration, {
                alpha: show ? 1 : 0,
                onStart: function onStart() {
                    if (show) {
                        anim.visible = show;
                    }
                },
                onComplete: function onComplete() {
                    anim.visible = show;
                }
            });
        } else {
            anim.visible = show;
        }
    }

    return {
        init: init
    };
});