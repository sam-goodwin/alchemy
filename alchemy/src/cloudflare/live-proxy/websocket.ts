/**
 * A light wrapper around the WebSocketPair API to simplify the creation of a
 * WebSocket pair and automatically ser/de messages.
 *
 * @param param0
 */
export function websocket<Message = any>({
  handle,
  close,
  error,
}: {
  handle: (data: Message, message: MessageEvent) => any;
  connect?: (socket: WebSocket) => any;
  close?: (event: CloseEvent) => any;
  error?: (event: Event) => any;
}) {
  const pair = new WebSocketPair();
  const left = pair[0];
  const right = pair[1];
  right.accept();
  right.addEventListener("message", (event) =>
    handle(JSON.parse(event.data), event),
  );
  if (close) {
    right.addEventListener("close", close);
  }
  if (error) {
    right.addEventListener("error", error);
  }
  return new Response(null, {
    status: 101,
    webSocket: left,
  });
}
