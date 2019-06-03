import { origin } from './internals';
import { Observable } from './observable';

function toJs<T>(obj: Observable<T>) {
  return origin.get(obj);
}

export default toJs;
