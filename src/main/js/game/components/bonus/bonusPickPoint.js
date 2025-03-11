define(require => {
    const PIXI = require('com/pixijs/pixi');
    const Pressable = require('skbJet/componentLIT/standardIW/components/pressable');
    const autoPlay = require('skbJet/componentLIT/standardIW/autoPlay');
    //const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    //const textStyles = require('skbJet/componentLIT/standardIW/textStyles');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    const displayList = require('skbJet/componentLIT/standardIW/displayList');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const bonusMeter = require('game/components/bonus/bonusMeter');

    //const orientation = require('skbJet/componentLIT/standardIW/orientation');
    //const multiplierMeter = require('game/components/multiplierMeter');


    require('com/gsap/TweenLite');
    require('com/gsap/easing/EasePack');

    const Tween = window.TweenLite;

    const spineAnimationsArray = {
        0: 'Peppers/RedPepper_',
        1: 'Peppers/OrangePepper_',
        2: 'Peppers/YellowPepper_',
        3: 'Peppers/GreenPepper_',
    };

    const spineMultipliersAnimationsArray = {
        0: 'Multipliers/X1_',
        1: 'Multipliers/X2_',
        2: 'Multipliers/X3_',
        3: 'Multipliers/X4_',
        4: 'Multipliers/X5_',
    };

    class BonusPickPoint extends Pressable {
        constructor(parent, reveal, spine) {
            super();

            this.spineBonus = spine;
            this.revealSpineBonus = reveal;
            this.id = this;

            //console.log("bonusPoint --> " + this.id);

            this.spineBonus.interactive = false;
            this.spineBonus.interactiveChildren = false;

            this.revealSpineBonus.interactive = false;
            this.revealSpineBonus.interactiveChildren = false;

            this.spineLayerBonus = displayList.bonusArraySpineLayer;

            // Create all the empty sprites
            this.symbolAnim = new PIXI.extras.AnimatedSprite([PIXI.Texture.EMPTY]);
            this.symbolAnim.loop = false;
            this.symbolAnim.visible = false;
            this.parent = parent;

            // Center everything
            this.symbolAnim.anchor.set(0.5);
            this.hitArea = new PIXI.Rectangle(-50, -50, 110, 110);
            this.holdArea = new PIXI.Container();

            this.spineLayerBonus.addChild(this.holdArea);
            this.holdArea.addChild(this.revealSpineBonus);
            this.holdArea.addChild(this.spineBonus);

            this.spineBonus.position.set(this.parent.x, this.parent.y);
            this.revealSpineBonus.position.set(this.parent.x, this.parent.y);
            //this.revealSpineBonus.scale.set(0.8);

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.addChild(this.symbolAnim);
            // this.resultContainer.visible = false;
            this.resultContainer.name = 'resultContainer';

            this.resultContainer.y = -12;

            this.appendArray = {
                'resultContainer': this.resultContainer,
                //'prizeValue': this.prizeValue,
            };

            Object.keys(this.appendArray).forEach(e => {
                this.addChild(this.appendArray[e]);
                this.appendArray[e].name = e;
            });

            // State
            this.revealed = false;
            this.number = undefined;
            this.prize = "";

            this.last = false;

            this.revealSpineBonus.renderable = false;

            this.win = false;

            this.on('press', () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });

            this.on('mouseover', () => {
                msgBus.publish('game.bonusArea.hoverOver', {
                    index: this.childPosition
                });
            });

            this.on('mouseout', () => {
                msgBus.publish('game.bonusArea.mouseout', {
                    index: this.childPosition
                });
            });

            msgBus.publish('animation.play', {
                index: this.parent.name,
                anim: 'Static',
                delay: 0,
            });

            this.enabled = false;


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


            msgBus.publish('animation.setEvents', {
                index: this.parent.name,
                event: {
                    // THIS IS THE EVENT TRIGGERED BY SPINE!!
                    'showGem': () => {

                        //if (!autoPlay.enabled) {
                        //  audio.play('BonusSymbolReveal');
                        //}

                        this.symbolAnim.alpha = 0;

                        switch (this.number) {
                            case "W":
                                {


                                    //console.log("FOUND AN RED PEPPER!!!");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        //audio.play('arrowWin');
                                    });

                                    // Add pip counter to the collector
                                    // https://jira.g2-networks.net/browse/CANDY-85 - no longer using delayed call (see jira and 'bonusMeter.js' for details)
                                    bonusMeter.addPipToMeter("red");

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[0] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[0] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    break;

                                }

                            case "X":
                                {

                                    //console.log("FOUND AN ORANGE PEPPER!!!");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                    });

                                    // Add pip counter to the collector
                                    // https://jira.g2-networks.net/browse/CANDY-85 - no longer using delayed call (see jira and 'bonusMeter.js' for details)
                                    bonusMeter.addPipToMeter("orange");

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[1] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[1] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    break;
                                }

                            case "Y":
                                {

                                    //console.log("FOUND AN YELLOW PEPPER!!!");                                    

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        //audio.play('arrowWin');
                                    });

                                    // Add pip counter to the collector
                                    // https://jira.g2-networks.net/browse/CANDY-85 - no longer using delayed call (see jira and 'bonusMeter.js' for details)
                                    bonusMeter.addPipToMeter("yellow");

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[2] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[2] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    break;
                                }

                            case "Z":
                                {

                                    //console.log("FOUND A GREEN PEPPER!!!");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        //audio.play('arrowWin');
                                    });

                                    // Add pip counter to the collector
                                    // https://jira.g2-networks.net/browse/CANDY-85 - no longer using delayed call (see jira and 'bonusMeter.js' for details)
                                    bonusMeter.addPipToMeter("green");

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[3] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineAnimationsArray[3] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    break;
                                }

                            case "1":
                                {

                                    //console.log("FOUND A X1");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        audio.play('BonusSymbolMultiplierReveal');
                                    });

                                    Tween.delayedCall(0.2, () => {
                                        bonusMeter.checkMultipliers(1);
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[0] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[0] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    this.bringToFront();

                                    break;
                                }


                            case "2":
                                {

                                    //console.log("FOUND A X2");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        audio.play('BonusSymbolMultiplierReveal');
                                    });

                                    Tween.delayedCall(0.2, () => {
                                        bonusMeter.checkMultipliers(2);
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[1] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[1] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    this.bringToFront();

                                    break;
                                }

                            case "3":
                                {

                                    //console.log("FOUND A X3");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        audio.play('BonusSymbolMultiplierReveal');
                                    });

                                    Tween.delayedCall(0.2, () => {
                                        bonusMeter.checkMultipliers(3);
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[2] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[2] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    this.bringToFront();

                                    break;
                                }

                            case "4":
                                {

                                    //console.log("FOUND A X4");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        audio.play('BonusSymbolMultiplierReveal');
                                    });

                                    Tween.delayedCall(0.2, () => {
                                        bonusMeter.checkMultipliers(4);
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[3] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[3] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    this.bringToFront();

                                    break;
                                }

                            case "5":
                                {

                                    //console.log("FOUND A X5");

                                    Tween.delayedCall(0.1, () => {
                                        this.revealSpineBonus.renderable = true;
                                        audio.play('BonusSymbolMultiplierReveal');
                                    });

                                    Tween.delayedCall(0.2, () => {
                                        bonusMeter.checkMultipliers(5);
                                    });

                                    msgBus.publish('animation.play', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[4] + 'REVEAL',
                                        delay: 0,
                                        loop: false
                                    });

                                    msgBus.publish('animation.add', {
                                        index: this.revealSpineBonus.index,
                                        anim: spineMultipliersAnimationsArray[4] + 'IDLE',
                                        delay: 0.8,
                                        loop: 2
                                    });

                                    this.bringToFront();

                                    break;
                                }
                        }


                    }
                }
            });
        }

        bringToFront() {
            // we need to move this pick point to the front
            // as otherwise the spineAnim will underlap neighbouring pickPoints
            this.parent.parent.setChildIndex(
                this.parent,
                this.parent.parent.children.length - 1
            );
        }

        enable() {
            return new Promise(resolve => {
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
                    msgBus.publish('game.bonusArea.updateLastIndex', {
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
                    anim: 'Idle', // IdleLoop
                    delay: 0,
                    loop: true
                });
            }
        }

        hover(data) {
            if (!this.revealed) {
                if (data.index === this.childPosition) {
                    msgBus.publish('animation.play', {
                        index: this.parent.name,
                        anim: 'Mouseover',
                        delay: 0,
                        loop: true
                    });
                    msgBus.publish('game.bonusArea.updateLastIndex', {
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

        populate(number /*, prizeAmount*/ ) {
            this.number = number;

            /*
                  if (prizeAmount !== undefined) {
                    this.prize = SKBeInstant.formatCurrency(prizeAmount).amount;
                  }
                  this.prizeValue.visible = false;

                  if (this.number !== 0 || this.number !== 9) {
                    this.prizeValue.text = SKBeInstant.formatCurrency(this.prize).formattedAmount;
                  }
                  */
        }

        dimNonRevealedPickPoints() {

            this.enabled = false;
            this.reveal = undefined;

            if (!this.revealed) {

                this.interactive = false;
                //displayList[this.parent.name].alpha = 0.5

                Tween.to(displayList[this.parent.name], 0.5, {
                    alpha: 0.5
                });

                msgBus.publish('animation.play', {
                    index: this.parent.name,
                    anim: 'Static',
                    delay: 0,
                    track: 0
                });
            }

        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        reset() {

            //console.log("Reset bonus symbols...");

            this.alpha = 1;
            this.parent.alpha = 1;
            this.enabled = false;
            this.symbolAnim.visible = false;
            this.symbolAnim.texture = PIXI.Texture.EMPTY;
            this.symbolAnim.alpha = 1;
            this.resultContainer.y = -12;
            this.revealed = false;
            this.matched = false;
            this.win = false;
            this.number = undefined;
            //this.prizeValue.text = "";
            this.revealSpineBonus.renderable = false;
            this.interactive = true;
            this.interactiveChildren = true;
            this.last = false;
            // msgBus.publish('animation.clearTrack', {
            //     index: this.parent.name,
            //     all:true
            // });

            msgBus.publish('animation.play', {
                index: this.parent.name,
                anim: 'Static',
                delay: 0,
                track: 0
            });


        }

        async uncover() {
            await new Promise(resolve => {
                this.revealed = true;
                //this.removeAllListeners();
                this.interactiveChildren = false;
                this.spineLayerBonus.setChildIndex(this.holdArea, this.spineLayerBonus.children.length - 1);
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
            const bonusPickPoint = new BonusPickPoint(container, container.children[container.children.length - 1], container.children[container.children.length - 2]);
            container.addChild(bonusPickPoint);
            bonusPickPoint.childPosition = container.parent.getChildIndex(container);
            return bonusPickPoint;
        }
    }

    return BonusPickPoint;
});