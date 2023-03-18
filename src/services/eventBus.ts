class EventBus {
  private listeners: {
    [key: string]: Array<(...args: any[]) => void>;
  };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: (...args: any[]) => void) => listener !== callback
    );
  }

  emit(event: string | number, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Event(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: (...args: any[]) => void) => {
      listener(...args);
    });
  }
}

export default EventBus;
