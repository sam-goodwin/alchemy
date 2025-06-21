export class DeferredPromise<T> {
  private promise = Promise.withResolvers<T>();

  status: "pending" | "fulfilled" | "rejected" = "pending";

  get value() {
    return this.promise.promise;
  }

  resolve(value: T) {
    this.status = "fulfilled";
    this.promise.resolve(value);
  }

  reject(reason?: any) {
    this.status = "rejected";
    this.promise.reject(reason);
  }
}
