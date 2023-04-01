export class UserCouponPeriod {

  private _startedAt: Date;
  private _endedAt: Date;

  private constructor(startedAt: Date, endedAt: Date) {
    this.checkValidity(startedAt, endedAt);
    this._startedAt = startedAt;
    this._endedAt = endedAt;
  }

  public static of(startedAt: Date, endedAt: Date) {
    return new UserCouponPeriod(startedAt, endedAt);
  }

  private checkValidity(startTime: Date, endTime: Date): void {
    if (startTime >= endTime) {
      throw new Error('시작일시가 종료일시보다 이후 일 수 없습니다.');
    }
  }

  get startedAt(): Date {
    return this._startedAt;
  }

  get endedAt(): Date {
    return this._endedAt;
  }
}