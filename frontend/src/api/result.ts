const InternalBadRequest = -1;

class Result<ResultType = null> {
  private _status!: number;
  private _result!: ResultType | null;
  private _message!: string | null;

  private constructor() {}

  static async New<ResultType>(
    response: Response
  ): Promise<Result<ResultType>> {
    const result = new Result<ResultType>();
    await result.Append(response);
    return result;
  }

  static NewInternalError<ResultType>(
    status: number,
    message: string
  ): Result<ResultType> {
    const result = new Result<ResultType>();
    result._status = status;
    result._result = null;
    result._message = message;

    return result;
  }

  get status() {
    return this._status;
  }
  get result() {
    return this._result;
  }
  get message() {
    return this._message;
  }

  private async Append(response: Response): Promise<void> {
    this._status = response.status;

    const contentType = response.headers.get('Content-Type');

    if (contentType == null) {
      this._result = null;
      this._message = null;
    } else if (contentType.includes('application/json')) {
      this._result = await response.json();
      this._message = null;
    } else if (contentType.includes('text/plain')) {
      this._result = null;
      this._message = await response.text();
    } else {
      this._result = null;
      this._message = 'cannnot read API response';
    }
  }

  IsOK(): this is { result: ResultType } {
    return 200 <= this.status && this.status < 300;
  }

  static InternalBadRequestError<ResultType>(
    message: string
  ): Result<ResultType> {
    return this.NewInternalError(InternalBadRequest, message);
  }
  IsInternalBadRequest(): boolean {
    return this.status === InternalBadRequest;
  }
}

export default Result;
