const debounce = (fn: Function, interval: number) => {
  let timeout: NodeJS.Timer;

  return function(...args: any[]) {
    const functionCall = () => fn.apply(this, args);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, interval);
  }
}

export default debounce;
