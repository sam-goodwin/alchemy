interface QueueTask<T> {
  task: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: any) => void;
}

export class AsyncQueue {
  private queue: QueueTask<any>[] = [];
  private running = 0;

  constructor(readonly concurrency = 1) {
    if (concurrency < 1) {
      throw new Error("Concurrency must be at least 1");
    }
  }

  /**
   * Add a task to the queue
   */
  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.process();
    });
  }

  /**
   * Process the next task in the queue if we have capacity
   */
  private async process(): Promise<void> {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { task, resolve, reject } = this.queue.shift()!;

    try {
      const result = await task();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // Process next task
    }
  }

  /**
   * Get the current queue size
   */
  get size(): number {
    return this.queue.length;
  }

  /**
   * Get the number of currently running tasks
   */
  get pending(): number {
    return this.running;
  }

  /**
   * Check if the queue is idle (no running or queued tasks)
   */
  get idle(): boolean {
    return this.running === 0 && this.queue.length === 0;
  }

  /**
   * Wait for all current tasks to complete
   */
  async onIdle(): Promise<void> {
    if (this.idle) return;

    return new Promise((resolve) => {
      const check = () => {
        if (this.idle) {
          resolve();
        } else {
          setTimeout(check, 10);
        }
      };
      check();
    });
  }

  /**
   * Clear all queued tasks (doesn't affect running tasks)
   */
  clear(): void {
    this.queue.forEach(({ reject }) => {
      reject(new Error("Task was cleared from queue"));
    });
    this.queue = [];
  }
}
