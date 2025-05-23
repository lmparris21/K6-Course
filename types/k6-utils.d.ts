declare module 'https://jslib.k6.io/k6-utils/1.2.0/index.js' {
  export function randomIntBetween(min: number, max: number): number;
  export function randomString(length: number): string;
  export function randomItem<T>(array: T[]): T;
} 