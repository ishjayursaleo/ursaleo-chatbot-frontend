import {ENV_LOCAL} from "./environment.local"
import {ENV_DEV} from "./environment.dev"
import {ENV_PROD} from "./environment.prod";
import {ENV_QA} from "./environment.qa";

export interface ENV_VARIABLES {
    APP_ENV: string,
    API_BASE: string,
    REDIRECT_URL: string,
    TRACKING_ID: string,
    SOCKET_URL: string,
}

// DEFAULT DEV ENV VARIABLES
let ENV = ENV_DEV

// LOCAL ENV VARIABLES
if(process.env.REACT_APP_ENV === 'local') {
    ENV = ENV_LOCAL
}

// DEV ENV VARIABLES
if(process.env.REACT_APP_ENV === 'dev') {
    ENV = ENV_DEV
}
// QA ENV VARIABLES
if(process.env.REACT_APP_ENV === 'qa') {
    ENV = ENV_QA
}

// QA ENV VARIABLES
if(process.env.REACT_APP_ENV === 'prod') {
    ENV = ENV_PROD
}

export default ENV