const ENUM_TYPE = {
    PROD : "PRODUCTION",
    DEV : "DEVELOPMENT"
}

const PRODUCTION = {
    baseURL: ``
}

const DEVELOPMENT = {
    baseURL: `http://127.0.0.1:8080`
}

///define if you want to use the application for development or production
const TYPE = ENUM_TYPE.DEV;

const config = (TYPE === ENUM_TYPE.DEV) ? DEVELOPMENT : PRODUCTION;

export default config;