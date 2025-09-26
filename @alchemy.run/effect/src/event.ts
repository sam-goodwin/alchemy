export type ApplyStatus =
  | "pending"
  | "creating"
  | "created"
  | "updating"
  | "updated"
  | "deleting"
  | "deleted"
  | "success"
  | "fail";

export interface ApplyEvent {
  id: string; // resource id (e.g. "messages", "api")
  type: string; // resource type (e.g. "AWS::Lambda::Function", "Cloudflare::Worker")
  status: ApplyStatus;
  message?: string; // optional details
  bindingId?: string; // if this event is for a binding
}
