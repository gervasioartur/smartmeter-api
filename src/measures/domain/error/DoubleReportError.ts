export class DoubleReportError extends Error {
  constructor() {
    super('Leitura do mês já realizada');
    this.name = 'DOUBLE_REPORT';
  }
}
