class QFYApiResponse<T = unknown> {
  static ok = QFYApiResponse.create({
    code: 200,
    data: {},
    desc: 'bad request',
  });

  static create<T = unknown>(dto: { code: number; data: T; desc?: string }) {
    return new QFYApiResponse(dto.code, dto.data, dto.desc || '');
  }

  constructor(
    public readonly code: number = 200,
    public readonly data: T,
    public readonly desc: string = '',
  ) {}
}

export { QFYApiResponse };
