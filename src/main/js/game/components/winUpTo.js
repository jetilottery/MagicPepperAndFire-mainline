define(require => {
  const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  const displayList = require('skbJet/componentLIT/standardIW/displayList');
  require('com/gsap/plugins/PixiPlugin');

  function setWinUpTo() {
    displayList.winUpToInText.text = '';
    displayList.winUpToOutText.text = '';
  }

  msgBus.subscribe('PrizeData.PrizeStructure', setWinUpTo);

  return {
    reset: setWinUpTo,
  };
});
