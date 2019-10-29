
const _hasOwnProperty = Object.prototype.hasOwnProperty;

const Status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNSUPPORTED_ACTION: 405,
  VALIDATION_FAILED: 422,
  SERVER_ERROR: 500,
  CREATED: 201,
};

function statusMessage(status) {
  switch (status) {
    case Status.BAD_REQUEST:
      return 'Bad Request';
    case Status.UNAUTHORIZED:
      return 'Unauthorized';
    case Status.FORBIDDEN:
      return 'Forbidden';
    case Status.NOT_FOUND:
      return 'Not Found';
    case Status.UNSUPPORTED_ACTION:
      return 'Unsupported Action';
    case Status.VALIDATION_FAILED:
      return 'Validation Failed';
    case Status.SERVER_ERROR:
      return 'Internal Server Error';
    case status.CREATED:
      return 'Created';
  }
}

const jsonResponse = (res, body, options) => {
  options = options || {};
  options.status = options.status || Status.OK;
  res.status(options.status).json(body || null);
};
const meta = (req, res, source) => ({
  transId: req.get('x-transid'),
  transParentId: 'not mendatory',
  status: '0000',
  source: source || 'DB',
  description: 'Success',
  responseTime: new Date(),
});

const Api = {
  ok: (req, res, data, source) => {
    const response = {
      responseMetaData: meta(req, res, source),
      response: data,
    };
    jsonResponse(res, response, {
      status: Status.OK,
    });
  },

  badRequest(req, res, errors) {


  },
  unauthorized(req, res, error) {
    const body = {
      error,
    };

    jsonResponse(res, body, {
      status: Status.UNAUTHORIZED,
    });
  },

  forbidden(req, res) {
    const body = {
      message: statusMessage(Status.FORBIDDEN),
    };

    jsonResponse(res, body, {
      status: Status.FORBIDDEN,
    });
  },
  notFound(req, res, errors = undefined, source) {
    errors = Array.isArray(errors) ? errors : [errors];
    const response = {
      responseMetaData: meta(req, res, source),
      exception: errors,
    };
    jsonResponse(res, response, {
      status: Status.NOT_FOUND,
    });
  },

  unsupportedAction(req, res) {
    const body = {
      message: statusMessage(Status.UNSUPPORTED_ACTION),
    };

    jsonResponse(res, body, {
      status: Status.UNSUPPORTED_ACTION,
    });
  },

  invalid(req, res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];

    const body = {
      message: statusMessage(Status.VALIDATION_FAILED),
      errors,
    };

    jsonResponse(res, body, {
      status: Status.VALIDATION_FAILED,
    });
  },
  serverError: (req, res, error) => {
    if (error instanceof Error) {
      error = {
        message: error.message,
        stacktrace: error.stack,
      };
    }
    const response = {
      responseMetaData: meta(req),
      exception: error,
    };
    jsonResponse(res, response, {
      status: Status.SERVER_ERROR,
    });
  },

  requireParams(req, res, params, next) {
    const missing = [];

    params = Array.isArray(params) ? params : [params];

    params.forEach((param) => {
      if (!(req.body && _hasOwnProperty.call(req.body, param)) && !(req.params && _hasOwnProperty.call(req.params, param))
                && !_hasOwnProperty.call(req.query, param)) {
        missing.push(`Missing required parameter: ${param}`);
      }
    });

    if (missing.length) {
      Api.badRequest(req, res, missing);
    } else {
      next();
    }
  },
  created(req, res, data = undefined, source = undefined) {
    const response = {
      responseMetaData: meta(req, res, source),
    };
    if (data) { response.response = data; }
    jsonResponse(res, response, {
      status: Status.CREATED,
    });
  },

  requireHeaders(req, res, headers, next) {
    const missing = [];

    headers = Array.isArray(headers) ? headers : [headers];

    headers.forEach((header) => {
      if (!(req.headers && _hasOwnProperty.call(req.headers, header))) {
        missing.push(`Missing required header parameter: ${header}`);
      }
    });

    if (missing.length) {
      Api.badRequest(req, res, missing);
    } else {
      next();
    }
  },
};

export default Api;
