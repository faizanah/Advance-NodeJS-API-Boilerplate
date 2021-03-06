import path from 'path';

let errors;
(async () => {
  errors = await import(path.join(process.cwd(), 'utilities/errors.json'));
})();

class AppError extends Error {
  constructor(type = 'SERVER_ERROR', params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
    if (errors[type]) {
      this.name = errors[type].name;
      this.description = params || errors[type].description;
      this.code = errors[type].code;
      this.status = errors[type].status;
      this.date = new Date();
    } else {
      this.code = type;
      this.status = 200;
    }
  }
}
export default AppError;
