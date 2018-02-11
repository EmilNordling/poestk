class Render {
  clear(x = 0, y = 0, width = this.width, height = this.height) {
    this.getContext().clearRect(x, y, width, height);
  }

  getContext() {
    return this.canvas.getContext('2d');
  }
}

export default Render;
