import Tile from './Tile';
import { TILE_SIZE, DATA_TILE_SIZE } from '../utils/constants';
import Camera from './Camera';
import Canvas from './Canvas';
import Scene from './Scene';
import { drawNode, drawConnection } from './drawUtils';

function _chunk(_, tileBuffer: Tile[], context2d: CanvasRenderingContext2D, camera: Camera, scene: Scene) {
  if (tileBuffer.length === 0) return;

  let groupWidth = TILE_SIZE;
  let groupHeight = TILE_SIZE;

  const firstValue = tileBuffer[0];
  const lastValue = tileBuffer[tileBuffer.length - 1];

  const offsetX = -(firstValue.x * TILE_SIZE);
  const offsetY = -(firstValue.y * TILE_SIZE);

  if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
    groupWidth = (tileBuffer.length) * TILE_SIZE;
  } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
    groupHeight = (tileBuffer.length) * TILE_SIZE;
  } else {
    groupHeight = ((lastValue.y - firstValue.y) + 1) * TILE_SIZE;
    groupWidth = ((lastValue.x - firstValue.x) + 1) * TILE_SIZE;
  }

  const chunkCanvas = new Canvas(groupWidth, groupHeight);
  chunkCanvas.updateSize(groupWidth, groupHeight);
  const chunkContext = chunkCanvas.getContext()!;
  chunkContext.translate(offsetX, offsetY);

  const startX = Math.floor(
    ((firstValue.x * _) / camera.position.z / DATA_TILE_SIZE),
  );
  const startY = Math.floor(
    ((firstValue.y * _) / camera.position.z / DATA_TILE_SIZE),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * _) / camera.position.z / DATA_TILE_SIZE),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * _) / camera.position.z / DATA_TILE_SIZE),
  );

  const chunkData = scene.getTiles(startX, startY, endX, endY);

  chunkContext.lineWidth = camera.scale(10);
  chunkContext.beginPath();
  for (const connection in chunkData.connections) {
    drawConnection(chunkData.connections[connection].context, chunkContext, camera);
  }
  chunkContext.stroke();

  for (const node in chunkData.nodes) {
    drawNode(chunkData.nodes[node].context, chunkContext, camera);
  }

  // document.body.appendChild(chunkCanvas.getCanvas())
  tileBuffer.forEach((tile) => {
    tile.cacheTile(TILE_SIZE, chunkContext, offsetX, offsetY);

    // document.body.appendChild(tile.canvas.getCanvas())
    context2d.drawImage(
      tile.canvas.canvas,
      (tile.x * _) + -camera.position.x,
      (tile.y * _) + -camera.position.y,
      _,
      _,
    );
  });
}

function chunk(realTileSize: number, tileBuffer: Tile[], context2d: CanvasRenderingContext2D, camera: Camera, scene: Scene): void {
  if (tileBuffer.length === 0) return;

  let groupWidth = realTileSize;
  let groupHeight = realTileSize;
  const firstValue = tileBuffer[0];
  const lastValue = tileBuffer[tileBuffer.length - 1];
  const offsetX = -(firstValue.x * realTileSize);
  const offsetY = -(firstValue.y * realTileSize);

  if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
    groupWidth = (tileBuffer.length) * realTileSize;
  } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
    groupHeight = (tileBuffer.length) * realTileSize;
  } else {
    groupHeight = ((lastValue.y - firstValue.y) + 1) * realTileSize;
    groupWidth = ((lastValue.x - firstValue.x) + 1) * realTileSize;
  }

  const chunkCanvas = new Canvas(groupWidth, groupHeight);
  chunkCanvas.updateSize(groupWidth, groupHeight);
  const chunkContext = chunkCanvas.getContext()!;
  chunkContext.translate(offsetX, offsetY);

  const startX = Math.floor(
    ((firstValue.x * realTileSize) / camera.position.z / DATA_TILE_SIZE),
  );
  const startY = Math.floor(
    ((firstValue.y * realTileSize) / camera.position.z / DATA_TILE_SIZE),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * realTileSize) / camera.position.z / DATA_TILE_SIZE),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * realTileSize) / camera.position.z / DATA_TILE_SIZE),
  );
  const chunkData = scene.getTiles(startX, startY, endX, endY);
  // 703

  chunkContext.lineWidth = camera.scale(10);
  chunkContext.beginPath();
  for (const connection in chunkData.connections) {
    drawConnection(chunkData.connections[connection].context, chunkContext, camera);
  }
  chunkContext.stroke();

  for (const node in chunkData.nodes) {
    drawNode(chunkData.nodes[node].context, chunkContext, camera);
  }

  tileBuffer.forEach((tile) => {
    tile.cacheTile(realTileSize, chunkContext, offsetX, offsetY);
    context2d.drawImage(
      tile.canvas.canvas,
      (tile.x * realTileSize) + -camera.position.x,
      (tile.y * realTileSize) + -camera.position.y,
      realTileSize,
      realTileSize,
    );
  });
}

export default _chunk;
