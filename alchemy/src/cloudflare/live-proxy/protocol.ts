export const CONNECT_PATH = "/__alchemy__/connect";
export const RPC_PATH = "/__alchemy__/rpc";

export function isConnectRequest(request: Request) {
  return new URL(request.url).pathname === CONNECT_PATH;
}

export function isRpcRequest(request: Request) {
  return new URL(request.url).pathname === RPC_PATH;
}

export type HttpMessage = HttpRequestMessage | HttpResponseMessage;

export type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";

// encode HTTP headers as a list of key-value pairs (to account for duplicate headers)
export type HttpHeaders = HttpHeader[];

/** A key-value pair representing an HTTP header */
export type HttpHeader = [string, string];

export function serializeHeaders(headers: Headers): HttpHeaders {
  const pairs: HttpHeaders = [];
  headers.forEach((value, name) => {
    // forEach iterates in insertion order and repeats duplicate names
    pairs.push([name, value]);
  });
  return pairs;
}

export function deserializeHeaders(json: string): Headers {
  return new Headers(JSON.parse(json) as HttpHeaders);
}

export type HttpRequestMessage = {
  type: "http-request";
  /** an ID uniquely identifying this individual HTTP request */
  id: number;
  /** the HTTP request method */
  method: HttpMethod;
  /** the HTTP request URL */
  url: string;
  /** the HTTP request body as a base64 encoded string */
  body?: string;
  /** the HTTP request headers */
  headers: HttpHeaders;
};

export type HttpResponseMessage = {
  type: "http-response";
  /** an ID uniquely identifying this individual HTTP request */
  id: number;
  /** the HTTP response status code */
  status: number;
  /** the HTTP response status text */
  statusText: string;
  /** the HTTP response body */
  body: string;
  /** the HTTP response headers */
  headers: HttpHeaders;
};

export type RpcMessage = CallbackMessage | ResultMessage | ErrorMessage;

/** A message sent from the coordinator actor to the local worker to initiate a function call. */
export type CallMessage = {
  type: "call";
  /** the name of the function to call on the local worker */
  name: string;
  /** the arguments to the function call */
  args: any[];
};

/** A message sent from the local worker to the coordinator actor to call a function on the server. */
export type CallbackMessage = {
  type: "callback";
  /** an ID reference to the function */
  func: number;
  /** an ID uniquely identifying this individual function call */
  id: number;
  /** the arguments to the function call */
  params?: any[];
};

export type ResultMessage = {
  type: "result";
  /** an ID uniquely identifying this individual function call */
  id: number;
  /** the output value of the function call */
  value: any;
};

export type ErrorMessage = {
  type: "error";
  /** an ID uniquely identifying this individual function call */
  id: number;
  /** the error message */
  message: string;
};
