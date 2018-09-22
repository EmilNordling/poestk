import Vector3 from './Vector3';

class Camera {
  public position = new Vector3(89.62564705882353, 191.29376470588235, 1);

  constructor() {

  }

  public scale(value: number) {
    return value * this.position.z;
  }
}

export default Camera;
