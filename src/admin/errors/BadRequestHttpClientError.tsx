import type { FieldError } from "@/types/error";

class BadRequestHttpClientError extends Error {
  public constructor(
    public readonly message: string,
    public readonly payload?: FieldError[],
  ) {
    super(message);
    this.message = message;
    this.payload = payload;
  }
}

export default BadRequestHttpClientError;
