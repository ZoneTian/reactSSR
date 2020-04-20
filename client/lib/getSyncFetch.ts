// import 'axios'
import axios from 'axios';
require('es6-promise').polyfill();
import { IFetchList } from '../routes/routesConfigure';
import getSingleCookie  from '../lib/getSingleCookie'
// console.l

export interface IParameter {
    FetchList: Array<IFetchList>;
    cookie?: string|undefined;
    Env?: string;
}
export default function getSyncFetch(parameter: IParameter) {
    return new Promise((resolve) => {
        const Fetches = <any>[];

        const FetchRel = <any>[];

        let TotalStatus = true;
        const { cookie, FetchList, Env } = parameter;
        const UID = cookie && getSingleCookie({ cookies: cookie, value: 'UID' });
        const Token = cookie &&  getSingleCookie({ cookies: cookie, value: 'Token' });

        if (FetchList.length === 0) {
            resolve({
                Env: Env,
                fetchResponse: FetchRel,
                fetchList: Fetches,
                fetchStatus: TotalStatus,
                fetchError: 'len=0',
            });
        }

        FetchList.map((data: any, index: number) => {
            // 整合资源
            Fetches[index] = {};
            Fetches[index]['U'] = data.url;
            Fetches[index]['P'] = data.params;
            Fetches[index]['C'] = data.content;

            if (!Fetches[index]['P']['headers']) {
                Fetches[index]['P']['headers'] = {
                    UID: UID,
                    Token: Token,
                };
            }
            if (!Fetches[index]['P']['timeout']) {
                Fetches[index]['P']['timeout'] = 3000
            }
            Fetches[index]['P']['headers']['Content-Type'] = 'application/json';
        });
        const TotalFetchLength = Fetches.length;

        const TotalFetch = <any>[];

        function verifyFetch(FetchName: any) {
            TotalFetch.push(FetchName);
            // 判断数据是全部获取
            if (TotalFetchLength === TotalFetch.length) {
                const Errors = <any>[];
                for (const i in TotalFetch) {
                    // timeout
                    if (FetchRel[TotalFetch[i]].results === null) {
                        TotalStatus = false;
                        Errors[TotalFetch[i]] = FetchRel[TotalFetch[i]].message;
                    }
                }
                resolve({
                    Env: Env,
                    fetchResponse: FetchRel,
                    fetchList: Fetches,
                    fetchStatus: TotalStatus,
                    fetchError: JSON.stringify(Errors),
                });
            }
        }
        axios.all(
            Fetches.map((F: any) =>
                axios({ url: F.U, method: F.P.method })
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                            // return Promise.resolve(response);
                            const data = response.data;
                            if (data.status > 0) {
                                FetchRel[F.C] = fetchConfigurationCatch(F.C, 'errorCode ' + data.status);
                            } else if (data.errorCode) {
                                FetchRel[F.C] = fetchConfigurationCatch(F.C, 'errorCode ' + JSON.stringify(data));
                            } else {
                                FetchRel[F.C] = data;
                            }

                            verifyFetch(F.C);
                        } else {
                            // return Promise.reject(new Error(response.statusText));
                        }
                    })
                    .catch(function (error) {
                        if (error === 'SyntaxError: Unexpected token <') {
                            // FORMAT ! JSON
                            FetchRel[F.C] = fetchConfigurationCatch(F.C, error);
                        } else if (error.type) {
                            switch (error.type) {
                                // FETCH TIMEOUT
                                case 'request-timeout':
                                    FetchRel[F.C] = fetchConfigurationCatch(F.C, error.type);
                                    break;
                                // FETCH SYSTEM
                                case 'system':
                                    FetchRel[F.C] = fetchConfigurationCatch(F.C, error.type);
                                    break;
                            }
                        } else {
                            // SYSTEM ERROR
                            FetchRel[F.C] = fetchConfigurationCatch(F.C, error);
                        }
                        verifyFetch(F.C);
                    }),
            ),
        );
    });
}

export function fetchConfigurationCatch(key: string, error: string) {
    /**
     * @type "错误信息处理"
     * prototype: "初始化",
     * seo: "SEO初始化"
     */
    let rel;
    switch (key) {
        case 'seo':
            rel = {
                status: 0,
                message: key + ' ' + error,
                results: {
                    title: '',
                    description:
                        '',
                    keywords: '',
                },
            };
            break;
        case 'user':
            rel = {
                status: 0,
                message: key + ' ' + error,
                results: { userType: '', email: '', logonId: '', cardType: 'G' },
            };
            break;
        default:
            rel = {
                status: 0,
                message: key + ' ' + error,
                results: null,
            };
            break;
    }
    return rel;
}
