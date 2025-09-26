import { Reason } from './error-reason';

export interface Error {
  message: string;
  reason: Reason;
}
