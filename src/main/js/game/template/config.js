define({
    /*
     * Game configuration options
     * Anything defined here could be overwritten either based on the channel in
     * assetPacks/CHANNEL/layout/gameConfig.js or at an operator level by gameConfig.json in i18n
     */

    // Should the HowToPlay screen show when the game loads
    showHowToPlayOnLoad: false,
    // Use AutoPlay with toggle start/stop rather than single use RevealAll
    toggleAutoPlay: false,
    // Time between each number being revealed in autoplay. 0 for instant reaveal.

    autoPlayPlayerNumberInterval: 0.8,
    autoPlayPlayerRowInterval: 0.2,
    wheelSpeed: 2,
    gameEndDelay: 0,

    // Time over which the music will fade out on entering the result screen
    resultMusicFadeOutDuration: 0,
    // Time between entering the result screen and the terminator audio starting
    resultTerminatorFadeInDelay: 0,
    // Time over which the terminator audio will fade in
    resultTerminatorFadeInDuration: 0.5,
    // Should the Result screen show when ticket is complete
    showResultScreen: true,
    // Hide the coins if they're still visible
    hideCoinsOnWinDismiss: false,
    // Supress non-winning result plaque
    suppressNonWinResultPlaque: false,
    // Delay before plaque is able to be dismissed
    secondsDelayDismissResult: 0,
    // Coin shower on result screen
    resultCoinShowerEnabled: true,
    // Bypass the play again button
    bypassPlayAgain: false,
    // Ticket cost meter visible while playing (formerly UI3 Mode)
    ticketCostMeterVisibleWhilePlaying: true,
    // Fast fade buttons
    fastFadeButtons: true,
    fastFadeDuration: 0.20,
    // Actual idle times will be random, +/- this value
    idleIntervalVariation: 0.9,
    // Delay in base game before transition to bonus
    delayBeforeTransitionToBonus: 2,
    // Delay before transitioning back to base game (win)
    bonusHoldOnCompleteWin: 2,
    // Delay between revealing bonus symbols per player number
    delayBetweenBonusSymbolsInSeconds: 0.25,
    // Pulse bonus item when collected in bonus area
    pulseBonusItemOnCollect: true,
    pulseBonusItemDuration: 0.25,

    delayBeforeStartIdleInSeconds: 0.5,
    // Delay before restarting idle animations after interaction
    delayBeforeResumeIdleInSeconds: 0.5,
    // Total Win rollup
    rollUpTotalWin: true,
    totalWinRollupInSeconds: 0.5,
    pulseTotalWinAfterRollup: false,
    pulseTotalWinDuration: 0.25,

    //particles
    resultParticleMode: 1,
    bigWinThresholds: {
        level1: {
            upper: { multiplier: 5, inclusive: false },
        },
        level2: {
            lower: { multiplier: 5, inclusive: true },
            upper: { multiplier: 20, inclusive: true },
        },
        level3: {
            lower: { multiplier: 20, inclusive: false },
        }
    },

    // Result coin/particle shower config, defaults used if parameters missing
    resultParticleConfig: {
        level1: {
            enabled: false,
            landscape: { speed: { start: 1100, end: 1500, minimumSpeedMultiplier: 1 }, frequency: 0.12, scale: { start: 0.74, end: 0.78, minimumScaleMultiplier: 0.74 }, emitterLifetime: 2 },
            portrait: { speed: { start: 1100, end: 1500, minimumSpeedMultiplier: 1 }, frequency: 0.12, scale: { start: 0.74, end: 0.78, minimumScaleMultiplier: 0.74 }, emitterLifetime: 2 }
        },
        level2: {
            enabled: true,
            landscape: { rotationSpeed: { min: -90, max: 90 }, acceleration: { x: 0, y: 1500 }, speed: { start: 1600, end: 2100, minimumSpeedMultiplier: 0.8 }, frequency: 0.005, scale: { start: 0.74, end: 1.25, minimumScaleMultiplier: 0.74 }, emitterLifetime: 0.35 },
            portrait: { rotationSpeed: { min: -90, max: 90 }, acceleration: { x: 0, y: 1500 }, speed: { start: 1600, end: 2100, minimumSpeedMultiplier: 0.8 }, frequency: 0.005, scale: { start: 0.74, end: 1.25, minimumScaleMultiplier: 0.74 }, emitterLifetime: 0.35 }
        },
        level3: {
            enabled: true,
            landscape: { rotationSpeed: { min: -90, max: 90 }, acceleration: { x: 0, y: 1500 }, speed: { start: 1600, end: 2100, minimumSpeedMultiplier: 0.8 }, frequency: 0.0025, scale: { start: 0.74, end: 1.25, minimumScaleMultiplier: 0.74 }, emitterLifetime: 0.35 },
            portrait: { rotationSpeed: { min: -90, max: 90 }, acceleration: { x: 0, y: 1500 }, speed: { start: 1600, end: 2100, minimumSpeedMultiplier: 0.8 }, frequency: 0.0025, scale: { start: 0.74, end: 1.25, minimumScaleMultiplier: 0.74 }, emitterLifetime: 0.35 }
        }
    },
    // Big win particle config, defaults used if parameters missing
    bigWinSettings: {
        landscape: {},
        portrait: {}
    },
    // Big win particle config, defaults used if parameters missing
    bigWinSettingsPepper: {
        landscape: {},
        portrait: {}
    },
    // Background particle config
    backgroundParticleConfig: {
        base: {},
        bonus: {}
    },

    // Scale Big Win with result plaque (if Big Win sits directly behind plaque)
    scaleBigWinWithPlaque: false,

    // Toggle background music on/off
    backgroundMusicEnabled: true,
    autoPlayAudioInterval: 0.35,
    useUI2Plaques: false,

    //enable console on MNS
    consoleEnabledDuringPlay: true,

    // Override maximum button width (for example if we have a bevel on the texture)
    overrideMaxButtonWidth: true,
    overrideButtonWidthValue: 50
});