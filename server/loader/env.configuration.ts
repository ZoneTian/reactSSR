import * as dotenv from "dotenv";
import { readFileSync } from 'fs';

class Common {
    envConfig: dotenv.DotenvParseOutput;
    constructor() {
        this.envConfig = dotenv.parse(readFileSync(`env/.env.common`));
    }
}

class EnvConfiguration {
    envConfig: dotenv.DotenvParseOutput;
    RUN_ENV: string;
    common: Common;
    commEnvConfig: dotenv.DotenvParseOutput;
    constructor(RUN_ENV: string) {
        this.common = new Common();
        this.RUN_ENV = RUN_ENV;
        this.envConfig = dotenv.parse(readFileSync(`env/.env.${RUN_ENV}`));
        this.commEnvConfig = Object.assign( this.common.envConfig, this.envConfig );
    }
    getPort = () => {
        return this.commEnvConfig.APPLICATION_PORT
    }
    getIp = () => {
        return process.env.PORT || "127.0.0.1"
    }
    getEurekaApplication = () => {
        return this.commEnvConfig.EUREKA_APPLICATION
    }
    getEurekaServiceUrls = () => {
        let EUREKA_SERVICEURLS:any[] = [];
        if( this.commEnvConfig.EUREKA_SERVICEURLS_0 ){
            EUREKA_SERVICEURLS.push( this.commEnvConfig.EUREKA_SERVICEURLS_0 )
        }
        if( this.commEnvConfig.EUREKA_SERVICEURLS_1 ){
            EUREKA_SERVICEURLS.push( this.commEnvConfig.EUREKA_SERVICEURLS_1 )
        }
        if( this.commEnvConfig.EUREKA_SERVICEURLS_2 ){
            EUREKA_SERVICEURLS.push( this.commEnvConfig.EUREKA_SERVICEURLS_2 )
        }
        return EUREKA_SERVICEURLS
    }
    getApiGateway = () => {
        return this.commEnvConfig.APIGATEWAY;
    }

}

export default EnvConfiguration