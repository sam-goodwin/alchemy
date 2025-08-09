import type {
  CallMessage,
  CallbackMessage,
  ErrorMessage,
  ResultMessage,
} from "./protocol.ts";

export async function rpc<Output>(
  socket: WebSocket,
  name: string,
  ...args: any[]
): Promise<Output> {
  const functions: ((...args: any[]) => any)[] = [];

  function send(
    message: CallMessage | CallbackMessage | ResultMessage | ErrorMessage,
  ) {
    socket.send(JSON.stringify(message));
  }

  const { promise, resolve, reject } = Promise.withResolvers<Output>();
  let resolved = false;

  socket.addEventListener("message", async (event) => {
    const message = JSON.parse(event.data) as
      | CallbackMessage
      | ResultMessage
      | ErrorMessage;

    if (message.type === "callback") {
      // the local worker is attempting to execute a callback on an object in this Remote Worker
      const fn = functions[message.func];

      // send an error message back to the local worker
      function reject(err: Error) {
        send({
          type: "error",
          id: message.id, // identifies the function call this error is for
          message: err.message,
        });
      }

      if (!fn) {
        reject(new Error(`Unknown Function: ${message.func}`));
      } else {
        try {
          // send a successful result message back to the local worker
          send({
            type: "result",
            id: message.id, // identifies the function call this result is for
            value: await fn(...(message.params ?? [])),
          });
        } catch (err: any) {
          return reject(err);
        }
      }
    } else if (message.type === "result") {
      // the local worker has finished executing the function and returned a sucessful result
      resolve(message.value);
    } else if (message.type === "error") {
      // the local worker has finished executing the function and returned an error
      reject(new Error(message.message));
    } else {
      // no idea what this message is, for now warn
      console.warn("Unknown message type", message);
    }
  });

  socket.addEventListener("open", () => {
    // bi-directional connection is established between the Worker<->Coordinator<->Local
    // it is now safe to trigger the local worker to execute the function
    send({
      type: "call",
      name,
      args: (function proxy(obj: any): any {
        if (!obj) {
          return obj;
        } else if (typeof obj === "function") {
          const id = functions.length;
          functions.push(obj);
          return {
            "Symbol(alchemy::RPC)": id,
          };
        } else if (Array.isArray(obj)) {
          return obj.map(proxy);
        } else if (typeof obj === "object") {
          return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, proxy(value)]),
          );
        } else {
          return obj;
        }
      })(args),
    });
  });

  socket.addEventListener("close", () => {
    if (!resolved) {
      reject(new Error("Connection closed before the RPC call was resolved"));
    }
  });

  socket.addEventListener("error", () => {
    reject(new Error("Connection error"));
  });

  return promise;
}
