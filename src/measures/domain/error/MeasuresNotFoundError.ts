export class MeasuresNotFoundError extends Error {
  constructor() {
    super('Nenhum registro encontrado.');
    this.name = 'MEASURES_NOT_FOUND';
  }
}
