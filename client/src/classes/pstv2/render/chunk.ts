import Tile from './Tile';
import { RENDER_TILE_SIZE, TILE_SIZE } from '../utils/constants';
import Camera from './Camera';
import Canvas from './Canvas';
import Scene from './Scene';
import { drawNode } from './drawUtils';

function chunk(tileBuffer: Tile[], context2d: CanvasRenderingContext2D, camera: Camera, scene: Scene): void {
  if (tileBuffer.length === 0) return;

  let groupWidth = RENDER_TILE_SIZE;
  let groupHeight = RENDER_TILE_SIZE;
  const firstValue = tileBuffer[0];
  const lastValue = tileBuffer[tileBuffer.length - 1];
  const offsetX = -(firstValue.x * RENDER_TILE_SIZE);
  const offsetY = -(firstValue.y * RENDER_TILE_SIZE);

  if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
    groupWidth = (tileBuffer.length) * RENDER_TILE_SIZE;
  } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
    groupHeight = (tileBuffer.length) * RENDER_TILE_SIZE;
  } else {
    groupHeight = ((lastValue.y - firstValue.y) + 1) * RENDER_TILE_SIZE;
    groupWidth = ((lastValue.x - firstValue.x) + 1) * RENDER_TILE_SIZE;
  }

  const chunkCanvas = new Canvas(groupWidth, groupHeight);
  chunkCanvas.updateSize(groupWidth, groupHeight);
  const chunkContext = chunkCanvas.getContext()!;
  chunkContext.translate(offsetX, offsetY);

  const startX = Math.floor(
    ((firstValue.x * RENDER_TILE_SIZE) / camera.position.z / TILE_SIZE),
  );
  const startY = Math.floor(
    ((firstValue.y * RENDER_TILE_SIZE) / camera.position.z / TILE_SIZE),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * RENDER_TILE_SIZE) / camera.position.z / TILE_SIZE),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * RENDER_TILE_SIZE) / camera.position.z / TILE_SIZE),
  );
  const chunkData = scene.getTiles(startX, startY, endX, endY);
  // 703
  for (let node in chunkData.nodes) {
    drawNode(chunkData.nodes[node].context, chunkContext, camera);
  }

  tileBuffer.forEach((tile) => {
    tile.cacheTile(RENDER_TILE_SIZE, chunkContext, offsetX, offsetY);
    context2d.drawImage(
      tile.canvas.canvas,
      (tile.x * RENDER_TILE_SIZE) + -camera.position.x,
      (tile.y * RENDER_TILE_SIZE) + -camera.position.y,
      RENDER_TILE_SIZE,
      RENDER_TILE_SIZE,
    );
  });
}

export default chunk;
