class QFYApiException extends Error {
  static badRequest = QFYApiException.create({
    code: 400,
    desc: 'bad request',
  });
  static operatorNotFound = QFYApiException.create({
    code: 400001,
    desc: 'operator not found',
  });
  static wrongPassword = QFYApiException.create({
    code: 400002,
    desc: 'wrong password',
  });
  static serverError = QFYApiException.create({
    code: 500,
    desc: 'server error',
  });

  static create(dto: { code: number; desc: string }) {
    return new QFYApiException(dto.code, dto.desc);
  }

  data = {};

  constructor(
    public readonly code: number,
    public readonly desc: string,
  ) {
    super(desc);
  }
}

export { QFYApiException };
