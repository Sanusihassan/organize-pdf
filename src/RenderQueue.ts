class RenderQueue {
    private queue: Array<() => Promise<void>> = [];
    private running = 0;
    private maxConcurrent = 3;

    async add<T>(task: () => Promise<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.queue.push(async () => {
                try {
                    resolve(await task());
                } catch (error) {
                    reject(error);
                }
            });
            this.process();
        });
    }

    private process() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }

        const task = this.queue.shift();
        if (!task) return;

        this.running++;

        // Slot release must be structural. If a task ever throws instead of
        // settling, a non-finally decrement burns a slot permanently and the
        // queue silently degrades to 2, then 1, then deadlocks.
        void task().finally(() => {
            this.running--;
            this.process();
        });
    }
}

export const renderQueue = new RenderQueue();