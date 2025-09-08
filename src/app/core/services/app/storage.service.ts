import { Injectable } from '@angular/core';

type StoredValue = string | number | boolean | object | null;

interface TypedStorage<T = StoredValue> {
  type: "string" | "number" | "boolean" | "object" | "null";
  value: T;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public saveToLocalStorage<T extends StoredValue>(key: string, value: T): void {
    let entry: TypedStorage;

    if (typeof value === "boolean") {
      entry = { type: "boolean", value: value ? 1 : 0 };
    } else if (typeof value === "number") {
      entry = { type: "number", value };
    } else if (typeof value === "object" && value !== null) {
      entry = { type: "object", value };
    } else if (value === null) {
      entry = { type: "null", value: null };
    } else {
      entry = { type: "string", value };
    }

    localStorage.setItem(this.buildKey(key), JSON.stringify(entry));
  }

  public loadFromLocalStorage<T extends StoredValue>(key: string): T | null {
    const raw = localStorage.getItem(this.buildKey(key));
    if (!raw) return null;

    try {
      const entry = JSON.parse(raw) as TypedStorage;
      switch (entry.type) {
        case "boolean":
          return (entry.value === 1) as T;
        case "number":
          return Number(entry.value) as T;
        case "object":
          return entry.value as T;
        case "string":
          return entry.value as T;
        case "null":
          return null;
        default:
          return null;
      }
    } catch {
      return null;
    }
  }

  public removeFromLocalStorage(key: string): void {
    localStorage.removeItem(this.buildKey(key));
  }

  private buildKey(key: string): string {
    return `finapp_storage|${key}`;
  }
}
