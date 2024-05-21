// https://github.com/joonhocho/tshttpcode

type HttpStatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 306
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 419
  | 420
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

type HttpStatusName =
  | "continue" // 100
  | "switching_protocols" // 101
  | "processing" // 102
  | "early_hints" // 103
  | "ok" // 200
  | "created" // 201
  | "accepted" // 202
  | "non_authoritative_information" // 203
  | "no_content" // 204
  | "reset_content" // 205
  | "partial_content" // 206
  | "multi_status" // 207
  | "already_reported" // 208
  | "im_used" // 226
  | "multiple_choices" // 300
  | "moved_permanently" // 301
  | "found" // 302
  | "see_other" // 303
  | "not_modified" // 304
  | "use_proxy" // 305
  | "switch_proxy" // 306
  | "temporary_redirect" // 307
  | "permanent_redirect" // 308
  | "bad_request" // 400
  | "unauthorized" // 401
  | "payment_required" // 402
  | "forbidden" // 403
  | "not_found" // 404
  | "method_not_allowed" // 405
  | "not_acceptable" // 406
  | "proxy_authentication_required" // 407
  | "request_timeout" // 408
  | "conflict" // 409
  | "gone" // 410
  | "length_required" // 411
  | "precondition_failed" // 412
  | "payload_too_large" // 413
  | "uri_too_long" // 414
  | "unsupported_media_type" // 415
  | "range_not_satisfiable" // 416
  | "expectation_failed" // 417
  | "im_a_teapot" // 418
  | "insufficient_space_on_resource" // 419
  | "method_failure" // 420
  | "misdirected_request" // 421
  | "unprocessable_entity" // 422
  | "locked" // 423
  | "failed_dependency" // 424
  | "too_early" // 425
  | "upgrade_required" // 426
  | "precondition_required" // 428
  | "too_many_requests" // 429
  | "request_header_fields_too_large" // 431
  | "unavailable_for_legal_reasons" // 451
  | "internal_server_error" // 500
  | "not_implemented" // 501
  | "bad_gateway" // 502
  | "service_unavailable" // 503
  | "gateway_timeout" // 504
  | "http_version_not_supported" // 505
  | "variant_also_negotiates" // 506
  | "insufficient_storage" // 507
  | "loop_detected" // 508
  | "not_extended" // 510
  | "network_authentication_required"; // 511

interface IHttpStatus {
  readonly code: HttpStatusCode;
  readonly name: HttpStatusName;
  readonly text: string;
}

const CONTINUE: IHttpStatus = {
  code: 100,
  name: "continue",
  text: "Continue",
};
const SWITCHING_PROTOCOLS: IHttpStatus = {
  code: 101,
  name: "switching_protocols",
  text: "Switching Protocols",
};
const PROCESSING: IHttpStatus = {
  code: 102,
  name: "processing",
  text: "Processing",
};
const EARLY_HINTS: IHttpStatus = {
  code: 103,
  name: "early_hints",
  text: "Early Hints",
}; // iana
const OK: IHttpStatus = { code: 200, name: "ok", text: "OK" };
const CREATED: IHttpStatus = {
  code: 201,
  name: "created",
  text: "Created",
};
const ACCEPTED: IHttpStatus = {
  code: 202,
  name: "accepted",
  text: "Accepted",
};
const NON_AUTHORITATIVE_INFORMATION: IHttpStatus = {
  code: 203,
  name: "non_authoritative_information",
  text: "Non-Authoritative Information",
};
const NO_CONTENT: IHttpStatus = {
  code: 204,
  name: "no_content",
  text: "No Content",
};
const RESET_CONTENT: IHttpStatus = {
  code: 205,
  name: "reset_content",
  text: "Reset Content",
};
const PARTIAL_CONTENT: IHttpStatus = {
  code: 206,
  name: "partial_content",
  text: "Partial Content",
};
const MULTI_STATUS: IHttpStatus = {
  code: 207,
  name: "multi_status",
  text: "Multi-Status",
};
const ALREADY_REPORTED: IHttpStatus = {
  code: 208,
  name: "already_reported",
  text: "Already Reported",
}; // iana
const IM_USED: IHttpStatus = {
  code: 226,
  name: "im_used",
  text: "IM Used",
}; // iana
const MULTIPLE_CHOICES: IHttpStatus = {
  code: 300,
  name: "multiple_choices",
  text: "Multiple Choices",
};
const MOVED_PERMANENTLY: IHttpStatus = {
  code: 301,
  name: "moved_permanently",
  text: "Moved Permanently",
};
const FOUND: IHttpStatus = { code: 302, name: "found", text: "Found" };
const SEE_OTHER: IHttpStatus = {
  code: 303,
  name: "see_other",
  text: "See Other",
};
const NOT_MODIFIED: IHttpStatus = {
  code: 304,
  name: "not_modified",
  text: "Not Modified",
};
const USE_PROXY: IHttpStatus = {
  code: 305,
  name: "use_proxy",
  text: "Use Proxy",
};
const SWITCH_PROXY: IHttpStatus = {
  code: 306,
  name: "switch_proxy",
  text: "Switch Proxy",
}; // no longer used
const TEMPORARY_REDIRECT: IHttpStatus = {
  code: 307,
  name: "temporary_redirect",
  text: "Temporary Redirect",
};
const PERMANENT_REDIRECT: IHttpStatus = {
  code: 308,
  name: "permanent_redirect",
  text: "Permanent Redirect",
}; // RFC 7538
const BAD_REQUEST: IHttpStatus = {
  code: 400,
  name: "bad_request",
  text: "Bad Request",
};
const UNAUTHORIZED: IHttpStatus = {
  code: 401,
  name: "unauthorized",
  text: "Unauthorized",
};
const PAYMENT_REQUIRED: IHttpStatus = {
  code: 402,
  name: "payment_required",
  text: "Payment Required",
};
const FORBIDDEN: IHttpStatus = {
  code: 403,
  name: "forbidden",
  text: "Forbidden",
};
const NOT_FOUND: IHttpStatus = {
  code: 404,
  name: "not_found",
  text: "Not Found",
};
const METHOD_NOT_ALLOWED: IHttpStatus = {
  code: 405,
  name: "method_not_allowed",
  text: "Method Not Allowed",
};
const NOT_ACCEPTABLE: IHttpStatus = {
  code: 406,
  name: "not_acceptable",
  text: "Not Acceptable",
};
const PROXY_AUTHENTICATION_REQUIRED: IHttpStatus = {
  code: 407,
  name: "proxy_authentication_required",
  text: "Proxy Authentication Required",
};
const REQUEST_TIMEOUT: IHttpStatus = {
  code: 408,
  name: "request_timeout",
  text: "Request Timeout",
};
const CONFLICT: IHttpStatus = {
  code: 409,
  name: "conflict",
  text: "Conflict",
};
const GONE: IHttpStatus = { code: 410, name: "gone", text: "Gone" };
const LENGTH_REQUIRED: IHttpStatus = {
  code: 411,
  name: "length_required",
  text: "Length Required",
};
const PRECONDITION_FAILED: IHttpStatus = {
  code: 412,
  name: "precondition_failed",
  text: "Precondition Failed",
};
const PAYLOAD_TOO_LARGE: IHttpStatus = {
  code: 413,
  name: "payload_too_large",
  text: "Payload Too Large",
}; // RFC 7231
const URI_TOO_LONG: IHttpStatus = {
  code: 414,
  name: "uri_too_long",
  text: "URI Too Long",
}; // RFC 7231
const UNSUPPORTED_MEDIA_TYPE: IHttpStatus = {
  code: 415,
  name: "unsupported_media_type",
  text: "Unsupported Media Type",
};
const RANGE_NOT_SATISFIABLE: IHttpStatus = {
  code: 416,
  name: "range_not_satisfiable",
  text: "Range Not Satisfiable",
};
const EXPECTATION_FAILED: IHttpStatus = {
  code: 417,
  name: "expectation_failed",
  text: "Expectation Failed",
};
const IM_A_TEAPOT: IHttpStatus = {
  code: 418,
  name: "im_a_teapot",
  text: "I'm a teapot",
};
const INSUFFICIENT_SPACE_ON_RESOURCE: IHttpStatus = {
  code: 419,
  name: "insufficient_space_on_resource",
  text: "Insufficient Space on Resource",
};
const METHOD_FAILURE: IHttpStatus = {
  code: 420,
  name: "method_failure",
  text: "Method Failure",
};
const MISDIRECTED_REQUEST: IHttpStatus = {
  code: 421,
  name: "misdirected_request",
  text: "Misdirected Request",
};
const UNPROCESSABLE_ENTITY: IHttpStatus = {
  code: 422,
  name: "unprocessable_entity",
  text: "Unprocessable Entity",
};
const LOCKED: IHttpStatus = {
  code: 423,
  name: "locked",
  text: "Locked",
};
const FAILED_DEPENDENCY: IHttpStatus = {
  code: 424,
  name: "failed_dependency",
  text: "Failed Dependency",
};
const TOO_EARLY: IHttpStatus = {
  code: 425,
  name: "too_early",
  text: "Too Early",
};
const UPGRADE_REQUIRED: IHttpStatus = {
  code: 426,
  name: "upgrade_required",
  text: "Upgrade Required",
};
const PRECONDITION_REQUIRED: IHttpStatus = {
  code: 428,
  name: "precondition_required",
  text: "Precondition Required",
};
const TOO_MANY_REQUESTS: IHttpStatus = {
  code: 429,
  name: "too_many_requests",
  text: "Too Many Requests",
};
const REQUEST_HEADER_FIELDS_TOO_LARGE: IHttpStatus = {
  code: 431,
  name: "request_header_fields_too_large",
  text: "Request Header Fields Too Large",
};
const UNAVAILABLE_FOR_LEGAL_REASONS: IHttpStatus = {
  code: 451,
  name: "unavailable_for_legal_reasons",
  text: "Unavailable For Legal Reasons",
};
const INTERNAL_SERVER_ERROR: IHttpStatus = {
  code: 500,
  name: "internal_server_error",
  text: "Internal Server Error",
};
const NOT_IMPLEMENTED: IHttpStatus = {
  code: 501,
  name: "not_implemented",
  text: "Not Implemented",
};
const BAD_GATEWAY: IHttpStatus = {
  code: 502,
  name: "bad_gateway",
  text: "Bad Gateway",
};
const SERVICE_UNAVAILABLE: IHttpStatus = {
  code: 503,
  name: "service_unavailable",
  text: "Service Unavailable",
};
const GATEWAY_TIMEOUT: IHttpStatus = {
  code: 504,
  name: "gateway_timeout",
  text: "Gateway Timeout",
};
const HTTP_VERSION_NOT_SUPPORTED: IHttpStatus = {
  code: 505,
  name: "http_version_not_supported",
  text: "HTTP Version Not Supported",
};
const VARIANT_ALSO_NEGOTIATES: IHttpStatus = {
  code: 506,
  name: "variant_also_negotiates",
  text: "Variant Also Negotiates",
};
const INSUFFICIENT_STORAGE: IHttpStatus = {
  code: 507,
  name: "insufficient_storage",
  text: "Insufficient Storage",
};
const LOOP_DETECTED: IHttpStatus = {
  code: 508,
  name: "loop_detected",
  text: "Loop Detected",
};
const NOT_EXTENDED: IHttpStatus = {
  code: 510,
  name: "not_extended",
  text: "Not Extended",
};
const NETWORK_AUTHENTICATION_REQUIRED: IHttpStatus = {
  code: 511,
  name: "network_authentication_required",
  text: "Network Authentication Required",
};

// const httpStatuses: IHttpStatus[] = [
//   CONTINUE,
//   SWITCHING_PROTOCOLS,
//   PROCESSING,
//   EARLY_HINTS,
//   OK,
//   CREATED,
//   ACCEPTED,
//   NON_AUTHORITATIVE_INFORMATION,
//   NO_CONTENT,
//   RESET_CONTENT,
//   PARTIAL_CONTENT,
//   MULTI_STATUS,
//   ALREADY_REPORTED,
//   IM_USED,
//   MULTIPLE_CHOICES,
//   MOVED_PERMANENTLY,
//   FOUND,
//   SEE_OTHER,
//   NOT_MODIFIED,
//   USE_PROXY,
//   SWITCH_PROXY,
//   TEMPORARY_REDIRECT,
//   PERMANENT_REDIRECT,
//   BAD_REQUEST,
//   UNAUTHORIZED,
//   PAYMENT_REQUIRED,
//   FORBIDDEN,
//   NOT_FOUND,
//   METHOD_NOT_ALLOWED,
//   NOT_ACCEPTABLE,
//   PROXY_AUTHENTICATION_REQUIRED,
//   REQUEST_TIMEOUT,
//   CONFLICT,
//   GONE,
//   LENGTH_REQUIRED,
//   PRECONDITION_FAILED,
//   PAYLOAD_TOO_LARGE,
//   URI_TOO_LONG,
//   UNSUPPORTED_MEDIA_TYPE,
//   RANGE_NOT_SATISFIABLE,
//   EXPECTATION_FAILED,
//   IM_A_TEAPOT,
//   INSUFFICIENT_SPACE_ON_RESOURCE,
//   METHOD_FAILURE,
//   MISDIRECTED_REQUEST,
//   UNPROCESSABLE_ENTITY,
//   LOCKED,
//   FAILED_DEPENDENCY,
//   TOO_EARLY,
//   UPGRADE_REQUIRED,
//   PRECONDITION_REQUIRED,
//   TOO_MANY_REQUESTS,
//   REQUEST_HEADER_FIELDS_TOO_LARGE,
//   UNAVAILABLE_FOR_LEGAL_REASONS,
//   INTERNAL_SERVER_ERROR,
//   NOT_IMPLEMENTED,
//   BAD_GATEWAY,
//   SERVICE_UNAVAILABLE,
//   GATEWAY_TIMEOUT,
//   HTTP_VERSION_NOT_SUPPORTED,
//   VARIANT_ALSO_NEGOTIATES,
//   INSUFFICIENT_STORAGE,
//   LOOP_DETECTED,
//   NOT_EXTENDED,
//   NETWORK_AUTHENTICATION_REQUIRED,
// ];

// const HttpStatus: {
//   readonly [K in HttpStatusName | HttpStatusCode]: IHttpStatus;
// } = {} as any;

// const map: { [key: string]: IHttpStatus } = {};

// for (let i = 0, len = httpStatuses.length; i < len; i += 1) {
//   const status = httpStatuses[i];
//   (HttpStatus as any)[status.code] = status;
//   (HttpStatus as any)[status.name] = status;
//   map[status.code] = status;
//   map[status.name] = status;
//   map[status.name.replace(/_/g, "")] = status;
// }

// const nonAlpha = /[^A-Za-z]+/g;

// const getHttpStatus = (
//   codeOrName: string | HttpStatusCode
// ): IHttpStatus | undefined => {
//   if (map.hasOwnProperty(codeOrName)) {
//     return map[codeOrName];
//   }
//   if (typeof codeOrName === "string") {
//     const name = codeOrName.replace(nonAlpha, "").toLowerCase();
//     if (map.hasOwnProperty(name)) {
//       return map[name];
//     }
//   }
//   return undefined;
// };

export {
  ACCEPTED,
  ALREADY_REPORTED,
  BAD_GATEWAY,
  BAD_REQUEST,
  CONFLICT,
  CONTINUE,
  CREATED,
  EARLY_HINTS,
  EXPECTATION_FAILED,
  FAILED_DEPENDENCY,
  FORBIDDEN,
  FOUND,
  GATEWAY_TIMEOUT,
  GONE,
  HTTP_VERSION_NOT_SUPPORTED,
  IM_A_TEAPOT,
  IM_USED,
  INSUFFICIENT_SPACE_ON_RESOURCE,
  INSUFFICIENT_STORAGE,
  INTERNAL_SERVER_ERROR,
  LENGTH_REQUIRED,
  LOCKED,
  LOOP_DETECTED,
  METHOD_FAILURE,
  METHOD_NOT_ALLOWED,
  MISDIRECTED_REQUEST,
  MOVED_PERMANENTLY,
  MULTIPLE_CHOICES,
  MULTI_STATUS,
  NETWORK_AUTHENTICATION_REQUIRED,
  NON_AUTHORITATIVE_INFORMATION,
  NOT_ACCEPTABLE,
  NOT_EXTENDED,
  NOT_FOUND,
  NOT_IMPLEMENTED,
  NOT_MODIFIED,
  NO_CONTENT,
  OK,
  PARTIAL_CONTENT,
  PAYLOAD_TOO_LARGE,
  PAYMENT_REQUIRED,
  PERMANENT_REDIRECT,
  PRECONDITION_FAILED,
  PRECONDITION_REQUIRED,
  PROCESSING,
  PROXY_AUTHENTICATION_REQUIRED,
  RANGE_NOT_SATISFIABLE,
  REQUEST_HEADER_FIELDS_TOO_LARGE,
  REQUEST_TIMEOUT,
  RESET_CONTENT,
  SEE_OTHER,
  SERVICE_UNAVAILABLE,
  SWITCHING_PROTOCOLS,
  SWITCH_PROXY,
  TEMPORARY_REDIRECT,
  TOO_EARLY,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
  UNAVAILABLE_FOR_LEGAL_REASONS,
  UNPROCESSABLE_ENTITY,
  UNSUPPORTED_MEDIA_TYPE,
  UPGRADE_REQUIRED,
  URI_TOO_LONG,
  USE_PROXY,
  VARIANT_ALSO_NEGOTIATES,
};
