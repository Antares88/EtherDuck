DSide.Connect=METHOD({run:(t,e)=>{let n,o,a=t.port,i=t.ips;CHECK_IS_DATA(e)!==!0?n=e:(n=e.success,o=e.error);let f;EACH(i,t=>{CONNECT_TO_WEB_SOCKET_SERVER({host:t,port:a},{error:()=>{},success:(t,e,o,i)=>{o("getIpInfos",t=>{ipInfos=t.ipInfos,EACH(ipInfos,(t,e)=>{CONNECT_TO_WEB_SOCKET_SERVER({host:e,port:a},{error:()=>{},success:(t,e,o,a)=>{void 0===f?o("getNowUTC",i=>{void 0===f?(f=DSide.Node({on:t,off:e,send:o,disconnect:a,timeDiff:Date.now()-i}),n(f)):a()}):a()}})}),i()})}})})}}),DSide.Node=CLASS({init:(t,e,n)=>{let o=(n.on,n.off,n.send),a=(n.disconnect,n.timeDiff);e.getNodeTime=(t=>{return new Date(t.getTime()-a)}),e.getDataSet=((t,e)=>{o({methodName:"getDataSet",data:t},e)}),e.saveData=((t,e)=>{o({methodName:"saveData",data:t},e)}),e.getData=((t,e)=>{o({methodName:"getData",data:t},e)}),e.updateData=((t,e)=>{o({methodName:"updateData",data:t},e)}),e.removeData=((t,e)=>{o({methodName:"removeData",data:t},e)}),e.getTokenBalance=((t,e)=>{o({methodName:"getTokenBalance",data:t},e)}),e.transferToken=((t,e)=>{o({methodName:"transferToken",data:t},e)})}});