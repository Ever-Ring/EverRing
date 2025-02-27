export interface ErrorResponse {
  code: string;
  message: string;
}

export class UnauthorizedError extends Error {
  isUnauthorized: boolean;

  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
    this.isUnauthorized = true;
  }
}
