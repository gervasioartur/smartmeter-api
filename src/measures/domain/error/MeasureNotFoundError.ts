export class MeasureNotFoundError extends Error {
  constructor() {
    super('Leitura não encontrada.');
    this.name = 'MEASURE_NOT_FOUND';
  }
}
