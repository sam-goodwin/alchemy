export interface BaseCDPMessage {
  id: number;
  method: string;
  params?: any;
}

export interface RuntimeEnable extends BaseCDPMessage {
  method: "Runtime.enable";
  params: never;
}

export interface ConsoleEnable extends BaseCDPMessage {
  method: "Console.enable";
  params: never;
}

export type CDPMessage = RuntimeEnable | ConsoleEnable;
