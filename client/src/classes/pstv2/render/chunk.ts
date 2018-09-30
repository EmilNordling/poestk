import Tile from './Tile';
import { TILE_SIZE, DATA_TILE_SIZE } from '../utils/constants';
import Camera from './Camera';
import Canvas from './Canvas';
import Scene from './Scene';
import { drawNode, drawConnection } from './drawUtils';
import Vector2 from './Vector2';
import Renderer from './Renderer';

function chunk(tileBuffer: Tile[], scale: number, renderer: Renderer, camera: Camera, scene: Scene) {
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
    ((firstValue.x * TILE_SIZE) / scale / DATA_TILE_SIZE),
  );
  const startY = Math.floor(
    ((firstValue.y * TILE_SIZE) / scale / DATA_TILE_SIZE),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * TILE_SIZE) / scale / DATA_TILE_SIZE),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * TILE_SIZE) / scale / DATA_TILE_SIZE),
  );

  const chunkData = scene.getData(new Vector2(startX, startY), new Vector2(endX, endY), scale);
  chunkContext.strokeStyle = '#545662';
  chunkContext.lineWidth = 0.1 * scale;
  chunkContext.beginPath();
  for (const connection in chunkData.connections) {
    drawConnection(chunkData.connections[connection].context, chunkContext, camera, scale);
  }
  chunkContext.stroke();

  console.log(Object.keys(chunkData.connections).length);

  for (const node in chunkData.nodes) {
    drawNode(chunkData.nodes[node].context, chunkContext, camera, scale);
  }

  console.log(Object.keys(chunkData.nodes).length);

  tileBuffer.forEach((tile) => {
    requestAnimationFrame(() => {
      tile.cacheTile(TILE_SIZE, chunkContext, offsetX, offsetY);
    });

    requestAnimationFrame(() => {
      const cachedTile = tile.canvas.canvas;
      renderer.plane.appendChild(cachedTile);
      cachedTile.style.position = 'absolute';
      cachedTile.style.transform = `translate3d(${tile.x * TILE_SIZE}px, ${tile.y * TILE_SIZE}px, 0px)`;
    });
  });
}

export default chunk;
