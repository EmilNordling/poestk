import Canvas from './Canvas';
import { drawConnection, drawNode } from './drawUtilsHTML5';
import ClientStore from '../ClientStore';
import { strokeSize } from '../utils/constants';
import Camera from '../viewport/Camera';
import TreeData from '../TreeData';

function draw(tileBuffer, viewContext) {
  if (tileBuffer.length === 0) return;

  let groupWidth = ClientStore.tileSize;
  let groupHeight = ClientStore.tileSize;
  const firstValue = tileBuffer[0];
  const lastValue = tileBuffer[tileBuffer.length - 1];
  const offsetX = -(firstValue.x * ClientStore.tileSize);
  const offsetY = -(firstValue.y * ClientStore.tileSize);

  if (firstValue.x < lastValue.x && firstValue.y === lastValue.y) {
    groupWidth = (tileBuffer.length) * ClientStore.tileSize;
  } else if (firstValue.y < lastValue.y && firstValue.x === lastValue.x) {
    groupHeight = (tileBuffer.length) * ClientStore.tileSize;
  } else {
    groupHeight = ((lastValue.y - firstValue.y) + 1) * ClientStore.tileSize;
    groupWidth = ((lastValue.x - firstValue.x) + 1) * ClientStore.tileSize;
  }

  const chunkCanvas = new Canvas(groupWidth, groupHeight);
  chunkCanvas.updateSize(groupWidth, groupHeight);
  const chunkContext = chunkCanvas.getContext();

  // TODO: rewrite
  chunkContext.translate(offsetX, offsetY);
  const startX = Math.floor(
    ((firstValue.x * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
  );
  const startY = Math.floor(
    ((firstValue.y * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
  );
  const endX = Math.ceil(
    (((lastValue.x + 1) * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
  );
  const endY = Math.ceil(
    (((lastValue.y + 1) * ClientStore.tileSize) / Camera.zoomLevel / TreeData.tileSize),
  );
  const chunkData = TreeData.getTiles(startX, startY, endX, endY);

  chunkContext.strokeStyle = '#545662';
  chunkContext.lineWidth = Camera.scale(strokeSize);

  chunkContext.beginPath();
  chunkData.connections.forEach(c => drawConnection(c, chunkContext));
  chunkContext.stroke();

  chunkContext.lineWidth = Camera.scale(strokeSize + 5);
  chunkData.nodes.forEach(n => drawNode(n, chunkContext));

  chunkContext.setTransform(1, 0, 0, 1, 0, 0);

  tileBuffer.forEach((tile) => {
    tile.cacheTile(ClientStore.tileSize, chunkContext, offsetX, offsetY);
    viewContext.drawImage(
      tile.canvas.canvas,
      (tile.x * ClientStore.tileSize) + -Camera.position.x,
      (tile.y * ClientStore.tileSize) + -Camera.position.y,
      ClientStore.tileSize,
      ClientStore.tileSize,
    );
  });
}

export default draw;
