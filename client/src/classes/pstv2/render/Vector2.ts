class Vector2 implements Vector {
  constructor(
    public x: number,
    public y: number,
  ) {}

  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default Vector2;
