class Vector3 implements Vector {
  constructor(
    public x: number,
    public y: number,
    public z: number,
  ) {}

  public set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export default Vector3;
