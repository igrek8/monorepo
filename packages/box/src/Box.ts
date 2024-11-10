export class Box<T> {
  public constructor(public value: T) {
    Object.seal(this);
  }

  public get [Symbol.toStringTag](): string {
    return Box.name;
  }
}
