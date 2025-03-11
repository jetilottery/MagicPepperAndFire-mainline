define({
    // IMPLEMENT: Map SFX to channels

    /* 
     * If audio assets are named nicely you can do:
     * {
     *  fileName: channelNumber
     * }
     * 
     * Otherwise use a nice name for the keys and include the filename and channel as an array:
     * {
     *  soundName: ['Ugly_sound_file_V2-final', channelNumber]
     * }
     */

    music: ['BaseMusicLoop', 11],
    bonusMusic: ['BonusMusicLoop', 0],
    winTerminator: ['MusicTermWin', 1],
    loseTerminator: ['MusicTermLose', 1],
    transition: ['BonusTransition', 10],
    bonusTriggered: ['BonusTriggered', 10],
    click: ['Click', 4],
    costDown: ['BetDown', 1],
    costUp: ['BetUp', 2],
    costMax: ['BetMax', 3],
    bounce: ['WinRollTerm', 5],
    rollUp: ['WinRollup', 8],
    increment: ['BonusMultiplierIncrement', 10],
    BonusSymbolMultiplierReveal: ['BonusSymbolMultiplierReveal', 9],

    BonusMeterReveal1: ['BonusMeterReveal1', 7],
    BonusMeterReveal2: ['BonusMeterReveal2', 1],
    BonusMeterReveal3: ['BonusMeterReveal3', 2],
    BonusMeterReveal4: ['BonusMeterReveal4', 3],

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

    win: ['BaseSymbolRevealWin', 2],
    BonusSymbolReveal: ['BonusSymbolReveal', 2],
    revealBonus: ['BaseSymbolRevealBonus', 6],
    revealBaseGame: ['Reveal02', 1],
    revealMultiplierColumn: ['BaseSymbolRevealMultiplier', 7],
    playAllSound: ['RevealAllButton', 4],

    /*
     * Optional audio
     * The following audio is optional and will be ignored if not included
     */

    buy: ['BuyButton', 4],
    //revealAll: ['RevealAllButton', 4],
});