/**
 * @module game/revealAllFunc
 * @description reveal all button control
 */
define([
    'skbJet/component/gameMsgBus/GameMsgBus',
    'skbJet/component/audioPlayer/AudioPlayerProxy',
    'skbJet/component/gladPixiRenderer/gladPixiRenderer',
    'skbJet/component/SKBeInstant/SKBeInstant',
    'game/configController'
], function (msgBus, audio, gr, SKBeInstant, config) {
	var symbolsNum = 12, winNum = 3;
    var interval;
	
    function revealAll() {
        if (config.audio && config.audio.ButtonGeneric) {
            audio.play(config.audio.ButtonGeneric.name);
        }
        msgBus.publish('startReveallAll');
		var symbol;
		var delayTime = 0;
		for(var i = 0; i < winNum; i++){
			symbol = gr.lib['_winSymbol' + i];
			if(!symbol.reveal){
                symbol.off('click');
				gr.getTimer().setTimeout(symbol.revealFun, delayTime);
				delayTime += interval;
			}
		}
		for(i = 0; i < symbolsNum; i++){
			symbol = gr.lib['_Symbol_' + i];
			if(!symbol.reveal){
                symbol.off('click');
				gr.getTimer().setTimeout(symbol.revealFun, delayTime);
				delayTime += interval;
			}
		}
        msgBus.publish('disableUI');
    }

    function onGameParametersUpdated() {
        if(SKBeInstant.config.customBehaviorParams){
           interval = Number(SKBeInstant.config.customBehaviorParams.symbolRevealInterval) || 500;
        }else{
            interval = 500;
        }       
	}
        
    msgBus.subscribe('SKBeInstant.gameParametersUpdated', onGameParametersUpdated);

    return {
        revealAll:revealAll
    };
});