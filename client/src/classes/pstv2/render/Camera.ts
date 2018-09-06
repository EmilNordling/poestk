import Vector3 from './Vector3';

const FAR = 8000;
const NEAR = 200;

class Camera {
  private far = FAR;
  private near = NEAR;
  public position = new Vector3(0, 0, 0.2);

  constructor() {

  }

  public scale(value: number) {
    return value * this.position.z;
  }
}

export default Camera;
