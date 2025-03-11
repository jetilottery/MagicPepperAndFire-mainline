define(function(require) {
    const gameFlow = require('skbJet/componentLIT/standardIW/gameFlow');
    //const meterData = require('skbJet/componentLIT/standardIW/meterData');


    async function endReveal() {
        // IMPLEMENT: Wait until the game is fully revealed before continuing
        // You may need to wait for a prizetable to animate, or for the user to reveal the remaining
        // non-winning items. Before continuing the user must have seen the whole reveal and be shown
        // the final win value. Definitely don't set win meter to meterData.totalWin, that's cheating.

        // REMOVE THAT LINE AS SOON AS YOU HAVE THE FINAL MECHANIC
        //meterData.win = meterData.totalWin;

        gameFlow.next('REVEAL_COMPLETE');
    }

    gameFlow.handle(endReveal, 'END_REVEAL');
});