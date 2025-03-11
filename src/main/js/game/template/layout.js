"use strict";

define({
    _BASE_APP: {
        children: ['background', 'gameAreas', 'logo_static', 'winUpToLabel', 'winUpTo', 'endGameNoPlaqueContainerClick', 'transitionContainer', 'endGameNoPlaqueContainer', 'endGameDismissRectangle']
    },
    // --------------------------------------------------
    // BACKGROUND (SPINE)
    // --------------------------------------------------
    background: {
        type: 'sprite',
        anchor: 0.5,
        children: ['bonusGameBackground', 'baseGameBackground']
    },
    // --------------------------------------------------
    // GAME AREA BACKGROUND
    // --------------------------------------------------
    baseGameBackground: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    // --------------------------------------------------
    // BONUS AREA BACKGROUND
    // --------------------------------------------------
    bonusGameBackground: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    // --------------------------------------------------
    // TRANSITION CONTAINER
    // --------------------------------------------------
    transitionContainer: {
        type: 'container',
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    // --------------------------------------------------
    // GAME AREAS
    // --------------------------------------------------
    gameAreas: {
        type: 'container',
        children: ['multiplierContainer', 'symbolsBackground', 'bonusContainer', 'bonusSymbolHoldingArea']
    },
    bonusSymbolHoldingArea: {
        type: 'container'
    },
    // --------------------------------------------------
    // MULTIPLIER CONTAINER
    // --------------------------------------------------
    multiplierContainer: {
        type: 'sprite',
        children: ['multiplier1', 'multiplier1Mask', 'multiplier2', 'multiplier2Mask', 'multiplier3', 'multiplier3Mask', 'multiplier4', 'multiplier4Mask', 'multiplier5', 'multiplier5Mask'],
        landscape: {
            x: 590,
            y: -50,
            scale: 1.1
        },
        portrait: {
            x: 300,
            y: 300,
            scale: 1
        }
    },
    multiplierStaticSymbols: {
        type: 'container',
        children: ['multiplier1Static', 'multiplier2Static', 'multiplier3Static', 'multiplier4Static', 'multiplier5Static'],
        landscape: {
            x: 0,
            y: 495,
            scale: 0.8
        },
        portrait: {
            x: -42,
            y: 755,
            scale: 0.8
        }
    },
    multiplier1Static: {
        type: 'sprite',
        texture: 'multiplier_1x_LargeOff',
        x: 95,
        scale: 0.9
    },
    multiplier2Static: {
        type: 'sprite',
        texture: 'multiplier_2x_LargeOff',
        x: 280,
        scale: 0.9
    },
    multiplier3Static: {
        type: 'sprite',
        texture: 'multiplier_3x_LargeOff',
        x: 470,
        scale: 0.9
    },
    multiplier4Static: {
        type: 'sprite',
        texture: 'multiplier_4x_LargeOff',
        x: 655,
        scale: 0.9
    },
    multiplier5Static: {
        type: 'sprite',
        texture: 'multiplier_5x_LargeOff',
        x: 850,
        scale: 0.9
    },
    multiplier1: {
        type: 'container',
        visible: false,
        landscape: {
            x: 120,
            y: 410,
            scale: 0.9
        },
        portrait: {
            x: 70,
            y: 490,
            scale: 1
        }
    },
    multiplier1Mask: {
        type: 'rectangle',
        anchor: 0.5,
        visible: false,
        portrait: {
            width: 240,
            height: 480,
            x: -300,
            y: 380,
            fill: 0xffff00
        }
    },
    multiplier2: {
        type: 'container',
        visible: false,
        landscape: {
            x: 120,
            y: 410,
            scale: 0.9
        },
        portrait: {
            x: 70,
            y: 490,
            scale: 1
        }
    },
    multiplier2Mask: {
        type: 'rectangle',
        anchor: 0.5,
        visible: false,
        portrait: {
            width: 220,
            height: 480,
            x: -140,
            y: 380,
            fill: 0xffffff
        }
    },
    multiplier3: {
        type: 'container',
        visible: false,
        landscape: {
            x: 120,
            y: 410,
            scale: 0.9
        },
        portrait: {
            x: 70,
            y: 490,
            scale: 1
        }
    },
    multiplier3Mask: {
        type: 'rectangle',
        anchor: 0.5,
        visible: false,
        portrait: {
            width: 220,
            height: 622,
            x: 0,
            y: 240,
            fill: 0xff77ff
        }
    },
    multiplier4: {
        type: 'container',
        visible: false,
        landscape: {
            x: 120,
            y: 410,
            scale: 0.9
        },
        portrait: {
            x: 70,
            y: 490,
            scale: 1
        }
    },
    multiplier4Mask: {
        type: 'rectangle',
        anchor: 0.5,
        visible: false,
        portrait: {
            width: 220,
            height: 747,
            x: 160,
            y: 115,
            fill: 0xccffff
        }
    },
    multiplier5: {
        type: 'container',
        visible: false,
        landscape: {
            x: 120,
            y: 410,
            scale: 0.9
        },
        portrait: {
            x: 70,
            y: 490,
            scale: 1
        }
    },
    multiplier5Mask: {
        type: 'rectangle',
        anchor: 0.5,
        visible: false,
        portrait: {
            width: 220,
            height: 872,
            x: 310,
            y: -10,
            fill: 0xcc00EE
        }
    },
    // --------------------------------------------------
    // GAME AREA SYMBOLS
    // --------------------------------------------------
    symbolsBackground: {
        type: 'sprite',
        children: ['multiplierStaticSymbols', 'infoBarContainer', 'pointArraySpineLayer', 'pointArray', 'bonusBackground'],
        landscape: {
            x: 310,
            y: 165
        },
        portrait: {
            x: 8,
            y: 300
        }
    },
    bonusBackground: {
        type: 'container',
        children: ['bonusSpineContainer', 'bonusPointContainerArea', 'bonusInfoText', 'bonusInfoText2'],
        landscape: {
            x: 230,
            y: 140,
            scale: 1
        },
        portrait: {
            x: 230,
            y: 340,
            scale: 1
        }
    },
    bonusInfoText: {
        type: 'text',
        wordWrap: true,
        wordWrapWidth: 220,
        maxWidth: 220,
        string: 'bonusInfo',
        style: 'bonusInfo',
        landscape: {
            x: -410,
            y: 200,
            scale: 1
        },
        portrait: {
            x: -30,
            y: -120,
            scale: 1.1
        }
    },
    bonusInfoText2: {
        type: 'text',
        wordWrap: true,
        wordWrapWidth: 220,
        maxWidth: 220,
        string: 'bonusInfo2',
        style: 'bonusInfo2',
        alpha: 0,
        landscape: {
            x: -410,
            y: 200,
            scale: 1
        },
        portrait: {
            x: -30,
            y: -120,
            scale: 1.1
        }
    },
    bonusSpineContainer: {
        type: 'container'
    },
    bonusPointContainer: {
        type: 'container',
        x: -40,
        y: -10
    },
    chiliSprite: {
        type: 'sprite',
        texture: 'bonusInfo_Win',
        x: 100,
        y: -10,
        anchor: 0.5,
        scale: 1
    },
    yellowChileSprite: {
        type: 'sprite',
        texture: 'bonusInfo_Bonus',
        x: 100,
        y: -10,
        anchor: 0.5,
        scale: 1,
        alpha: 0
    },
    bonusPointContainerArea: {
        type: 'container',
        children: ['bonusPointContainer', 'chiliSprite', 'yellowChileSprite'],
        landscape: {
            x: -570,
            y: 220
        },
        portrait: {
            x: -200,
            y: -80
        }
    },
    infoBarContainer: {
        type: 'container',
        children: ['infoBar', 'infoBarText'],
        anchor: 0.5,
        landscape: {
            x: 440,
            y: 550
        },
        portrait: {
            x: 400,
            y: 810
        }
    },
    infoBarText: {
        type: 'text',
        string: 'infoBarText',
        style: 'infoBar',
        fontSize: 28,
        maxWidth: 500,
        anchor: 0.5,
        align: 'center',
        x: 0,
        y: 0
    },
    infoBar: {
        type: 'sprite',
        anchor: 0.5
    },
    // --------------------------------------------------
    // BONUS
    // --------------------------------------------------
    bonusContainer: {
        type: 'container',
        children: ['bonusArraySpineLayer', 'pickerContainer', 'bonusInfoContainer', 'multiplierMeter', 'multiplierNumbersMeter', 'collectMetersBG', 'collectMetersIcons', 'collectMeters', 'collectMetersPrizes'],
        landscape: {
            y: 0
        },
        portrait: {
            y: -20
        }
    },
    pickerContainer: {
        type: 'container',
        children: ['picker1', 'picker2', 'picker3', 'picker4', 'picker5', 'picker6', 'picker7', 'picker8', 'picker9', 'picker10', 'picker11', 'picker12', 'picker13', 'picker14', 'picker15', 'picker16'],
        landscape: {
            x: 625,
            y: 150,
            scale: 0.9
        },
        portrait: {
            x: 160,
            y: 590,
            scale: 1
        }
    },
    bonusArraySpineLayer: {
        type: 'container',
        landscape: {
            x: 625,
            y: 150,
            scale: 0.9
        },
        portrait: {
            x: 160,
            y: 590,
            scale: 1
        }
    },
    multiplierMeter: {
        type: 'container',
        landscape: {
            x: 840,
            y: 705
        },
        portrait: {
            x: 400,
            y: 455
        }
    },
    multiplierNumbersMeter: {
        type: 'container',
        children: ['numberMeter1', 'numberMeter2', 'numberMeter3', 'numberMeter4', 'numberMeter5', 'numberMeter6', 'numberMeter7', 'numberMeter8', 'numberMeter9', 'numberMeter10', 'numberMeter11', 'numberMeter12', 'numberMeter13', 'numberMeter14', 'numberMeter15', 'numberMeter16', 'numberMeter17', 'numberMeter18', 'numberMeter19', 'numberMeter20', 'multiplierNumbersBox', 'multiplierNumberValue'],
        landscape: {
            x: 535,
            y: 680
        },
        portrait: {
            x: 95,
            y: 430
        }
    },
    multiplierNumbersBox: {
        type: 'container',
        anchor: 0.5
    },
    multiplierNumberValue: {
        type: 'sprite',
        texture: 'bonusMultiMeterBoxNum_01',
        anchor: 0.5
    },
    numberMeter1: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_01_Off',
        x: 4
    },
    numberMeter2: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_02_Off',
        x: 35
    },
    numberMeter3: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_03_Off',
        x: 66
    },
    numberMeter4: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_04_Off',
        x: 97
    },
    numberMeter5: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_05_Off',
        x: 125
    },
    numberMeter6: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_06_Off',
        x: 155
    },
    numberMeter7: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_07_Off',
        x: 185
    },
    numberMeter8: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_08_Off',
        x: 215
    },
    numberMeter9: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_09_Off',
        x: 245
    },
    numberMeter10: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_10_Off',
        x: 275
    },
    numberMeter11: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_11_Off',
        x: 305
    },
    numberMeter12: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_12_Off',
        x: 335
    },
    numberMeter13: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_13_Off',
        x: 365
    },
    numberMeter14: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_14_Off',
        x: 395
    },
    numberMeter15: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_15_Off',
        x: 425
    },
    numberMeter16: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_16_Off',
        x: 455
    },
    numberMeter17: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_17_Off',
        x: 485
    },
    numberMeter18: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_18_Off',
        x: 515
    },
    numberMeter19: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_19_Off',
        x: 545
    },
    numberMeter20: {
        type: 'sprite',
        texture: 'bonusMultiMeterNum_20_Off',
        x: 575
    },
    picker1: {
        type: 'container',
        landscape: {
            x: 0,
            y: 0
        },
        portrait: {
            x: 0,
            y: 0
        }
    },
    picker2: {
        type: 'container',
        landscape: {
            x: 160,
            y: 0
        },
        portrait: {
            x: 160,
            y: 0
        }
    },
    picker3: {
        type: 'container',
        landscape: {
            x: 320,
            y: 0
        },
        portrait: {
            x: 320,
            y: 0
        }
    },
    picker4: {
        type: 'container',
        landscape: {
            x: 480,
            y: 0
        },
        portrait: {
            x: 480,
            y: 0
        }
    },
    picker5: {
        type: 'container',
        landscape: {
            x: 0,
            y: 160
        },
        portrait: {
            x: 0,
            y: 160
        }
    },
    picker6: {
        type: 'container',
        landscape: {
            x: 160,
            y: 160
        },
        portrait: {
            x: 160,
            y: 160
        }
    },
    picker7: {
        type: 'container',
        landscape: {
            x: 320,
            y: 160
        },
        portrait: {
            x: 320,
            y: 160
        }
    },
    picker8: {
        type: 'container',
        landscape: {
            x: 480,
            y: 160
        },
        portrait: {
            x: 480,
            y: 160
        }
    },
    picker9: {
        type: 'container',
        landscape: {
            x: 0,
            y: 320
        },
        portrait: {
            x: 0,
            y: 320
        }
    },
    picker10: {
        type: 'container',
        landscape: {
            x: 160,
            y: 320
        },
        portrait: {
            x: 160,
            y: 320
        }
    },
    picker11: {
        type: 'container',
        landscape: {
            x: 320,
            y: 320
        },
        portrait: {
            x: 320,
            y: 320
        }
    },
    picker12: {
        type: 'container',
        landscape: {
            x: 480,
            y: 320
        },
        portrait: {
            x: 480,
            y: 320
        }
    },
    picker13: {
        type: 'container',
        landscape: {
            x: 0,
            y: 480
        },
        portrait: {
            x: 0,
            y: 480
        }
    },
    picker14: {
        type: 'container',
        landscape: {
            x: 160,
            y: 480
        },
        portrait: {
            x: 160,
            y: 480
        }
    },
    picker15: {
        type: 'container',
        landscape: {
            x: 320,
            y: 480
        },
        portrait: {
            x: 320,
            y: 480
        }
    },
    picker16: {
        type: 'container',
        landscape: {
            x: 480,
            y: 480
        },
        portrait: {
            x: 480,
            y: 480
        }
    },
    bonusInfoContainer: {
        type: 'container',
        children: ['bonusRevealAllButton', 'collectorMeterInfoText'],
        landscape: {
            x: 1295,
            y: 500
        },
        portrait: {
            x: 385,
            y: 1290
        }
    },
    collectorMeterInfoText: {
        type: 'text',
        wordWrap: true,
        string: 'collectorMeterInfoText',
        style: 'collectMeterInfo',
        landscape: {
            x: -140,
            y: -410,
            scale: 0.85,
            wordWrapWidth: 270,
            maxWidth: 520
        },
        portrait: {
            x: -370,
            y: -120,
            scale: 1.1,
            wordWrapWidth: 1080,
            maxWidth: 780
        }
    },
    bonusRevealAllButton: {
        type: 'button',
        //maxWidth: 230,
        portrait: {
            x: 19,
            y: 20,
            string: 'button_autoPlay_bonus_portrait',
            textures: {
                enabled: 'mainButtonEnabled',
                over: 'mainButtonOver',
                pressed: 'mainButtonPressed',
                disabled: 'mainButtonDisabled'
            }
        },
        landscape: {
            //x: 34,
            //y: 570,
            string: 'button_autoPlay_bonus_landscape',
            textures: {
                enabled: 'mainButtonLandEnabled',
                over: 'mainButtonLandOver',
                pressed: 'mainButtonLandPressed',
                disabled: 'mainButtonLandDisabled'
            }
        },
        style: {
            enabled: 'revealAllEnabled',
            over: 'revealAllEnabled',
            pressed: 'revealAllPressed',
            disabled: 'revealAllDisabled'
        }
    },

    /*
    bonusScoreContainer: {
        type: 'container',
        visible: false,
        children: ['totalWinBackground'],
        landscape: {
            x: -670,
            y: -70,
            scale: 1.10
        },
        portrait: {
            x: 10,
            y: 340,
            scale: 1
        }
    },
    */
    // ----------------------------------------------------------------------------
    // COLLECT BONUS METERS 
    // ----------------------------------------------------------------------------
    collectMeters: {
        type: 'container',
        children: ['redPepperMeter', 'orangePepperMeter', 'yellowPepperMeter', 'greenPepperMeter'],
        landscape: {
            x: 0,
            y: -20,
            scale: 1
        },
        portrait: {
            x: 80,
            y: -150,
            scale: 0.9
        }
    },
    collectMetersBG: {
        type: 'container',
        children: ['collectMeterBGRed', 'collectMeterBGOrange', 'collectMeterBGYellow', 'collectMeterBGGreen'],
        landscape: {
            x: 60,
            y: 215,
            scale: 1
        },
        portrait: {
            x: 100,
            y: 60,
            scale: 0.9
        }
    },
    collectMeterBGRed: {
        type: 'sprite',
        texture: 'bonusMeterRedBG'
    },
    collectMeterBGOrange: {
        type: 'sprite',
        texture: 'bonusMeterOrangeBG',
        landscape: {
            x: 0,
            y: 108
        },
        portrait: {
            x: 80,
            y: 100
        }
    },
    collectMeterBGYellow: {
        type: 'sprite',
        texture: 'bonusMeterYellowBG',
        landscape: {
            x: 0,
            y: 220
        },
        portrait: {
            x: 150,
            y: 200
        }
    },
    collectMeterBGGreen: {
        type: 'sprite',
        texture: 'bonusMeterGreenBG',
        landscape: {
            x: 0,
            y: 328
        },
        portrait: {
            x: 250,
            y: 300
        }
    },
    collectMetersPrizes: {
        type: 'container',
        children: ['redPepperPrize', 'orangePepperPrize', 'yellowPepperPrize', 'greenPepperPrize'],
        landscape: {
            x: 415,
            y: 120,
            scale: 1
        },
        portrait: {
            x: 420,
            y: -25,
            scale: 0.9
        }
    },
    collectMetersIcons: {
        type: 'container',
        children: ['redPip1', 'redPip2', 'redPip3', 'redPip4', 'orangePip1', 'orangePip2', 'orangePip3', 'orangePip4', 'yellowPip1', 'yellowPip2', 'yellowPip3', 'yellowPip4', 'greenPip1', 'greenPip2', 'greenPip3', 'greenPip4'],
        landscape: {
            x: 141,
            y: 251,
            scale: 1
        },
        portrait: {
            x: 400,
            y: 100,
            scale: 0.9
        }
    },
    redPepperMeter: {
        type: 'container',
        landscape: {
            x: 285,
            y: 270
        },
        portrait: {
            x: 250,
            y: 270
        }
    },
    orangePepperMeter: {
        type: 'container',
        landscape: {
            x: 285,
            y: 380
        },
        portrait: {
            x: 320,
            y: 370
        }
    },
    yellowPepperMeter: {
        type: 'container',
        landscape: {
            x: 285,
            y: 490
        },
        portrait: {
            x: 400,
            y: 470
        }
    },
    greenPepperMeter: {
        type: 'container',
        landscape: {
            x: 285,
            y: 600
        },
        portrait: {
            x: 500,
            y: 570
        }
    },
    redPepperPrize: {
        type: 'text',
        anchor: 0.5,
        style: 'collectPrizeRed',
        landscape: {
            x: 0,
            y: 132
        },
        portrait: {
            x: 0,
            y: 132
        }
    },
    orangePepperPrize: {
        type: 'text',
        anchor: 0.5,
        style: 'collectPrizeOrange',
        landscape: {
            x: 0,
            y: 245
        },
        portrait: {
            x: 70,
            y: 235
        }
    },
    yellowPepperPrize: {
        type: 'text',
        anchor: 0.5,
        style: 'collectPrizeYellow',
        landscape: {
            x: 0,
            y: 352
        },
        portrait: {
            x: 150,
            y: 335
        }
    },
    greenPepperPrize: {
        type: 'text',
        anchor: 0.5,
        style: 'collectPrizeGreen',
        landscape: {
            x: 0,
            y: 465
        },
        portrait: {
            x: 250,
            y: 435
        }
    },
    redPip1: {
        type: 'container',
        landscape: {
            x: 3,
            y: 0
        },
        portrait: {
            x: -245,
            y: -7
        }
    },
    redPip2: {
        type: 'container',
        landscape: {
            x: 56,
            y: 0
        },
        portrait: {
            x: -190,
            y: -7
        }
    },
    redPip3: {
        type: 'container',
        landscape: {
            x: 110,
            y: 0
        },
        portrait: {
            x: -135,
            y: -7
        }
    },
    redPip4: {
        type: 'container',
        landscape: {
            x: 163,
            y: 0
        },
        portrait: {
            x: -80,
            y: -7
        }
    },
    orangePip1: {
        type: 'container',
        landscape: {
            x: 3,
            y: 110
        },
        portrait: {
            x: -175,
            y: 90
        }
    },
    orangePip2: {
        type: 'container',
        landscape: {
            x: 56,
            y: 110
        },
        portrait: {
            x: -120,
            y: 90
        }
    },
    orangePip3: {
        type: 'container',
        landscape: {
            x: 110,
            y: 110
        },
        portrait: {
            x: -65,
            y: 90
        }
    },
    orangePip4: {
        type: 'container',
        landscape: {
            x: 163,
            y: 110
        },
        portrait: {
            x: -10,
            y: 90
        }
    },
    yellowPip1: {
        type: 'container',
        landscape: {
            x: 3,
            y: 220
        },
        portrait: {
            x: -95,
            y: 190
        }
    },
    yellowPip2: {
        type: 'container',
        landscape: {
            x: 56,
            y: 220
        },
        portrait: {
            x: -39,
            y: 190
        }
    },
    yellowPip3: {
        type: 'container',
        landscape: {
            x: 110,
            y: 220
        },
        portrait: {
            x: 15,
            y: 190
        }
    },
    yellowPip4: {
        type: 'container',
        landscape: {
            x: 163,
            y: 220
        },
        portrait: {
            x: 70,
            y: 190
        }
    },
    greenPip1: {
        type: 'container',
        landscape: {
            x: 3,
            y: 331
        },
        portrait: {
            x: 0,
            y: 290
        }
    },
    greenPip2: {
        type: 'container',
        landscape: {
            x: 56,
            y: 331
        },
        portrait: {
            x: 56,
            y: 290
        }
    },
    greenPip3: {
        type: 'container',
        landscape: {
            x: 110,
            y: 331
        },
        portrait: {
            x: 110,
            y: 290
        }
    },
    greenPip4: {
        type: 'container',
        landscape: {
            x: 163,
            y: 331
        },
        portrait: {
            x: 163,
            y: 290
        }
    },

    /*
     * LOGO
     */
    logo_static: {
        type: 'sprite',
        //anchor: 0.5,
        //children: ['logoSpine', 'logoSprite'],
        landscape: {
            texture: 'landscape_gameLogo',
            x: 0,
            y: 0
        },
        portrait: {
            texture: 'portrait_gameLogo',
            x: 0,
            y: 0
        }
    },
    winUpToLabel: {
        type: 'text',
        style: 'winUpToTitle',
        string: 'winUpTo',
        anchor: 0.5,
        maxWidth: 300,
        landscape: {
            x: 415,
            y: 290,
            scale: 0.8
        },
        portrait: {
            x: 400,
            y: 310,
            scale: 0.7
        }
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: 'container',
        children: ['winUpToIn', 'winUpToOut'],
        landscape: {
            x: 415,
            y: 350,
            scale: 0.8
        },
        portrait: {
            x: 400,
            y: 370,
            scale: 0.9
        }
    },
    winUpToIn: {
        type: 'container',
        children: ['winUpToInText']
    },
    winUpToInText: {
        type: 'text',
        string: 'winUpTo',
        maxWidth: 400,
        landscape: {
            anchor: 0.5,
            style: 'winUpTo'
        },
        portrait: {
            anchor: 0.5,
            style: 'winUpTo'
        }
    },
    winUpToOut: {
        type: 'container',
        children: ['winUpToOutText']
    },
    winUpToOutText: {
        type: 'text',
        maxWidth: 400,
        landscape: {
            anchor: 0.5,
            style: 'winUpTo'
        },
        portrait: {
            anchor: 0.5,
            style: 'winUpTo'
        }
    },

    /*
     * PLAYER NUMBERS
     */
    pointArray: {
        type: 'container',
        children: ['pickPoint1', 'pickPoint2', 'pickPoint3', 'pickPoint4', 'pickPoint5', 'pickPoint6', 'pickPoint7', 'pickPoint8', 'pickPoint9', 'pickPoint10', 'pickPoint11', 'pickPoint12', 'pickPoint13', 'pickPoint14', 'pickPoint15'],
        landscape: {
            x: 5,
            y: -40,
            scale: 1.1 //alpha: 0.5

        },
        portrait: {
            x: -40,
            y: 210,
            scale: 1.1
        }
    },
    pointArraySpineLayer: {
        type: 'container',
        landscape: {
            x: 5,
            y: -30,
            scale: 1.1
        },
        portrait: {
            x: -40,
            y: 215,
            scale: 1.1
        }
    },
    pickPoint1: {
        type: 'container',
        x: 120,
        y: 410,
        scale: 0.9
    },
    pickPoint2: {
        type: 'container',
        x: 257,
        y: 300,
        scale: 0.9
    },
    pickPoint3: {
        type: 'container',
        x: 257,
        y: 410,
        scale: 0.9
    },
    pickPoint4: {
        type: 'container',
        x: 400,
        y: 190,
        scale: 0.9
    },
    pickPoint5: {
        type: 'container',
        x: 400,
        y: 300,
        scale: 0.9
    },
    pickPoint6: {
        type: 'container',
        x: 400,
        y: 410,
        scale: 0.9
    },
    pickPoint7: {
        type: 'container',
        x: 535,
        y: 80,
        scale: 0.9
    },
    pickPoint8: {
        type: 'container',
        x: 535,
        y: 190,
        scale: 0.9
    },
    pickPoint9: {
        type: 'container',
        x: 535,
        y: 300,
        scale: 0.9
    },
    pickPoint10: {
        type: 'container',
        x: 535,
        y: 410,
        scale: 0.9
    },
    pickPoint11: {
        type: 'container',
        x: 673,
        y: -28,
        scale: 0.9
    },
    pickPoint12: {
        type: 'container',
        x: 673,
        y: 80,
        scale: 0.9
    },
    pickPoint13: {
        type: 'container',
        x: 673,
        y: 190,
        scale: 0.9
    },
    pickPoint14: {
        type: 'container',
        x: 673,
        y: 300,
        scale: 0.9
    },
    pickPoint15: {
        type: 'container',
        x: 673,
        y: 410,
        scale: 0.9
    },
    howToPlayContainer: {
        type: 'container',
        children: ['howToPlayOverlay', 'howToPlayBackground', 'howToPlayPages', 'versionText', 'audioButtonContainer', 'howToPlayPrevious', 'howToPlayNext', 'howToPlayClose', 'howToPlayIndicators']
    },

    /*
     * How To Play
     */
    howToPlayPages: {
        type: 'container',
        children: ['howToPlayPage1Container', 'howToPlayPage2Container', 'howToPlayPage3Container']
      },
    howToPlayPage1Container: {
        type: 'container',
        children: ['howToPlayPage1Title', 'howToPlayPage1textContainer'],
        landscape: {
            y: 40
        },
        portrait: {
            y: 80
        }
    },
    howToPlayPage2Container: {
        type: 'container',
        children: ['howToPlayPage2Title', 'howToPlayPage2textContainer'],
        landscape: {
            y: 0
        },
        portrait: {
            y: 80
        }
    },
    howToPlayPage3Container: {
        type: 'container',
        children: ['howToPlayPage3Title', 'howToPlayPage3textContainer'],
        landscape: {
          y: 0
        },
        portrait: {
          y: 80
        }
      },
      howToPlayPage1Title: {
        type: 'text',
        string: 'howToPlayTitle',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {
          maxWidth: 800,
          x: 720,
          y: 150
        },
        portrait: {
          maxWidth: 400,
          x: 405,
          y: 270 //280
        }
      },
      howToPlayPage1textContainer: {
        type: 'container',
        landscape: {
          x: 305,
          y: -90
        },
        portrait: {
          x: 0,
          y: 0
        },
        children: ['howToPlayPage1text_1', 'howToPlayPage1text_2', 'howToPlayPage1text_3', 'howToPlayPage1text_4']
      },
      howToPlayPage1text_1: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 405,
          y: 340,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 460, //500
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage1text_2: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 405,
          y: 410,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 550,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage1text_3: {
        type: 'text',
        landscape: {
          maxWidth: 1400,
          x: 405,
          y: 580,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1400,
          x: 405,
          y: 780, //700,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage1text_4: {
        type: 'text',
        landscape: {
          maxWidth: 800,
          x: 405,
          y: 580,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 800,
          x: 405,
          y: 730,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage2Title: {
        type: 'text',
        string: 'howToPlayTitle',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {
          maxWidth: 800,
          x: 720,
          y: 190
        },
        portrait: {
          maxWidth: 800,
          x: 405,
          y: 270 //280
        }
      },
      howToPlayPage2textContainer: {
        type: 'container',
        landscape: {
          x: 325,
          y: -70,
          scale: 0.95
        },
        portrait: {
          scale: 0.95,
          x: 20,
          y: 0
        },
        children: ['howToPlayPage2text_1', 'howToPlayPage2text_2', 'howToPlayPage2text_3']
      },
      howToPlayPage2text_1: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 405,
          y: 400,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 520,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage2text_2: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 470,
          y: 510,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 560, //430
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage2text_3: {
        type: 'text',
        landscape: {
          maxWidth: 2000,
          x: 405,
          y: 640,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 2000,
          x: 405,
          y: 810,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage3Title: {
        type: 'text',
        string: 'howToPlayTitle',
        style: 'howToPlayTitle',
        anchor: 0.5,
        landscape: {
          maxWidth: 800,
          x: 720,
          y: 190
        },
        portrait: {
          maxWidth: 800,
          x: 405,
          y: 270 //280
        }
      },
      howToPlayPage3textContainer: {
        type: 'container',
        landscape: {
          x: 275,
          y: -80,
          scale: 0.95
        },
        portrait: {
          scale: 0.95,
          x: 20,
          y: 80
        },
        children: ['howToPlayPage3text_1', 'howToPlayPage3text_2', 'howToPlayPage3text_3']
      },
      howToPlayPage3text_1: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 470,
          y: 350,
          fill: 'fontColourTutorialBodyText',
          fontFamily: 'oswald',
          fontSize: 42,
          wordWrap: true,
          align: "center",
          padding: 20,
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 280,
          fill: 'fontColourTutorialBodyText',
          fontFamily: 'oswald',
          fontSize: 42,
          wordWrap: true,
          align: "center",
          padding: 20,
          anchor: 0.5
        }
      },
      howToPlayPage3text_2: {
        type: 'text',
        landscape: {
          maxWidth: 1100,
          x: 470,
          y: 530,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 1100,
          x: 405,
          y: 590, //430
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
      howToPlayPage3text_3: {
        type: 'text',
        landscape: {
          maxWidth: 2000,
          x: 405,
          y: 640,
          style: 'howToPlayText',
          anchor: 0.5
        },
        portrait: {
          maxWidth: 2000,
          x: 405,
          y: 810,
          style: 'howToPlayText',
          anchor: 0.5
        }
      },
    howToPlayIndicators: {
        type: 'container',
        children: ['howToPlayIndicatorActive', 'howToPlayIndicatorInactive'],
        landscape: {
            x: 720,
            y: 600
        },
        portrait: {
            x: 405,
            y: 1000
        },
        scale: 0.7
    },
    howToPlayIndicatorActive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorActive'
    },
    howToPlayIndicatorInactive: {
        type: 'sprite',
        texture: 'tutorialPageIndicatorInactive'
    },
    howToPlayBackground: {
        type: 'sprite',
        anchor: {
            x: 0.5
        },
        landscape: {
            x: 720,
            texture: 'landscape_tutorialBackground',
            y: 98
        },
        portrait: {
            x: 405,
            texture: 'portrait_tutorialBackground',
            y: 240
        }
    },
    howToPlayClose: {
        type: 'button',
        string: 'button_ok',
        landscape: {
            x: 720,
            y: 678
        },
        portrait: {
            x: 405,
            y: 1100
        },
        textures: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        },
        style: {
            enabled: 'tutorialOKButtonEnabled',
            over: 'tutorialOKButtonOver',
            pressed: 'tutorialOKButtonPressed'
        }
    },
    howToPlayPrevious: {
        type: 'button',
        landscape: {
            x: 72,
            y: 418
        },
        portrait: {
            x: 64,
            y: 700
        },
        textures: {
            enabled: 'tutorialLeftButtonEnabled',
            disabled: 'tutorialLeftButtonDisabled',
            over: 'tutorialLeftButtonOver',
            pressed: 'tutorialLeftButtonPressed'
        }
    },
    howToPlayNext: {
        type: 'button',
        landscape: {
            x: 1368,
            y: 418
        },
        portrait: {
            x: 746,
            y: 700
        },
        textures: {
            enabled: 'tutorialRightButtonEnabled',
            disabled: 'tutorialRightButtonDisabled',
            over: 'tutorialRightButtonOver',
            pressed: 'tutorialRightButtonPressed'
        }
    },
    losePlaqueMessage: {
        type: 'text',
        string: 'message_nonWin',
        style: 'losePlaqueBody',
        //y: -50,
        anchor: 0.5,
        portrait: {
            maxWidth: 700
        },
        landscape: {
            maxWidth: 700
        }
    },
    endGameWinNoPlaque: {
        type: 'container',
        children: ['endGameWinNoPlaqueSpineContainer', 'endGameWinNoPlaqueValue'],
        portrait: {
            x: 410,
            y: 600
        },
        landscape: {
            x: 720,
            y: 410
        }
    },
    endGameNoPlaqueContainer: {
        type: 'container',
        children: ['endGameWinNoPlaque']
    },
    endGameNoPlaqueContainerClick: {
        type: 'button',
        children: ['endGameNoPlaqueContainerClickGraphic'] //portrait: {
        //y: 200
        //}

    },
    endGameNoPlaqueContainerClickGraphic: {
        type: 'rectangle',
        alpha: 0.5,
        landscape: {
            width: 1440,
            height: 810,
            fill: 0x000000
        },
        portrait: {
            width: 810,
            height: 1440,
            fill: 0x000000
        }
    },
    endGameDismissRectangle: {
        type: 'pressable',
        visible: false,
        children: ['endGameDismissShape'],
        anchor: 0.5,
        landscape: {
            x: 300,
            y: 150
        },
        portrait: {
            x: 0,
            y: 410
        }
    },
    endGameDismissShape: {
        type: 'rectangle',
        alpha: 1,
        anchor: 0.5,
        landscape: {
            width: 800,
            height: 400,
            fill: 0xffffff
        },
        portrait: {
            width: 800,
            height: 400,
            fill: 0xffffff
        }
    },
    endGameWinNoPlaqueSpineContainer: {
        type: 'container' //portrait: {
        //  y: 150
        //},
        //landscape: {
        //  y: 0
        //}

    },
    endGameWinNoPlaqueValue: {
        children: ['endGameWinNoPlaqueLabel'],
        type: 'text',
        style: 'winPlaqueValue',
        anchor: 0.5,
        maxWidth: 600,
        align: 'center',
        portrait: {
            y: 75
        },
        landscape: {
            y: 70
        }
    },
    endGameWinNoPlaqueLabel: {
        type: 'text',
        style: 'winPlaqueBodyNoPlaque',
        string: 'totalWin',
        anchor: 0.5,
        maxWidth: 600,
        align: 'center',
        y: -130
    },
    buyButtonAnim: {
        type: 'sprite',
        anchor: 0.5,
        x: 718,
        y: -360
    },
    tryButtonAnim: {
        type: 'sprite',
        anchor: 0.5 //x: -10,
        //y: -5

    },
    buyButton: {
        type: 'button',
        string: 'button_buy',
        portrait: {
            x: 405,
            y: 50,
            textures: {
                enabled: 'buyButtonPortEnabled',
                over: 'buyButtonPortOver',
                pressed: 'buyButtonPortPressed',
                disabled: 'buyButtonPortDisabled'
            }
        },
        landscape: {
            x: 1280,
            y: -270,
            textures: {
                enabled: 'buyButtonOverlay',
                over: 'buyButtonOverlay',
                pressed: 'buyButtonPressed',
                disabled: 'buyButtonOverlay'
            }
        },
        style: {
            enabled: 'buyButtonLandEnabled',
            over: 'buyButtonLandEnabled',
            pressed: 'buyButtonLandPressed',
            disabled: 'buyButtonLandEnabled'
        }
    },
    tryButton: {
        type: 'button',
        string: 'button_try',
        portrait: {
            x: 405,
            y: 50,
            textures: {
                enabled: 'mainButtonEnabled',
                over: 'mainButtonOver',
                pressed: 'mainButtonPressed',
                disabled: 'mainButtonDisabled'
            }
        },
        landscape: {
            x: 1280,
            y: -270,
            textures: {
                enabled: 'mainButtonLandEnabled',
                over: 'mainButtonLandOver',
                pressed: 'mainButtonLandPressed',
                disabled: 'mainButtonLandDisabled'
            }
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    // buttonBar:{
    //     type: 'container',
    //     portrait: {
    //         y: 1245,
    //     }
    // },
    autoPlayStartButton: {
        type: 'button',
        portrait: {
            string: 'button_autoPlay_portrait',
            textures: {
                enabled: 'mainButtonEnabled',
                over: 'mainButtonOver',
                pressed: 'mainButtonPressed',
                disabled: 'mainButtonDisabled'
            }
        },
        landscape: {
            string: 'button_autoPlay_landscape',
            textures: {
                enabled: 'mainButtonLandEnabled',
                over: 'mainButtonLandOver',
                pressed: 'mainButtonLandPressed',
                disabled: 'mainButtonLandDisabled'
            }
        },
        style: {
            enabled: 'revealAllEnabled',
            over: 'revealAllEnabled',
            pressed: 'revealAllPressed',
            disabled: 'revealAllDisabled'
        }
    },
    autoPlayStopButton: {
        type: 'button',
        string: 'button_stop',
        portrait: {
            textures: {
                enabled: 'mainButtonEnabled',
                over: 'mainButtonOver',
                pressed: 'mainButtonPressed',
                disabled: 'mainButtonDisabled'
            }
        },
        landscape: {
            textures: {
                enabled: 'mainButtonLandEnabled',
                over: 'mainButtonLandOver',
                pressed: 'mainButtonLandPressed',
                disabled: 'mainButtonLandDisabled'
            }
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    autoPlayButton: {
        type: 'container',
        children: ['autoPlayStartButton', 'autoPlayStopButton']
    },
    autoPlayButton_default: {
        type: 'pointer',
        landscape: {
            x: 1280,
            y: 400
        },
        portrait: {
            x: 405,
            y: 1288
        }
    },
    try_fixed: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -270
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    try_default: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -270
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    try_multi: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -270
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    buy_default: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -270
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    buy_multi: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -270
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    playForMoney_default: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -80
        },
        portrait: {
            x: 255,
            y: 50
        }
    },
    playForMoney_multi: {
        type: 'point',
        landscape: {
            x: 1280,
            y: -80
        },
        portrait: {
            x: 255,
            y: 50
        }
    },
    autoPlayButton_multi: {
        type: 'pointer',
        landscape: {
            x: 1280,
            y: 400
        },
        portrait: {
            x: 405,
            y: 1288
        }
    },
    ticketSelectBarSmall: {
        type: 'container',
        landscape: {
            x: 1280,
            y: 180,
            scale: 0.8
        },
        portrait: {
            x: 400,
            y: 1200,
            scale: 0.8
        },
        children: ['ticketSelectBarBG', 'ticketSelectCostValue', 'ticketCostDownButtonStatic', 'ticketCostUpButtonStatic', 'ticketCostDownButton', 'ticketCostUpButton', 'ticketCostIndicators']
    },
    ticketSelectBarBG: {
        type: 'sprite',
        anchor: 0.5,
        landscape: {
            texture: 'landscape_pricePointSelectorBackground',
            scale: {
                x: 0.7,
                y: 1
            }
        },
        portrait: {
            texture: 'portrait_pricePointSelectorBackground',
            scale: {
                x: 1,
                y: 1
            }
        }
    },
    ticketSelectCostValue: {
        type: 'text',
        portrait: {
            y: -7,
            maxWidth: 150
        },
        landscape: {
            y: -7,
            maxWidth: 110
        },
        anchor: 0.5,
        style: 'ticketSelectCostValue'
    },
    ticketCostDownButton: {
        type: 'button',
        portrait: {
            x: -170
        },
        landscape: {
            x: -110
        },
        textures: {
            enabled: 'minusButtonEnabled',
            disabled: 'minusButtonDisabled',
            over: 'minusButtonOver',
            pressed: 'minusButtonPressed'
        }
    },
    ticketCostIndicators: {
        type: 'container',
        children: ['ticketCostIndicatorActive', 'ticketCostIndicatorInactive'],
        portrait: {
            y: 20
        },
        landscape: {
            y: 20,
            scale: 0.8
        }
    },
    ticketCostUpButton: {
        type: 'button',
        portrait: {
            x: 170
        },
        landscape: {
            x: 110
        },
        textures: {
            enabled: 'plusButtonEnabled',
            disabled: 'plusButtonDisabled',
            over: 'plusButtonOver',
            pressed: 'plusButtonPressed'
        }
    },
    ticketCostDownButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: -170
        },
        landscape: {
            x: -110
        },
        texture: 'minusButtonDisabled'
    },
    ticketCostUpButtonStatic: {
        type: 'sprite',
        anchor: 0.5,
        portrait: {
            x: 170
        },
        landscape: {
            x: 110
        },
        texture: 'plusButtonDisabled'
    },
    buttonBar: {
        type: 'container',
        landscape: {
            x: 0,
            y: 649
        },
        portrait: {
            x: 0,
            y: 1240 //scale: 0.9

        },
        children: ['helpButtonStatic', 'helpButton', 'homeButtonStatic', 'homeButton', 'exitButton', 'playAgainButton', 'tryAgainButton', 'buyButtonAnim', 'buyButton', 'tryButton', 'tryButtonAnim', 'moveToMoneyButton', 'retryButton']
    },
    footerContainer: {
        type: 'container',
        children: ['footerBG', 'balanceMeter', 'ticketCostMeter', 'winMeter', 'divider_1_3', 'divider_2_3', 'divider_1_2'],
        landscape: {
            y: 761
        },
        portrait: {
            y: 1349
        }
    },
    exitButton: {
        type: 'button',
        string: 'button_exit',
        portrait: {
            x: 405,
            y: 50,
            textures: {
                enabled: 'mainButtonEnabled',
                over: 'mainButtonOver',
                pressed: 'mainButtonPressed',
                disabled: 'mainButtonDisabled'
            }
        },
        landscape: {
            x: 1280,
            y: -250,
            textures: {
                enabled: 'mainButtonLandEnabled',
                over: 'mainButtonLandOver',
                pressed: 'mainButtonLandPressed',
                disabled: 'mainButtonLandDisabled'
            }
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    footerBG: {
        type: 'sprite',
        landscape: {
            texture: 'landscape_footerBar',
            y: -8
        },
        portrait: {
            texture: 'portrait_footerBar',
            y: -5
        }
    },
    resultPlaqueOKButtonEnabled: {
        fontFamily: 'oswald',
        fontSize: 38,
        fill: 'fontColourEndOfGameMessageOKButtonEnabled',
        padding: 10
    },
    resultPlaqueOKButtonPressed: {
        fontFamily: 'oswald',
        fontSize: 41,
        fill: 'fontColourEndOfGameMessageOKButtonPressed',
        padding: 10
    },
    resultPlaqueOKButtonOver: {
        fontFamily: 'oswald',
        fontSize: 38,
        fill: 'fontColourEndOfGameMessageOKButtonOver',
        padding: 10
    },
    resultPlaquesContainer: {
        type: 'pressable',
        children: ['resultPlaqueOverlay', 'winPlaqueBG', 'winPlaqueMessage', 'winPlaqueValue', 'winPlaqueCloseButton', 'losePlaqueBG', 'losePlaqueMessage', 'losePlaqueCloseButton'],
        landscape: {
            x: 720,
            y: 370,
            maxWidth: 100
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    winPlaqueMessage: {
        type: 'text',
        string: 'message_win',
        style: 'winPlaqueBody',
        y: -60,
        anchor: 0.5,
        portrait: {
            maxWidth: 400
        },
        landscape: {
            maxWidth: 400
        }
    },
    winPlaqueValue: {
        type: 'text',
        style: 'winPlaqueValue',
        y: 70,
        anchor: 0.5,
        maxWidth: 400
    },
    winPlaqueCloseButton: {
        type: 'button',
        alpha: 0
    },
    losePlaqueCloseButton: {
        type: 'button',
        alpha: 0
    },
    versionText: {
        type: 'text',
        style: 'versionText',
        x: 35,
        y: 120,
        alpha: 0.5,
        portrait: {
            y: 280
        },
        landscape: {
            y: 130
        }
    },
    audioButtonContainer: {
        type: 'container',
        landscape: {
            x: 79,
            y: 675
        },
        portrait: {
            x: 71,
            y: 1100
        }
    },
    // https://jira.g2-networks.net/browse/PEPPER-71
    timeoutContinue: {
        type: 'button',
        landscape: {
            x: 880,
            y: 560
        },
        portrait: {
            x: 565,
            y: 775
        },
        style: {
            enabled: 'errorButtonEnabled',
            over: 'errorButtonOver',
            pressed: 'errorButtonPressed'
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    }
});