define(function() {
  // const msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
  //const displayList = require('skbJet/componentLIT/standardIW/displayList');
  // const orientation = require('skbJet/componentLIT/standardIW/orientation');
  // const payTable = require('game/components/paytable');
  // const PIXI = require('com/pixijs/pixi');
  // const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');


  function preload(app, callback) {
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['Ruby7s_atlas_page_Ruby7s.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['Ruby7s_atlas_page_Ruby7s.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['Ruby7s_atlas_page_Ruby7s2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['Ruby7s_atlas_page_Ruby7s2.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_bonusMeter_atlas_page_ruby7s_bonusMeter.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_bonusMeter_atlas_page_ruby7s_bonusMeter.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_bonusMeter_atlas_page_ruby7s_bonusMeter2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_bonusSymbols_atlas_page_ruby7s_bonusSymbols.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_bonusSymbols_atlas_page_ruby7s_bonusSymbols.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_logoAnim_atlas_page_ruby7s_logoAnim.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_logoAnim_atlas_page_ruby7s_logoAnim.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_logoAnim_atlas_page_ruby7s_logoAnim2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_logoAnim_atlas_page_ruby7s_logoAnim3.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_logoAnim_atlas_page_ruby7s_logoAnim4.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_transition_atlas_page_ruby7s_transition.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_transition_atlas_page_ruby7s_transition.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['ruby7s_transition_atlas_page_ruby7s_transition2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelFX_atlas_page_wheelFX.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelFX_atlas_page_wheelFX.png']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelFX_atlas_page_wheelFX2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelFX_atlas_page_wheelFX3.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['wheelFX_atlas_page_wheelFX4.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['winPlaqueAnim_atlas_page_winPlaqueAnim.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['winPlaqueAnim_atlas_page_winPlaqueAnim2.jpg']);
    // app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache['winPlaqueAnim_atlas_page_winPlaqueAnim3.jpg']);
    app.renderer.plugins.prepare.upload(callback);
  }

  // function text() {
  //displayList.moveToMoneyButton.alpha = 1;
  //displayList.moveToMoneyButton.children[4].scale.set(Math.min(200/displayList.moveToMoneyButton.children[4].texture.baseTexture.width,1));
  //}


  return {
    preload,
    //text
  };
});