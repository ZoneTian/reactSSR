import * as log4js from "log4js";
import * as log4jsConfig from "./log4js.configuration"

const log4jsInitial = () => {
    return log4js.configure({
        appenders: log4jsConfig.appenders(),
        categories: log4jsConfig.categories(),
        pm2: true,
        pm2InstanceVar: "INSTANCE_ID",
        disableClustering: true
    })
}

export {
    log4jsInitial
};