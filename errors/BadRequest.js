import { StatusCodes as Status } from "http-status-codes";
import CustomApiError from "./CustomApiError.js";

class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.StatusCode = Status.BAD_REQUEST;
  }
}
export default BadRequestError;
