/**
 * @module control some game config
 * @description control the customized data of paytable&help page and other customized config
 */
define({
    style:{
        //buyAndTryContoller
        buyText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        tryText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //erroWarningController
        warningExitText:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        warningContinueText:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        warningText:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        errorExitText:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        errorTitle:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        errorText:{padding:6, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //exitAndHomeController
        exitText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //metersController
        balanceText:{padding:2},
        balanceValue:{padding:2},
        winsText:{padding:2},
        winsValue:{padding:2},
        ticketCostMeterText:{padding:2},
        ticketCostMeterValue:{padding:2},
        meterDivision0:{padding:2},
        meterDivision1:{padding:2},
        //playAgainController
        playAgainText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        playAgainMTMText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //playWithMoneyController
        MTMText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //resultController
        win_Text:{padding:4, stroke:"#462403", strokeThickness:4, dropShadow: true, dropShadowDistance: 6,dropShadowAlpha: 0.8, fill:["#ff6e02","#fff119","#ffff00","#ff6d00"]},
        win_Try_Text:{padding:4, stroke:"#462403", strokeThickness:4, dropShadow: true, dropShadowDistance: 6,dropShadowAlpha: 0.8, fill:["#ff6e02","#fff119","#ffff00","#ff6d00"]},
        nonWin_Text:{padding:4, stroke:"#462403", strokeThickness:4, dropShadow: true, dropShadowDistance: 6,dropShadowAlpha: 0.8, fill:["#ff6e02","#fff119","#ffff00","#ff6d00"]},
        win_Value:{padding:2, stroke:"#462403", strokeThickness:4, dropShadow: true, dropShadowDistance: 6,dropShadowAlpha: 0.8},
        closeWinText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        closeNonWinText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        win_Value_color:{fill:["#ff6e02","#fff119","#ffff00","#ff6d00"]},
        //revealAllController
        autoPlayText:{padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        autoPlayMTMText:{paddisng:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //ticketCostController
        ticketCostText:{padding:8, stroke:"#350707", strokeThickness:2, fill:"#ffffff"},
        ticketCostValue: {padding: 2, stroke: "#350707", strokeThickness: 2, fill: "#ffffff"},
        //winUpToController
        winUpToText: {padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        winUpToValue: {padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        //tutorialController
        textStyle: {padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        tutorialTitleText: {padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8},
        closeTutorialText: {padding:2, stroke:"#143002", strokeThickness:4, dropShadow: true, dropShadowDistance: 3,dropShadowAlpha: 0.8}
    },
    audio:{
        "gameInit":{
            "name":"GameInit",
            "channel":"base"
        },
        "gameLoop":{
            "name":"BaseMusicLoop",
            "channel":"base"
        },
        "gameWin":{
            "name":"BaseMusicLoopTermWin",
            "channel":"base"
        },
        "gameNoWin":{
            "name":"BaseMusicLoopTerm",
            "channel":"base"
        },
        "ButtonGeneric":{
            "name":"ButtonGeneric",
            "channel":"1"
        },
        "PaytableOpen":{
            "name":"PaytableOpen",
            "channel":"2"
        },
        "PaytableClose":{
            "name":"PaytableClose",
            "channel":"2"
        },
        "ButtonBetMax":{
            "name":"ButtonBetMax",
            "channel":"ButtonBetMax"
        },
        "ButtonBetUp":{
            "name":"ButtonBetUp"
        },
        "ButtonBetDown":{
            "name":"ButtonBetDown"
        }
    },
    gladButtonImgName:{
        //audioController
        "buttonAudioOn":"buttonAudioOn",
        "buttonAudioOff":"buttonAudioOff",        
        //buyAndTryController
        "buttonTry":"buttonCommon",
        "buttonBuy":"buttonCommon",
        //errorWarningController
        "warningContinueButton":"buttonCommon",
        "warningExitButton":"buttonCommon",
        "errorExitButton":"buttonCommon",
        //exitAndHomeController
        "buttonExit":"buttonCommon",
        "buttonHome":"buttonHome",
        //playAgainController
        "buttonPlayAgain":"buttonCommon",
        "buttonPlayAgainMTM":"buttonCommon",
        //playWithMoneyController
        "buttonMTM":"buttonCommon",
        //resultController
        "buttonWinClose":"buttonClose",
        "buttonNonWinClose":"buttonClose",
        //ticketCostController
        "ticketCostPlus":"ticketCostPlus",
        "ticketCostMinus":"ticketCostMinus",
        //tutorialController
        "iconOff":"tutorialPageIconOff",
        "iconOn":"tutorialPageIconOn",
        //revealAllController
        "buttonAutoPlay":"buttonCommon",
        "buttonAutoPlayMTM":"buttonCommon",

    },
    gameParam:{
        //tutorialController
        "pageNum":4
    }
	
});
