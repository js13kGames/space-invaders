import { log } from './debug';
import { init as initGamepad } from './gamepad';
import { init as initRenderer } from './render';
import { init as initPhysics } from './physics';
import { WorldData } from './enemy';

const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;

const worldData: WorldData = {
  width: 0,
  height: 0
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const { getInput } = initGamepad(() => {
  window.requestAnimationFrame(update);
});

const { calculate } = initPhysics();

const { draw } = initRenderer($canvas);

let lastTime = 0;

function update(time: number) {
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  const input = getInput();
  const {
    playerPosition,
    projectiles,
    enemies
  } = calculate({
    input, deltaTime, worldData
  });
  draw({
    playerPosition,
    projectiles,
    enemies
  });
  window.requestAnimationFrame(update);
}

function resizeCanvas() {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
  worldData.width = $canvas.width;
  worldData.height = $canvas.height;
}
