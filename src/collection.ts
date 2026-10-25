export class Collection<T> {
  constructor(private items: T[]) {}

    getAll(): T[] {
      return this.items;
    }

    get(index : number): T | undefined {
      return this.items[index];
    }

    clear(): void {
      this.items = [];
    }

    remove(index: number): void {
      this.items.splice(index,1);
    }

    replace(index: number, item: T): void {
      this.items[index] = item;
    }
  }
