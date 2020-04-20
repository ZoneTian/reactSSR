declare var window: any;

interface BrowserConfiguration{
  RUN_ENV: string;
  APIGATEWAY: string;
}
declare global {
  interface Window { __INITIAL_STATE__: any; }
}

const browserConfiguration: BrowserConfiguration = window.__INITIAL_ENV__;
export {
    browserConfiguration,

}