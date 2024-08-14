import remove from 'lodash/remove';

// export type AsyncListener<T, R = any> = (arg: T) => Promise<R>;
// export type SyncListener<T, R = any> = (arg: T) => R;
// export type Listener<T, R = any> = AsyncListener<T, R> | SyncListener<T, R>;

export class EventEmitter {
    listeners = [];

    on = (listener) => this.listeners.push(listener);
    off = (listener) => this.listeners = remove(this.listeners, (l) => l === listener);

    emitsa = (data) => this.listeners.reduce((acc, l) => acc.then(($data) => Promise.resolve(l($data))), Promise.resolve(data));
    emitss = (data) => this.listeners.reduce((acc, l) => l(acc), data);

    emitpa = (data) => Promise.all(this.listeners.map((l) => Promise.resolve(l(data))));
    emitps = (data) => this.listeners.map((l) => l(data));
};
