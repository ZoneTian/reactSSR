function configRouter() {
    return [{ index: 'Index', regex: /^\/$/ }];
}
// class getSync(){

// }
function getRouterIndex(params: any) {
    return new Promise(resolve => {
        const MatchExpr = configRouter();
        for (const i in MatchExpr) {
            if (params.Location.pathname.match(MatchExpr[i]['regex'])) {
                params.index = MatchExpr[i]['index'];
            }
        }

        resolve(params);
    });
}
export default { configRouter, getRouterIndex };
