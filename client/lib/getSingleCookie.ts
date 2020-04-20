interface Params{
    cookies:string,
    value:string
}

export default function(params:Params){
    const {cookies,value} = params
    const arr = cookies.match(new RegExp('(^| )' + value + '=([^;]*)(;|$)'))
    if (arr != null) {return unescape(arr[2])}
    return null
}