import BaseError from "../../errors/baseError.js";

class SessionError extends BaseError {
  constructor(message, statusCode, errors = null) {
    super(message, "session_error", statusCode, errors);
  }
}

export default SessionError;
