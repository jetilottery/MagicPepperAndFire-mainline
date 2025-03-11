define(require => {

    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentLIT/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentLIT/standardIW/autoPlay');
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const textStyles = require('skbJet/componentLIT/standardIW/textStyles');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const orientation = require('skbJet/componentLIT/standardIW/orientation');
    const multiplierMeter = require('game/components/multiplierMeter');
    const meterData = require('skbJet/componentLIT/standardIW/meterData');
    const bonusArea = require('game/components/bonus/bonusArea');
    const transitionMananger = require('game/components/transitionManager');
    const FittedText = require('skbJet/componentLIT/standardIW/components/fittedText');



    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenLite;
    var controller;
    var animation;

    const spineAnimationsArray = {

        0: 'Red/Red_',
        1: 'Sym1/Sym1_',
        2: 'Sym2/Sym2_',
        3: 'Sym3/Sym3_',
        4: 'Sym4/Sym4_',
        5: 'Sym5/Sym5_',
        6: 'Sym6/Sym6_',
        7: 'Sym7/Sym7_',
        8: 'Sym8/Sym8_',
        9: 'Gold/Gold_',

    };

    class PickPoint extends Pressable {
        constructor(parent, reveal, spine) {
            super();

            this.spine = spine;
            this.revealSpine = reveal;
            this.id = this;

            //console.log("PickPoint --> " + this.id);

            this.spine.interactive = false;
            this.spine.interactiveChildren = false;

            this.revealSpine.interactive = false;
            this.revealSpine.interactiveChildren = false;

            this.spineLayer = displayList.pointArraySpineLayer;

            // Create all the empty sprites
            this.symbolAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.symbolAnim.loop = false;
            this.symbolAnim.visible = false;

            this.prizeValue = new FittedText(''); //new PIXI.Text('');
            this.prizeValue.style = textStyles.parse('prizeValueNoWin');
            this.prizeValue.y = 50;
            this.prizeValue.maxWidth = 110;

            this.parent = parent;
            // Center everything
            this.symbolAnim.anchor.set(0.5);
            this.prizeValue.anchor.set(0.55, 0.5);


            this.hitArea = new PIXI.Rectangle(-50, -50, 110, 110);


            this.holdArea = new PIXI.Container();

            this.spineLayer.addChild(this.holdArea);
            this.holdArea.addChild(this.revealSpine);
            this.holdArea.addChild(this.spine);

            this.spine.position.set(this.parent.x, this.parent.y);
            this.revealSpine.position.set(this.parent.x, this.parent.y);
            this.revealSpine.scale.set(0.8);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild(this.symbolAnim);
            // this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.resultContainer.y = -12;

            this.appendArray = {
                'resultContainer': this.resultContainer,
                'prizeValue': this.prizeValue,
            };

            Object.keys(this.appendArray).forEach(e => {
                this.addChild(this.appendArray[e]);
                this.appendArray[e].name = e;
            });

            // State
            this.revealed = false;
            this.number = undefined;
            this.prize = "";

            this.lastPoint = false;

            this.revealSpine.renderable = false;

            this.win = false;
            this.bonus = false;

            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });

            this.on('mouseover', () => {
                msgBus.publish('game.gameArea.hoverOver', {
                    index: this.childPosition
                });
            });

            this.on('mouseout', () => {
                msgBus.publish('game.gameArea.mouseout', {
                    index: this.childPosition
                });
            });

            msgBus.publish('animation.play', {
                index: this.parent.name,
                anim: 'Static',
                delay: 0,
            });

            msgBus.subscribe('Game.AutoPlayStart', () => {
                if (!this.revealed) {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'Static',
                        delay: 0,
                        loop: true,
                    });
                }
            });

            msgBus.subscribe('GameSize.OrientationChange', this.onOrientationChange);


            //msgBus.subscribe('game.pickPoint.showPrizeValueForBonus', this.updateBonusSymbolAmount);

            msgBus.subscribe('game.pickPoint.showPrizeValueForBonus', (data) => {

                // if we get a bonus and we return to base game...BOOM, update win and make it visible
                if (this.number[0] === "9") {
                    //console.log(data.data);
                    this.prizeValue.alpha = 1;
                    this.prizeValue.visible = true;
                    this.prizeValue.text = SKBeInstant.formatCurrency(data.data).formattedAmount;
                }

            });

            this.enabled = false;

            controller = orientation.get() === orientation.LANDSCAPE ? 'LAND_idle' : 'PORT_idle';

            msgBus.publish('animation.play', {
                index: 'bonusSpineController',
                anim: controller,
                delay: 0,
                loop: 0
            });

            //msgBus.subscribe('game.pickPoint.updateBonusAmount', this.updateBonusAmount);

            msgBus.publish('animation.setEvents', {
                index: this.parent.name,
                event: {
                    // THIS IS THE EVENT TRIGGERED BY SPINE!!
                    'showGem': () => {

                        if (autoPlay.enabled) {
                            //if ([0, 5, 10, 15].indexOf(this.childPosition) != -1) {
                            audio.play('playAllSound');
                            //}
                        }

                        this.symbolAnim.alpha = 0;

                        this.prizeValue.visible = true;
                        this.prizeValue.alpha = 0;


                        //console.log(" <--- NUMBER SWITCH  --> " + this.number[0]);

                        switch (this.number[0]) {
                            case "0":
                                {
                                    //console.log("FOUND A RED CHILI!!!");
                                    //console.log("CHILD FOUNT POSITION: " + this.childPosition);

                                    // Add multiplier and its index and column
                                    multiplierMeter.addMultiplier(this.childPosition);

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpine.renderable = true;
                                        audio.play('win');
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[0] + 'Reveal',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[0] + 'Loop',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[0] + 'Static',
                                        delay: 2,
                                        loop: false,
                                    });

                                    this.prizeValue.style = textStyles.parse('prizeValueWin');

                                    Tween.to(this.prizeValue, 0.1, {
                                        alpha: 1,
                                        delay: 0.5
                                    });

                                    // working. :)
                                    this.prize = (this.prize * 1);
                                    this.win = true;

                                    meterData.win += this.prize;

                                    break;

                                }

                            case "9":
                                {

                                    //console.log("FOUND A BONUS!!!");


                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpine.renderable = true;
                                        audio.play('revealBonus');
                                    });



                                    // animate bonus background box
                                    animation = orientation.get() === orientation.LANDSCAPE ? 'LAND_win' : 'PORT_win';

                                    msgBus.publish('animation.add', {
                                        index: 'bonusSpineController',
                                        anim: animation,
                                        delay: 0,
                                        loop: true
                                    });

                                    // animate the bonus symbol
                                    msgBus.publish('animation.play', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[9] + 'Reveal',
                                        delay: 0,
                                        loop: -1
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[9] + 'Loop',
                                        delay: 0.8,
                                        loop: true
                                    });

                                    //stop the bonus symbol to be animated after a few seconds and make text visible.
                                    msgBus.publish('animation.add', {
                                        index: this.revealSpine.index,
                                        anim: spineAnimationsArray[9] + 'Static',
                                        delay: 7
                                    });


                                    //console.log("BONUS REVEAL SPINE INDEX:", this.revealSpine.index);



                                    this.bonus = true;

                                    this.resultContainer.y = 0;
                                    //this.prizeValue.visible = false;
                                    //this.prizeValue.alpha = 0;
                                    //this.prizeValue.visible = false;
                                    this.prizeValue.style = textStyles.parse('prizeValueWin');

                                    //go directly to Bonus
                                    if (!autoPlay.enabled) {


                                        this.goToBonus();
                                    }


                                    break;
                                }

                            default:
                                {


                                    Tween.to(this.symbolAnim, 0.1, {
                                        onStart: () => {

                                            Tween.delayedCall(0.1, () => {
                                                this.revealSpine.renderable = true;
                                            });

                                            msgBus.publish('animation.play', {
                                                index: this.revealSpine.index,
                                                anim: spineAnimationsArray[this.number[0]] + 'Static',
                                                delay: 0,
                                                loop: -1
                                            });

                                            msgBus.publish('animation.add', {
                                                index: this.revealSpine.index,
                                                anim: spineAnimationsArray[this.number[0]] + 'Reveal',
                                                delay: 0.5, //was 1
                                                loop: false
                                            });

                                            msgBus.publish('animation.add', {
                                                index: this.revealSpine.index,
                                                anim: spineAnimationsArray[this.number[0]] + 'Loop',
                                                delay: 1, //was 2
                                                loop: -1
                                            });
                                        },
                                    });

                                    Tween.to(this.symbolAnim, 0.5, {
                                        alpha: 0.5,
                                        delay: 0.5
                                    });

                                    this.prizeValue.style = textStyles.parse('prizeValueNoWin');

                                    Tween.to(this.prizeValue, 0.1, {
                                        alpha: 0.5,
                                        delay: 0.5
                                    });

                                    break;
                                }
                        }
                    }
                }
            });
        }

        //updateBonusSymbolAmount() {
        //this.prizeValue.text = SKBeInstant.formatCurrency(1000).formattedAmount;
        //  this.prizeValue.visible = true;
        //}


        // here we have to re-calculate the proper spine asset for portrait and landscape
        onOrientationChange() {

            //console.log('orientation changed! recalculate positions for infoBox');

            controller = orientation.get() === orientation.LANDSCAPE ? 'LAND_idle' : 'PORT_idle';
            msgBus.publish('animation.play', {
                index: 'bonusSpineController',
                anim: controller,
                delay: 0,
                loop: 0
            });

            if (animation) {

                animation = orientation.get() === orientation.LANDSCAPE ? 'LAND_win' : 'PORT_win';
                msgBus.publish('animation.add', {
                    index: 'bonusSpineController',
                    anim: animation,
                    delay: 0,
                    loop: true
                });

            }

        }


        async goToBonus() {
            if (!this.lastPoint) {
                // GO TO BONUS IF A BONUS SYMBOL IS FOUND (an not wait until the end of the reveal)
                //disable flame symbols (pickpoints) to prevent continue revealing them
                displayList.pointArray.interactiveChildren = false;

                msgBus.publish('UI.updateButtons', {
                    //autoPlay: false,
                    autoPlay: { visible: false },
                    ticketSelect: false,
                    help: {
                        enabled: false
                    }
                });

                await transitionMananger.transitionToNext();
                await bonusArea.enable();
            }
        }

        enable() {
            return new Promise(resolve => {
                displayList.pointArray.alpha = 1;
                this.reveal = resolve;
                this.enabled = true;
                this.interactive = true;
                this.interactiveChildren = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        mouseout(data) {
            if (!this.revealed) {
                if (data.index === this.childPosition) {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'Static',
                        delay: 0,
                        loop: 0
                    });
                    msgBus.publish('game.gameArea.updateLastIndex', {
                        index: this.childPosition
                    });
                } else {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'Static',
                        delay: 0,
                        loop: false
                    });
                }
            }
        }


        idle() {
            if (!this.revealed) {
                msgBus.publish('animation.play', {
                    index: this.parent.name,
                    anim: 'IdleLoop',
                    delay: 0,
                    loop: true
                });
                //msgBus.publish('animation.add', {
                //  index: this.parent.name,
                //anim: 'IdleToStatic', // IdleLoop
                //delay: 0,
                //loop: false
                //});
            }
        }

        hover(data) {
            if (!this.revealed) {
                if (data.index === this.childPosition) {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'MouseOver',
                        delay: 0,
                        loop: true
                    });
                    msgBus.publish('game.gameArea.updateLastIndex', {
                        index: this.childPosition
                    });
                } else {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'Static',
                        delay: 0,
                        loop: false
                    });
                }
            }
        }

        populate(number, prizeAmount) {
            this.number = number;

            //console.log('PRIZE AMOUNT--->', prizeAmount);

            if (prizeAmount !== undefined) {
                this.prize = SKBeInstant.formatCurrency(prizeAmount).amount;
            }
            this.prizeValue.visible = false;

            if (this.number !== "0" || this.number !== "9") {
                this.prizeValue.text = SKBeInstant.formatCurrency(this.prize).formattedAmount;
            }
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        stopAnimation() {

            //reset animation for covers to stop animating on reveal All clicked.
            if (!this.revealed) {
                msgBus.publish('animation.play', {
                    index: this.parent.name,
                    anim: 'Static',
                    delay: 0,
                    track: 0
                });
            }
        }


        reset() {

            this.enabled = false;
            this.symbolAnim.visible = false;
            this.symbolAnim.texture = PIXI.Texture.EMPTY;
            this.symbolAnim.alpha = 1;
            this.resultContainer.y = -12;
            this.revealed = false;
            this.matched = false;
            this.win = false;
            this.bonus = false;
            this.number = undefined;
            this.prizeValue.text = "";
            this.prize = 0;
            this.revealSpine.renderable = false;
            //this.interactive = true;
            //this.interactiveChildren = true;
            this.lastPoint = false;
            //re-activate clicks for pointArray (otherwise pickpoints won't be clickacable.)
            displayList.pointArray.interactiveChildren = true;

            //reset animation for covers
            msgBus.publish('animation.play', {
                index: this.parent.name,
                anim: 'Reset',
                delay: 0,
                track: 0
            });

            //reset animation for infoBar
            msgBus.publish('animation.play', {
                index: 'bonusSpineController',
                anim: controller,
                delay: 0,
                loop: 0
            });
        }

        async uncover() {
            await new Promise(resolve => {
                this.revealed = true;
                //this.removeAllListeners();
                this.interactiveChildren = false;
                this.spineLayer.setChildIndex(this.holdArea, this.spineLayer.children.length - 1);
                msgBus.publish('animation.play', {
                    index: this.parent.name,
                    anim: 'Reveal',
                    delay: 0,
                    loop: 0,
                });
                Tween.delayedCall(1, () => {
                    resolve();
                });
            });
        }

        static fromContainer(container) {
            const pickPoint = new PickPoint(container, container.children[container.children.length - 1], container.children[container.children.length - 2]);
            container.addChild(pickPoint);
            pickPoint.childPosition = container.parent.getChildIndex(container);
            return pickPoint;
        }
    }

    return PickPoint;
});