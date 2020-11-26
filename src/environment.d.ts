declare let process: {
  env: {
    NODE_ENV: 'development' | 'test' | 'production';
    JEST_WORKER_ID: string | undefined;
    CUSTOM_ENV: 'dev' | 'prod';
    CUSTOM_GLOBAL_ENV: {
      absoluteAndUtterChaos: boolean;
    };
  };
};

type FC<P = {}> = React.FC<P>;
