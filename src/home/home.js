import Granim from 'granim';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import debounce from 'javascript-debounce';
import * as PIXI from 'pixi.js';
import { Sprite, Texture } from 'pixi.js';
gsap.registerPlugin(ScrollTrigger);
//---PIXIJS APP
const myCanvas = document.querySelector('.mycanvas');
const app = new PIXI.Application({
  autoResize: true,
  antialias: true,
  autoDensity: true,
  backgroundAlpha: 0,
  resizeTo: myCanvas,
  eventMode: 'static',
  resolution: devicePixelRatio,
});
myCanvas.appendChild(app.view);
//make whole canvas interactive
app.stage.hitArea = app.screen;
//new mouse container
const newMouseCont = new PIXI.Container();
app.stage.addChild(newMouseCont);
//new mouse bounds
const newRect = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 150, 150).endFill();
newRect.alpha = 0;
newMouseCont.addChild(newRect);
//new mask container
const newMaskCont = new PIXI.Container();
app.stage.addChild(newMaskCont);
//new bg texture for mask container
const texture = Texture.from(
  'https://uploads-ssl.webflow.com/61788d4b03a8f8b0e89e3fa6/617b25e1d7cbd86b8d5d60db_web-banner-wt.png'
);
const maskedImg = new Sprite(texture);
maskedImg.anchor.set(0.5);
maskedImg.alpha = 0.65;
newMaskCont.addChild(maskedImg);
//create the circle mask
const newMask = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 100).endFill();
app.stage.addChild(newMask);
newMask.visible = false;
newMaskCont.mask = newMask;
//create displacement filter
const newDisSprite = PIXI.Sprite.from(
  'https://uploads-ssl.webflow.com/61788d4b03a8f8b0e89e3fa6/61788d4b03a8f8b9ed9e401a_map%20-%20pointer.png'
);
const newDisFilter = new PIXI.DisplacementFilter(newDisSprite);
newDisSprite.visible = false;
newDisSprite.width = 200;
newDisSprite.height = 200;
app.stage.addChild(newDisSprite);
//filter on mask container
newMaskCont.filters = [newDisFilter];
newDisFilter.scale.x = 30;
newDisFilter.scale.y = 10;
newDisSprite.anchor.set(0.5);
//create lens sprite
const newLens = PIXI.Sprite.from(
  'https://uploads-ssl.webflow.com/61788d4b03a8f8b0e89e3fa6/61788d4b03a8f8911d9e4019_glass%20-%20pointer.png'
);
newLens.anchor.set(0.5);
newLens.visible = false;
newLens.width = 200;
newLens.height = 200;
app.stage.addChild(newLens);
//create pointer for ease tracking and position
const pointer = new PIXI.Graphics().beginFill(0xffffff).drawCircle(0, 0, 0).endFill();
let ease = 0.05;

//app stage mousemove
app.stage.addEventListener('pointermove', onPointerMove);

//appear on mousemove
function onPointerMove(eventData) {
  let position = eventData.global;
  newLens.visible = true;
  newMask.visible = true;
  newDisSprite.visible = true;
  pointer.position.copyFrom(position);
}
//ticker
app.ticker.add(onTick);
function onTick() {
  let dx = pointer.x - newDisSprite.x;
  let dy = pointer.y - newDisSprite.y;
  let vx = dx * ease;
  let vy = dy * ease;
  newDisSprite.x += vx;
  newDisSprite.y += vy;
  newMask.position.copyFrom(newDisSprite.position);
  newLens.position.copyFrom(newDisSprite.position);
}
function applyResize() {
  //get variables to watch width and height
  let appWidth = app.screen.width;
  let appHeight = app.screen.height;
  let centerX = appWidth / 2;
  let centerY = appHeight / 2;
  //use texture width & height
  let bgWidth = maskedImg.texture.width;
  let bgHeight = maskedImg.texture.height;
  //recenter on debounce
  maskedImg.position.x = centerX;
  maskedImg.position.y = centerY;
  newRect.width = appWidth;
  newRect.height = appHeight;
  app.resize(appWidth, appHeight);
  //set scale
  let scaleX = appWidth / bgWidth;
  let scaleY = appHeight / bgHeight;
  let scale = Math.min(scaleX, scaleY);
  if (bgWidth > appWidth) {
    maskedImg.scale.set(scale * 0.48);
  } else {
    maskedImg.scale.set(scale * 0.6);
  }
}
//debounce resize
window.onload = function () {
  //console.log('waited');
  applyResize();
};
let debounceApply = debounce(applyResize, 50);
window.addEventListener('resize', debounceApply);

//GRANIM
//color gradient
let granimInstance = new Granim({
  element: '#color-gradient',
  direction: 'diagonal',
  isPausedWhenNotInView: true,
  scrollDebounceThreshold: 300,
  stateTransitionSpeed: 500,
  states: {
    'default-state': {
      gradients: [
        ['#7BF2E9', '#8420CA'],
        ['#AFF0D0', '#9894E1'],
      ],
      transitionSpeed: 3000,
    },
  },
});
//     'h2-state': {
//       gradients: [
//         ['#6ee2f5', '#3A3985'],
//         ['#3F76A4', '#69BDA2'],
//       ],
//       transitionSpeed: 3000,
//     },
//     'nmn-state': {
//       gradients: [
//         ['#AA475A', '#F3C068'],
//         ['#FFCDA5', '#FF881B'],
//       ],
//       transitionSpeed: 3000,
//     },
//     'sod-state': {
//       gradients: [
//         ['#341C56', '#CE8F79'],
//         ['#FF9482', '#7D77FF'],
//       ],
//       transitionSpeed: 3000,
//     },
//   },
// });
// With jQuery
// $('#h2').on('mouseenter', function (event) {
//   granimInstance.changeState('h2-state');
// });
// $('#h2').on('mouseleave', function (event) {
//   granimInstance.changeState('default-state');
// });
// $('#nad').on('mouseenter', function (event) {
//   granimInstance.changeState('nmn-state');
// });
// $('#nad').on('mouseleave', function (event) {
//   granimInstance.changeState('default-state');
// });
// $('#sod').on('mouseenter', function (event) {
//   granimInstance.changeState('sod-state');
// });
// $('#sod').on('mouseleave', function (event) {
//   granimInstance.changeState('default-state');
// });

//VIDEO WRAPPER EXPAND
gsap.to('.db_video-wrapper', {
  scrollTrigger: {
    trigger: '.db_video-wrapper',
    start: 'top 70%',
    end: '80% bottom',
    scrub: 1,
  },
  opacity: '1',
  width: '100vw',
});
