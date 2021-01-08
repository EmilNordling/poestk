export class ApiControllerBase {
  protected readonly controller: string;

  constructor(controller: string) {
    const root = ''; // todo connect this to an actual api

    this.controller = `${root}/${controller}`;
  }
}
