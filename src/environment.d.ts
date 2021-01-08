declare let process: {
  env: {
    NODE_ENV: 'development' | 'test' | 'production';
    JEST_WORKER_ID: string | undefined;
    CUSTOM_ENV: 'dev' | 'prod';
    CUSTOM_GLOBAL_ENV: {
      mock: boolean;
      throttle: number;
      absoluteAndUtterChaos: boolean;
    };
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
type FC<P = {}> = React.FC<P>;

type MouseEventReact<T = HTMLElement> = MouseEvent<T, globalThis.MouseEvent>;
