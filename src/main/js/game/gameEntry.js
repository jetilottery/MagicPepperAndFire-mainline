define(function(require) {
    require('polyfill');
    require('com/pixijs/pixi');

    const app = require('skbJet/componentLIT/standardIW/app');
    const layout = require('skbJet/componentLIT/standardIW/layout');
    const config = require('skbJet/componentLIT/standardIW/gameConfig');
    const audio = require('skbJet/componentLIT/standardIW/audio');
    const textStyles = require('skbJet/componentLIT/standardIW/textStyles');
    const gameSize = require('skbJet/componentLIT/standardIW/gameSize');
    const gameFlow = require('skbJet/componentLIT/standardIW/gameFlow');
    const documents = require('skbJet/componentLIT/standardIW/documents');
    const scenarioData = require('skbJet/componentLIT/standardIW/scenarioData');
    const loadController = require('skbJet/componentLIT/standardIW/loadController');
    const spineSubLoader = require('skbJet/componentManchester/spineLoader/SpineSubLoader');
    const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');

    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const prizestructureTransform = require("game/prizestructureTransform");
    const prizetableTransform = require('game/prizetableTransform');
    const scenarioTransform = require('game/scenarioTransform');

    const bigWin = require('game/components/effects/bigWin');


    const templateLayout = require('game/template/layout');
    const gameLayout = require('game/custom/layout');
    const templateConfig = require('game/template/config');
    const gameConfig = require('game/custom/config');
    const templateAudioMap = require('game/template/audioMap');
    const gameAudioMap = require('game/custom/audioMap');
    const templateTextStyles = require('game/template/textStyles');
    const gameTextStyles = require('game/custom/textStyles');
    const dimensions = require('game/template/dimensions');
    const setup = require('game/components/setup/setup');
    const buyTryAnim = require('game/components/effects/buyTryAnim');
    const tutorialPlaque = require('game/components/tutorialPlaque');



    // Require StandardIW component templates
    let buttonBar = require('skbJet/componentLIT/standardIW/ui/buttonBar/template');
    let autoPlayButton = require('skbJet/componentLIT/standardIW/ui/autoPlayButton/template');
    let resultPlaques = require('skbJet/componentLIT/standardIW/ui/resultPlaques/template');
    let howToPlay = require('skbJet/componentLIT/standardIW/ui/howToPlay/template');
    let errorPlaque = require('skbJet/componentLIT/standardIW/ui/errorPlaque/template');
    let ticketSelectBar = require('skbJet/componentLIT/standardIW/ui/ticketSelectBarSmall/template');
    let footer = require('skbJet/componentLIT/standardIW/ui/footer/template');
    let networkActivity = require('skbJet/componentLIT/standardIW/ui/networkActivity/template');



    let gamePlay = require('game/components/gamePlay');
    let animationView = require('game/components/animation/animationView');

    const gameResize = require('game/components/resize');

    // Require all game specific components that need initializing
    require('game/components/winUpTo');
    require('game/components/endGameManager');
    // Require game side state handlers.
    require('game/ticketAcquired');
    require('game/startReveal');
    require('game/endReveal');
    require('game/resultScreen');
    require('game/gameReset');
    require('game/error');


    // Register template configs and game overrides
    layout.register(templateLayout, gameLayout);
    audio.register(templateAudioMap, gameAudioMap);
    config.register(templateConfig, gameConfig);
    textStyles.register(templateTextStyles, gameTextStyles);
    loadController.registerSubLoader('spine', new spineSubLoader());

    // Set game size for portrait and landscape
    gameSize.set(dimensions);

    function gameInit() {
        // Register a transform function that can be used to turn the prizetable data into structured
        // data representing the prizetables in the paytable document

        if (SKBeInstant.isWLA()) {
            documents.registerPrizestructureTransform(prizestructureTransform);
        } else {
            documents.registerPrizetableTransform(prizetableTransform);
        }

        //documents.registerPrizetableTransform(prizetableTransform);

        // Register a transform function that can be used to turn the scenario string into useable data
        scenarioData.registerTransform(scenarioTransform);



        // Init StandardIW UI templates
        howToPlay = howToPlay();
        resultPlaques = resultPlaques();
        errorPlaque = errorPlaque();
        buttonBar = buttonBar();
        autoPlayButton = autoPlayButton();
        ticketSelectBar = ticketSelectBar();
        footer = footer();
        networkActivity = networkActivity();

        // Inititialize all game components

        gameResize.preload(app, completInitAfterPreload);

        function completInitAfterPreload() {
            app.stage.addChild(
                layout.container,
                resultPlaques,
                buttonBar,
                autoPlayButton,
                ticketSelectBar,
                howToPlay,
                footer,
                errorPlaque,
                networkActivity
            );

            setup.init();
            animationView.init();
            gamePlay.init();
            buyTryAnim.init();
            tutorialPlaque.init();
            bigWin.init();


            // Once everything is initialized continue to next state
            gameFlow.next();

            msgBus.publish('game.util.howToPlay');
            msgBus.publish('game.endGame.init');
        }
        // Add everything to the stage
    }

    gameFlow.handle(gameInit, 'GAME_INIT');
});