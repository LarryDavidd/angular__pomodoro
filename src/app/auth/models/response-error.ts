import { Error } from './error';
export interface ResponseError {
  headers: {
    normalizedNames: unknown;
    lazyUpdate: unknown;
  };
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}
