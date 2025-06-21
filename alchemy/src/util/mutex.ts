/**
 * Simple async mutex that ensures only one async operation executes at a time
 */
export class AsyncMutex {
  private locked = false;
  private queue: Array<() => void> = [];

  async lock<T>(operation: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const execute = async () => {
        this.locked = true;
        try {
          const result = await operation();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.locked = false;
          const next = this.queue.shift();
          if (next) {
            next();
          }
        }
      };

      if (this.locked) {
        this.queue.push(execute);
      } else {
        execute();
      }
    });
  }
}
