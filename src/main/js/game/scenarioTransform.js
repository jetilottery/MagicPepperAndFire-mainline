define(require => {
    const prizeData = require('skbJet/componentLIT/standardIW/prizeData');

    return function scenarioTransform(scenarioString) {

        console.log("REAL SCENARIO --> " + scenarioString);

        // Split the scenario string
        const scenarioSplit = scenarioString.split("|");

        // For the bonus outcome, grab the last element from scenarioSplit
        // This will simply return an array of length 0 if there is no bonus outcome
        const bonusData = scenarioSplit.pop().split("");

        // Create array for main game
        const mainGame = [];

        // Run through the remaining scenarioSplit array
        scenarioSplit.forEach((str) => {
            // Create empty array
            const newArr = [];
            // Turn this string into an array
            const tempArr = str.split(',');

            // Run through this array, convert each element into its own array
            // That way we can convert the letter to an actual prize amount
            tempArr.forEach((element) => {
                const newArr2 = [];
                const [symbol, prize] = element.split("");
                newArr2.push(symbol);
                if (prize) {
                    newArr2.push(prizeData.prizeTable[prize]); // This will return undefined if this prize is not in the prize table
                }
                newArr.push(newArr2);
            });

            // Push into main game array
            mainGame.push(newArr);
        });

        console.log("REAL MAIN GAME --> " + mainGame);

        if (bonusData.length > 0) {
            console.log("GAME HAS A BONUS? --> TRUE || -->" + bonusData.length);
        } else {
            console.log("GAME HAS A BONUS? --> FALSE || -- >" + bonusData.length);
        }


        return {
            mainGame,
            bonusData
        };
    };
});