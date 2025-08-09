import type {
  CallMessage,
  ErrorMessage,
  HttpRequestMessage,
  ResultMessage,
} from "./protocol";

export function connectToLiveProxy(url: string, secret: string) {
  const ws = new WebSocket(url);
  ws.onopen = () => {};
  ws.onclose = () => {
    console.error("Live proxy connection closed");
  };
  ws.onerror = (error) => {
    console.error("Live proxy connection error", error);
  };
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data) as
      | HttpRequestMessage
      | CallMessage
      | ResultMessage
      | ErrorMessage;

    console.log("Live proxy message", event);
  };
}
