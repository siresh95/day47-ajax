function makePromiseCall(methodType, url, async , data) {
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // console.log("State changed called . Ready State :"+xhr.readyState+" Status :"+xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status:xhr.status,
                        statusText:xhr.statusText
                    })
                    console.log("XHR Failed")
                }
            }
        }
        xhr.onerror=function (){
            reject({
                status:this.status,
                statusText:this.statusText
            })
        }
        xhr.open(methodType, url, async);
        console.log(methodType + " request sent to the server")
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else{
            xhr.send();
        }
    });
}