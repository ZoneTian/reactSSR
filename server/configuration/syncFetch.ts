
// interface requestData {
//     url:string,
//     content:string,
//     params?:any
// }

export default {}
// export function fetchConfiguration (params:any[],callback:(FetchRel?:any, Fetches?:any, TotalStatus?:any) => void) {
    
//     let
//         Fetches:Array<any> = [],
//         FetchRel:Array<any> = [],
//         TotalStatus = true;
//     if(  params instanceof Array === false ) {
//         callback(false, false , false)
//     }
//     if( params.length == 0 )
//         callback( FetchRel, Fetches, TotalStatus );
//         return;
//     }
//     params &&  params.map((data:requestData, index) => {
//         // 整合资源
//         Fetches[index] = {};

//         Fetches[index]["U"] = data.url;
//         Fetches[index]["P"] = data.params;
//         Fetches[index]["C"] = data.content;

//         if( !Fetches[index]["P"]["headers"] ){
//             Fetches[index]["P"]["headers"] = {};
//         }
//         Fetches[index]["P"]["headers"]["Content-Type"] = "application/json";
//         if(!Fetches[index]["P"]["headers"]['UID']) delete Fetches[index]["P"]["headers"]['UID'];
//         if(!Fetches[index]["P"]["headers"]['Token']) delete Fetches[index]["P"]["headers"]['Token'];

//     });

//     // 内请求的总数
//     let
//         TotalFetchLength = Fetches.length,
//         TotalFetch :Array<any> = [];
    
//     function verifyFetchCatch ( FetchResponse:Array<any>, FetchName:any ) {
//         switch( FetchName ){
//           case "navigationBrandGroup":
//               if( FetchResponse[FetchName].results ){
//                 FetchResponse[FetchName].results.map( (a:any)=> {
//                   if( a.brandList ){
//                     a.brandList.map( (b:any) => {
//                       if(b.imagePath &&  b.imagePath.match(/\.server/) ) delete b.imagePath
//                     })
//                   }
//                 })
//               }
//             break;
//           default:
//               break;
//         }
//     }

//     // 请求成功后的叠加数
//     //最终放到props中reducer的方法
//     function verifyFetch( FetchName:any ){

//       verifyFetchCatch( FetchRel, FetchName );

//         TotalFetch.push( FetchName );
//         // 判断数据是全部获取
//         if( TotalFetchLength === TotalFetch.length ){

//             //console.log(JSON.stringify(FetchRel))
//             //console.log("====================Error RestfulApi====================")

//             let Errors:any = {};
//             for( let i in TotalFetch){
//                 // timeout
//                 if(FetchRel[TotalFetch[i]].results === null){
//                     TotalStatus = false;
//                     Errors[TotalFetch[i]] = FetchRel[TotalFetch[i]].message;
//                     //console.log(TotalFetch[i] + " " + FetchRel[TotalFetch[i]].message )
//                 }
//             }

//             callback( FetchRel, Fetches, TotalStatus );
//             //logs 最后处理

//             /*let logs = {
//                 "hostName": os.hostname(),
//                 "requestTime" : moment().format(),
//                 "requestErrors": JSON.stringify( Errors )
//             }*/

//             // console.log("====================Error Logs====================")
//             // console.log(logs)
//             // console.log("====================Error Logs====================")
//         }
//     }

//     Promise.all(Fetches.map(F =>
//         fetch(F.U, F.P)
//             .then(response => {
//                 if (response.status >= 200 && response.status < 300) {
//                     return Promise.resolve(response);
//                 }else{
//                     return Promise.reject(new Error(response.statusText));
//                 }
//             })
//             .then(json => json.json())
//             .then(function(data){
//                 /*else if( data.errorCode ){ FetchRel[F.C] =  fetchConfigurationCatch(F.C, "errorCode "+ JSON.stringify( data ) )}*/
//                 if( data.status > 0 ){
//                     FetchRel[F.C] =  fetchConfigurationCatch(F.C, "errorCode "+ data.status );
//                 }else if( data && data.results && data.results.code ){
//                     FetchRel[F.C] =  fetchConfigurationCatch(F.C, JSON.stringify( data ) );
//                 }else{
//                     FetchRel[F.C] = data;
//                 }
//                 verifyFetch(F.C);
//             })
//             .catch(error => {
//                 //console.log(error)
//                 if( error ==  "SyntaxError: Unexpected token <"){
//                     // FORMAT ! JSON
//                     FetchRel[F.C] =  fetchConfigurationCatch( F.C, error );
//                 }else if( error.type ){
//                     switch( error.type ){
//                         // FETCH TIMEOUT
//                         case "request-timeout":FetchRel[F.C] =  fetchConfigurationCatch(F.C, error.type);break;
//                         // FETCH SYSTEM
//                         case "system":FetchRel[F.C] =  fetchConfigurationCatch(F.C, error.type);break;
//                     }
//                 }else{
//                     // SYSTEM ERROR
//                     FetchRel[F.C] =  fetchConfigurationCatch(F.C, error );
//                 }

//                 verifyFetch(F.C);
//             })
//     ));

// }