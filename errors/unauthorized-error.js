class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCOde = 401;
  }
}

module.exports = UnauthorizedError;
