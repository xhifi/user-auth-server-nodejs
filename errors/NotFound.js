import { StatusCodes as Status } from "http-status-codes";
import CustomApiError from "./CustomApiError.js";

class NotFoundError extends CustomApiError {
  constructor(message) {
    super(message);
    this.StatusCode = Status.NOT_FOUND;
  }
}
export default NotFoundError;
