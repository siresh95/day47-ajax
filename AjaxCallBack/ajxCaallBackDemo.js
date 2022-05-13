/* AJAX demo and method callback */
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAjaxCall(methodType, url, callbackFunc, async, data) {
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, async);
    console.log(methodType + " request sent to the server");

    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
    xhr.onreadystatechange = function() {
        console.log("State changed called . Ready State :" + xhr.readyState + " Status :" + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callbackFunc(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log(methodType + " method Handle 400 Client Error or 500 server Error");
            }
        }
    }
}
/* get method */
function getUserDetails(data) {
    console.log("Get response Data " + data);
}
const getUrl = "http://localhost:3000/employees/8";
makeAjaxCall("GET", getUrl, getUserDetails, true)

/* delete method */
function userDeleted(data) {
    console.log("User deleted " + data)
}
const deleteUrl = "http://localhost:3000/employees/3";
makeAjaxCall("DELETE", deleteUrl, userDeleted, true);

/* post method */
function userAdded(data) {
    console.log("User Added " + data)
}
const postUrl = "http://localhost:3000/employees";
const employees = {
    "_name": "Demo123",
    "_profilePic": "../assets/profile-images/Ellipse -1.png",
    "_gender": "female",
    "_department": [
        "Finance",
        "Engineer"
    ],
    "_salary": "428100",
    "_note": "                ",
    "_startDate": 1621189800000,
}
makeAjaxCall("POST", postUrl, userAdded, true, employees)


// readyState	Holds the status of the XMLHttpRequest.
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: processing request
// 4: request finished and response is ready