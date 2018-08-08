enum NodeStructures {
  leaf,
  collision,
  index,
  array,
}

const SHIFTSTEP = 5;

const CHUNK = Math.pow(2, SHIFTSTEP);

const MASK = CHUNK - 1;

const BITMAPNODEMAX = 16;

const ARRAYNODEMIN = 8;
