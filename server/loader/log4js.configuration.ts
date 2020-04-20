/**
 * generic setting
 */

import * as log4js from "log4js";

import EnvConf from "./env.configuration"
const envConfiguration = new EnvConf(process.env.RUN_ENV || "product");
const RUN_ENV: string = envConfiguration.RUN_ENV;

const gcs = {
    pattern: ".yyyy-MM-dd.log",
    maxLogSize: 209715200,
    alwaysIncludePattern: true,
    daysToKeep: 14,
    backups: 20,
    encoding: 'utf-8',
    type: 'dateFile'
}

let filepath = 'log'

if( RUN_ENV === "product" || RUN_ENV === "stage" || RUN_ENV === "ebf" ){
    // filepath = "/var/log/";
    // 服务器的log 和 本地log 路径不同 
    filepath = "log";
}

const logTypes :string[] = ["generic", "timewatch", "application", 'useragent', 'cache', 'datatransform', 'eureka'];

const appenders = () => {
    let rn:any = {};
    logTypes.map((name:string) => {
        rn[name] = { filename: `${filepath}/${name}.log`, ...gcs }
    })    
    return rn
}

const categories = () => {
    let rn:any = {};
    logTypes.map((name:string) => {
        rn[name] = { appenders: [name], level: "ALL" }
    })
    /**
     * default logs output
     */
    rn["default"] = { appenders: ['generic'], level: "ALL" }
    return rn
}

const logger_generic = log4js.getLogger('generic')
const logger_application = log4js.getLogger('application')
const logger_useragent = log4js.getLogger('useragent')
const logger_cache = log4js.getLogger('cache')
const logger_timewatch = log4js.getLogger('timewatch')
const logger_datatransform = log4js.getLogger('datatransform')
const logger_eureka = log4js.getLogger('logger_eureka')


export {
    appenders,
    categories,
    logger_generic,
    logger_application,
    logger_useragent,
    logger_cache,
    logger_timewatch,
    logger_datatransform,
    logger_eureka
}