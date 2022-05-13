let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async, data) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State changed called . Ready State :" + xhr.readyState + " Status :" + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    })
                    console.log("XHR Failed")
                }
            }
        }
        xhr.open(methodType, url, async);
        console.log(methodType + " request sent to the server")
        if (data) {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

const getUrl = "http://localhost:3000/employees/1";
makePromiseCall("GET", getUrl, true)
    .then(response => console.log("Get User Data " + response))
    .catch(error => console.log("Get Error Status : " + JSON.stringify(error)));

const deleteUrl = "http://localhost:3000/employees/12";
makePromiseCall("DELETE", deleteUrl, false)
    .then(response => console.log("User Deleted " + response))
    .catch(error => console.log("Delete Error Status : " + JSON.stringify(error)));

const postUrl = "http://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postUrl, true, empData)
    .then(response => console.log("User Added " + response))
    .catch(error => console.log("Post Error Status : " + JSON.stringify(error)));