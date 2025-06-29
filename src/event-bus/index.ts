type EventBusCallback = (args?: any) => void;

const globalListeners: { [key: string]: EventBusCallback[] } = {};

export const EVENT_BUS_EVENTS = {
  UPDATE_BUDGETS: 'updateBudgets',
  UPDATE_EXPENSES: 'updateExpenses',
  UPDATE_ANALYTICS: 'updateAnalytics',
};

export function registerEventBusListener(
  event: string,
  callback: EventBusCallback,
) {
  if (!globalListeners[event]) {
    globalListeners[event] = [];
  }
  globalListeners[event] = [callback];
}

export function unregisterEventBusListener(
  event: string,
  callback: EventBusCallback,
) {
  if (!globalListeners[event]) {
    return;
  }
  globalListeners[event] = globalListeners[event].filter(
    (listener) => listener !== callback,
  );
}

export function emitEventBus(event: string, args: any = {}) {
  if (!globalListeners[event]) {
    return;
  }
  globalListeners[event].forEach((listener) => listener(args));
}
