class AdicionaImagensError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AdicionaImagensError';
  }
}

export { AdicionaImagensError };
