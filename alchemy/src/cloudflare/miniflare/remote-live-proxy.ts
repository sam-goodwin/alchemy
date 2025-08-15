import { link } from "../live-proxy/link.ts";
import { connect } from "./websocket.ts";

export async function connectToLiveProxy(
  url: string,
  secret: string,
): Promise<WebSocket> {
  const ws = await connect(url, { auth: secret });

  const proxy = link(ws, {
    foo() {},
  });

  proxy;

  // const ws = new WebSocket(url);
  // ws.onopen = () => {};
  // ws.onclose = () => {
  //   console.error("Live proxy connection closed");
  // };
  // ws.onerror = (error) => {
  //   console.error("Live proxy connection error", error);
  // };
  // ws.onmessage = (event) => {
  //   const message = JSON.parse(event.data) as
  //     | HttpRequestMessage
  //     | CallMessage
  //     | ResultMessage
  //     | ErrorMessage;

  //   console.log("Live proxy message", event);
  // };
}
