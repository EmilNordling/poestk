import { nodeAngle } from '../utils/constants';

export class Vec2 {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  set({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

export const getOrbitAngle = (e, t) => {
  // THAT SWITCH CASE BOI
  if (t === 40) {
    switch (e) {
      case 0:
        return getOrbitAngle(0, 12);
      case 1:
        return getOrbitAngle(0, 12) + 10 * nodeAngle;
      case 2:
        return getOrbitAngle(0, 12) + 20 * nodeAngle;
      case 3:
        return getOrbitAngle(1, 12);
      case 4:
        return getOrbitAngle(1, 12) + 10 * nodeAngle;
      case 5:
        return getOrbitAngle(1, 12) + 15 * nodeAngle;
      case 6:
        return getOrbitAngle(1, 12) + 20 * nodeAngle;
      case 7:
        return getOrbitAngle(2, 12);
      case 8:
        return getOrbitAngle(2, 12) + 10 * nodeAngle;
      case 9:
        return getOrbitAngle(2, 12) + 20 * nodeAngle;
      case 10:
        return getOrbitAngle(3, 12);
      case 11:
        return getOrbitAngle(3, 12) + 10 * nodeAngle;
      case 12:
        return getOrbitAngle(3, 12) + 20 * nodeAngle;
      case 13:
        return getOrbitAngle(4, 12);
      case 14:
        return getOrbitAngle(4, 12) + 10 * nodeAngle;
      case 15:
        return getOrbitAngle(4, 12) + 15 * nodeAngle;
      case 16:
        return getOrbitAngle(4, 12) + 20 * nodeAngle;
      case 17:
        return getOrbitAngle(5, 12);
      case 18:
        return getOrbitAngle(5, 12) + 10 * nodeAngle;
      case 19:
        return getOrbitAngle(5, 12) + 20 * nodeAngle;
      case 20:
        return getOrbitAngle(6, 12);
      case 21:
        return getOrbitAngle(6, 12) + 10 * nodeAngle;
      case 22:
        return getOrbitAngle(6, 12) + 20 * nodeAngle;
      case 23:
        return getOrbitAngle(7, 12);
      case 24:
        return getOrbitAngle(7, 12) + 10 * nodeAngle;
      case 25:
        return getOrbitAngle(7, 12) + 15 * nodeAngle;
      case 26:
        return getOrbitAngle(7, 12) + 20 * nodeAngle;
      case 27:
        return getOrbitAngle(8, 12);
      case 28:
        return getOrbitAngle(8, 12) + 10 * nodeAngle;
      case 29:
        return getOrbitAngle(8, 12) + 20 * nodeAngle;
      case 30:
        return getOrbitAngle(9, 12);
      case 31:
        return getOrbitAngle(9, 12) + 10 * nodeAngle;
      case 32:
        return getOrbitAngle(9, 12) + 20 * nodeAngle;
      case 33:
        return getOrbitAngle(10, 12);
      case 34:
        return getOrbitAngle(10, 12) + 10 * nodeAngle;
      case 35:
        return getOrbitAngle(10, 12) + 15 * nodeAngle;
      case 36:
        return getOrbitAngle(10, 12) + 20 * nodeAngle;
      case 37:
        return getOrbitAngle(11, 12);
      case 38:
        return getOrbitAngle(11, 12) + 10 * nodeAngle;
      case 39:
        return getOrbitAngle(11, 12) + 20 * nodeAngle;
      default:
        return false;
    }
  }

  return 2 * Math.PI * e / t;
};