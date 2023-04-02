import * as moment from "moment-timezone";

export class UserCouponPeriod {

  private _startedAt: moment.Moment;
  private _endedAt: moment.Moment;

  private constructor(startedAt: moment.Moment, endedAt: moment.Moment) {
    this.checkValidity(startedAt, endedAt);
    this._startedAt = startedAt;
    this._endedAt = endedAt;
  }

  public static of(startedAt: moment.Moment, endedAt: moment.Moment) {
    return new UserCouponPeriod(startedAt, endedAt);
  }

  private checkValidity(startedAt: moment.Moment, endedAt: moment.Moment): void {
    if (startedAt.isAfter(endedAt)) {
      throw new Error('시작일시가 종료일시보다 이후 일 수 없습니다.');
    }
  }

  get startedAt(): moment.Moment {
    return this._startedAt;
  }

  get endedAt(): moment.Moment {
    return this._endedAt;
  }
}