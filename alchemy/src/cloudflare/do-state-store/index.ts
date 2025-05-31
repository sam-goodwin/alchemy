/**
 * DOFS State Store for Cloudflare Durable Objects
 * 
 * @example
 * // Basic usage with auto-deployment
 * const stateStore = new DOFSStateStore(scope, {
 *   autoDeploy: true,
 *   workerName: "my-state-store"
 * });
 * 
 * @example  
 * // Secure usage with API key authentication
 * const stateStore = new DOFSStateStore(scope, {
 *   apiKey: (await alchemy.secret.env.DOFS_API_KEY).unencrypted
 * });
 */
export { DOFSStateStore, type DOFSStateStoreOptions } from "./store.js";
