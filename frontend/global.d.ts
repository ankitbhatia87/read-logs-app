import '@testing-library/jest-dom';

declare module 'vitest' {
  interface JestMatchers<R> {
    toBeInTheDocument(): R;
  }
}