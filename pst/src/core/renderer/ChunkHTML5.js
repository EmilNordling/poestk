import Canvas from './Canvas';
import { drawConnection, drawNode } from './drawUtilsHTML5';
import { strokeSize, tileSize } from '../utils/constants';
import Camera from './Camera';
import Controller from '../controller';
// TEMP

function draw(tileBuffer, viewContext) {
  if (tileBuffer.length === 0) return;

  let groupWidth = tileSize;
  let groupHeight = tileSize;
  const firstValue = tileBuffer[0];
  const lastValue = tileBuffer[tileBuffer.length - 1];
  const offsetX = -(firstValue.x * tileSize);
  const offsetY = -(firstValue.y * tileSize);

  if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
    groupWidth = (tileBuffer.length) * tileSize;
  } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
    groupHeight = (tileBuffer.length) * tileSize;
  } else {
    groupHeight = ((lastValue.y - firstValue.y) + 1) * tileSize;
    groupWidth = ((lastValue.x - firstValue.x) + 1) * tileSize;
  }

  const chunkCanvas = new Canvas(groupWidth, groupHeight);
  chunkCanvas.updateSize(groupWidth, groupHeight);
  const chunkContext = chunkCanvas.getContext();

  // TODO: rewrite
  chunkContext.translate(offsetX, offsetY);
  const startX = Math.floor(
    ((firstValue.x * tileSize) / Camera.zoomLevel / Controller.TreeData.tileSize),
  );
  const startY = Math.floor(
    ((firstValue.y * tileSize) / Camera.zoomLevel / Controller.TreeData.tileSize),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * tileSize) / Camera.zoomLevel / Controller.TreeData.tileSize),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * tileSize) / Camera.zoomLevel / Controller.TreeData.tileSize),
  );
  const chunkData = Controller.TreeData.getTiles(startX, startY, endX, endY);

  chunkContext.strokeStyle = '#545662';
  chunkContext.lineWidth = Camera.scale(strokeSize);

  chunkContext.beginPath();
  chunkData.connections.forEach(c => drawConnection(c, chunkContext));
  chunkContext.stroke();

  chunkContext.lineWidth = Camera.scale(strokeSize + 5);
  chunkData.nodes.forEach(n => drawNode(n, chunkContext));

  chunkContext.setTransform(1, 0, 0, 1, 0, 0);

  tileBuffer.forEach((tile) => {
    requestAnimationFrame(() => tile.cacheTile(tileSize, chunkContext, offsetX, offsetY));
    requestAnimationFrame(() => viewContext.drawImage(
      tile.canvas.canvas,
      (tile.x * tileSize) + -Camera.position.x,
      (tile.y * tileSize) + -Camera.position.y,
      tileSize,
      tileSize,
    ));
  });
}

export default draw;
