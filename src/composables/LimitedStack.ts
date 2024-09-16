// import type { Slide, Presentation } from "@/types/Presentation";

// export function useEditorHistory() {
   
//     const buffer = ref<>()

// }
export default class LimitedStack<T> {
    private maxSize: number;
    private stack: T[];
    private history: T[][];
  
    constructor(maxSize: number = 10) {
      this.maxSize = maxSize;
      this.stack = [];
      this.history = [];
    }
  
    push(item: T): void {
      if (this.stack.length === this.maxSize) {
        this.history.push([...this.stack]);
        this.stack.shift();
      }
      this.stack.push(item);
    }
  
    pop(): T | undefined {
      return this.stack.pop();
    }
  
    getHistory(): T[][] {
      return this.history;
    }
  
    revertToPreviousState(): void {
      if (this.history.length > 0) {
        this.stack = this.history.pop() || [];
      }
    }
  }