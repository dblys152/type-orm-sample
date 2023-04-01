export class UserId {

  constructor(
    private _value: string
  ) {}

  public static of(value: string) {
    return new UserId(value);
  }

  get value(): string {
    return this._value;
  }
}