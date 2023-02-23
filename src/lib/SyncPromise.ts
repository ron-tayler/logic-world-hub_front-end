// @ts-ignore
import EventEmitter from "EventEmitter"

export enum EnumSyncPromiseStatus {
  WAIT,
  RESOLVED,
  REJECTED,
}

export class SyncPromise {
  public readonly promise: Promise<void>;
  private event;
  private status: EnumSyncPromiseStatus = EnumSyncPromiseStatus.WAIT;

  constructor(timeout: number = 0) {
    this.event = new EventEmitter();
    if (timeout > 0) setTimeout(() => this.reject(), timeout);
    this.promise = new Promise<void>((resolve, reject) => {
      if (this.status == EnumSyncPromiseStatus.RESOLVED) return void resolve();
      if (this.status == EnumSyncPromiseStatus.REJECTED) return void reject();
      this.event.on("resolve", resolve);
      this.event.on("reject", reject);
    });
  }

  resolve() {
    if (this.status != EnumSyncPromiseStatus.WAIT) return;
    this.status = EnumSyncPromiseStatus.RESOLVED;
    this.event.emit("resolve");
  }
  reject(err?: unknown) {
    if (this.status != EnumSyncPromiseStatus.WAIT) return;
    this.status = EnumSyncPromiseStatus.REJECTED;
    this.event.emit("reject", err);
  }

  static sync(...promises: SyncPromise[]) {
    return Promise.all(promises.map((promise) => promise.promise));
  }
}
