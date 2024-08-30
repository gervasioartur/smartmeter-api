export class InvalidGeminiKeyError extends Error {
  constructor() {
    super('Chave do GEMINI inválida ou não definida.');
    this.name = 'INVALID_KEY';
  }
}
