define([
		'skbJet/component/gameMsgBus/GameMsgBus',
		'skbJet/component/SKBeInstant/SKBeInstant',
		'skbJet/component/pixiResourceLoader/pixiResourceLoader',
		'skbJet/component/gladPixiRenderer/gladPixiRenderer'
	], function(msgBus, SKBeInstant, resourceMgr, gr){
		var gameFolder;
        var loadPage;
        
    function getUrlOrigin(url){
		var ln = document.createElement('a');
		ln.href = url;
		if(ln.origin){
			return ln.origin;
		}else{
			return "*";
		}
	}
    
	function onStartAssetLoading(){
        gameFolder = SKBeInstant.config.urlGameFolder;
        function windowResized() {
            if(!SKBeInstant.isSKB() && SKBeInstant.config.assetPack === 'desktop'){
                return;
            }
            loadPage.width = window.innerWidth + 'px';
            loadPage.height = window.innerHeight + 'px';
        }
		if(!SKBeInstant.isSKB()){
            var gce = SKBeInstant.getGameContainerElem();
            var splashUrl = gameFolder +'splash.html?';

            var jLotteryCustom = 0;
            if (window.gtk && window.gtk.jLottery && window.gtk.jLottery.embeddedParams && window.gtk.jLottery.embeddedParams.custom) {
                jLotteryCustom = 1;                
            }
            
            var softwareIdM = "";
            var softwareId=window.location.search.match(/&?softwareid=\d+-(\d+)-\d+&?/);
            if(softwareId&&softwareId[1]){
                softwareIdM = softwareId[1];
            }
            
            splashUrl += "&assetPack=" + SKBeInstant.config.assetPack + "&language=" + SKBeInstant.config.locale + "&skincode=" + SKBeInstant.config.siteId+"&jLotteryCustom=" + jLotteryCustom + "&softwareIdM=" + softwareIdM;
                        
            gce.innerHTML='<iframe id="loadPage" src="'+ splashUrl + '" margin=0, padding=0, frameborder=0 scrolling=no style="overflow: hidden"></iframe>';
            loadPage = document.getElementById('loadPage');
            loadPage.origin = getUrlOrigin(splashUrl);
            if(SKBeInstant.config.assetPack === 'desktop'){
                loadPage.width = gce.clientWidth + 'px';
                loadPage.height = gce.clientHeight + 'px';
			}else{
                loadPage.width = window.innerWidth + 'px';
                loadPage.height = window.innerHeight + 'px';
            }   

            window.addEventListener('resize', windowResized);
            setTimeout(function (){
                resourceMgr.load(gameFolder+'assetPacks/'+SKBeInstant.config.assetPack, SKBeInstant.config.locale, SKBeInstant.config.siteId); 
            }, 1000); 
		}else{
            resourceMgr.load(gameFolder+'assetPacks/'+SKBeInstant.config.assetPack, SKBeInstant.config.locale, SKBeInstant.config.siteId);        
        }
	}
		
	function onAssetsLoadedAndGameReady(){
		var gce = SKBeInstant.getGameContainerElem();
		var orientation = SKBeInstant.getGameOrientation();
		var imgUrl = SKBeInstant.config.urlGameFolder+'assetPacks/'+SKBeInstant.config.assetPack+'/images/' + orientation+'BG.jpg';
		gce.style.backgroundImage = 'url('+imgUrl+')';
        gce.style.backgroundRepeat= 'no-repeat';
        gce.style.backgroundSize = 'cover';
		gce.innerHTML='';
		
        var gladData;
		if(orientation === "landscape"){
            gladData = window._gladLandscape;
        }else{
            gladData = window._gladPortrait;
        }
		gr.init(gladData, SKBeInstant.getGameContainerElem());
		gr.showScene('_GameScene');
		msgBus.publish('jLotteryGame.assetsLoadedAndGameReady');
	}
	
	function onResourceLoadProgress(data){
		if(!SKBeInstant.isSKB()){
            loadPage.contentWindow.postMessage(
                {
                    loaded: Math.floor((data.current/data.total)*100)
                },loadPage.origin
            );
		}else{
            msgBus.publish('jLotteryGame.updateLoadingProgress', {items:(data.total), current:data.current});
        }
		
		if(data.total===data.current){
            if(!SKBeInstant.isSKB()){
                setTimeout(onAssetsLoadedAndGameReady,500);
            }else{
                onAssetsLoadedAndGameReady();			
            }
		}
	}

	msgBus.subscribe('jLottery.startAssetLoading', onStartAssetLoading);
	msgBus.subscribe('resourceLoader.loadProgress', onResourceLoadProgress);
	//msgBus.subscribe('SKBeInstant.gameParametersUpdated', onGameParametersUpdated);
	return {};
});