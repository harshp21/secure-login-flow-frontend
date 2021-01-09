/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var apiUrl = 'https://secure-login-url-shortner.herokuapp.com';
// fetch all url details to display in table
var fetchAllUrlDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetails, urlDetailsJson, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(apiUrl + "/url-data", {
                        // Adding method type 
                        method: "GET",
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.getItem('jwt-token')
                        }
                    })];
            case 1:
                urlDetails = _a.sent();
                return [4 /*yield*/, urlDetails.json()];
            case 2:
                urlDetailsJson = _a.sent();
                return [2 /*return*/, urlDetailsJson];
            case 3:
                err_1 = _a.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// display url details in table and show loader till the data is been fetch and the hide loader
var displayUrlDetails = function () { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetailsJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                showLoader();
                return [4 /*yield*/, fetchAllUrlDetails()];
            case 1:
                urlDetailsJson = _a.sent();
                hideLoader();
                createDomForUrlDetails(urlDetailsJson);
                return [2 /*return*/];
        }
    });
}); };
// fetch the redirect url and redirect in a new tab
var redirectToOriginalUrl = function (shortUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var urlDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                showLoader();
                return [4 /*yield*/, fetchRedirectUrl(shortUrl)];
            case 1:
                urlDetails = _a.sent();
                displayUrlDetails();
                window.open("" + urlDetails.data.url, '_blank');
                hideLoader();
                return [2 /*return*/];
        }
    });
}); };
// makes an api call to fetch the redirect url data
var fetchRedirectUrl = function (shortUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var urlData, urlDataJson, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(apiUrl + "/redirect-url/" + shortUrl)];
            case 1:
                urlData = _a.sent();
                return [4 /*yield*/, urlData.json()];
            case 2:
                urlDataJson = _a.sent();
                return [2 /*return*/, urlDataJson];
            case 3:
                err_2 = _a.sent();
                console.error(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//creating table for the url details fetched
var createDomForUrlDetails = function (urlDetailsJson) {
    var urlDetails = urlDetailsJson.data;
    var tableContainer = document.createElement('div');
    tableContainer.classList.add('container-table');
    var tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('container-table-header-row');
    var columnHeaders = ['Sr no.', 'Url', 'Short Url', 'Clicks'];
    columnHeaders.forEach(function (element) {
        var columnData = document.createElement('div');
        columnData.classList.add('column-table-data');
        columnData.innerHTML = element;
        tableHeaderRow.append(columnData);
    });
    tableContainer.append(tableHeaderRow);
    urlDetails.forEach(function (element, index) {
        var columnRow = document.createElement('div');
        columnRow.classList.add('column-table-row');
        var columnSerialData = document.createElement('div');
        columnSerialData.classList.add('column-data');
        columnSerialData.innerHTML = "" + (index + 1);
        var columnUrlData = document.createElement('div');
        columnUrlData.classList.add('column-data', 'url-data');
        columnUrlData.innerHTML = "<a href=\"" + element.url + "\" target=\"_blank\">" + element.url + "</a>";
        var columnShortUrlData = document.createElement('div');
        columnShortUrlData.classList.add('column-data', 'short-url');
        columnShortUrlData.innerHTML = "" + element.shortUrl;
        columnShortUrlData.onclick = function () {
            redirectToOriginalUrl(element.shortUrl);
        };
        var columnUrlClicksData = document.createElement('div');
        columnUrlClicksData.classList.add('column-data');
        columnUrlClicksData.innerHTML = "" + element.clicks;
        columnRow.append(columnSerialData, columnUrlData, columnShortUrlData, columnUrlClicksData);
        tableContainer.appendChild(columnRow);
    });
    document.getElementById('table-contents').innerHTML = '';
    document.getElementById('table-contents').append(tableContainer);
    urlDetails.length === 0 ?
        document.getElementById('table-of-contents').style.display = 'none' :
        document.getElementById('table-of-contents').style.display = 'flex';
};
// creating a loader to show till the data is fetched
var createLoader = function () {
    var loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');
    loaderContainer.id = 'loader-contanier';
    var loader = document.createElement('div');
    loader.classList.add('loader');
    loaderContainer.append(loader);
    document.body.append(loaderContainer);
};
// show the loader
var showLoader = function () {
    document.getElementById('loader-contanier').style.display = 'flex';
};
//hide the loader
var hideLoader = function () {
    document.getElementById('loader-contanier').style.display = 'none';
};
//make an api call to shortern the url
var shortenUrl = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, shortenUrl_1, shortenUrlDetails, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                showLoader();
                url = document.getElementById('shrink-text').value;
                return [4 /*yield*/, fetch(apiUrl + "/shorten-url", {
                        // Adding method type 
                        method: "POST",
                        // Adding body or contents to send 
                        body: JSON.stringify({
                            url: url,
                        }),
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.getItem('jwt-token')
                        }
                    })];
            case 1:
                shortenUrl_1 = _a.sent();
                return [4 /*yield*/, shortenUrl_1.json()];
            case 2:
                shortenUrlDetails = _a.sent();
                document.getElementById('shrink-text').value = '';
                displayMsgModal(shortenUrlDetails.message);
                displayUrlDetails();
                hideLoader();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// create a modal to display appropriate msg and disappear in 3 secs
var displayMsgModal = function (msg) {
    var msgModalContainer = document.createElement('div');
    msgModalContainer.classList.add('msg-modal-container');
    msgModalContainer.id = 'msg-modal-container';
    var msgModalContent = document.createElement('div');
    msgModalContent.classList.add('msg-modal-content');
    msgModalContent.innerHTML = msg;
    var modalCloseBtn = document.createElement('div');
    modalCloseBtn.classList.add('modal-close-btn');
    modalCloseBtn.innerHTML = 'close';
    msgModalContent.append(modalCloseBtn);
    msgModalContainer.append(msgModalContent);
    document.body.append(msgModalContainer);
    modalCloseBtn.onclick = function () {
        msgModalContainer.style.display = 'none';
    };
    setTimeout(function () {
        msgModalContainer.remove();
    }, 3000);
};
function setEventListner(id, eventType, cb) {
    var element = document.getElementById(id);
    if (typeof (element) !== 'undefined' && element != null) {
        element.addEventListener(eventType, cb);
    }
}
// on click of btn call a method to shorten the url
setEventListner('shortenUrl', 'click', function () {
    shortenUrl();
});
setEventListner('sign-in-link', 'click', function () {
    closeModal('sign-up-modal');
    closeModal('forgot-password');
    showModal('sign-in-modal');
});
setEventListner('sign-in', 'click', function () {
    closeModal('sign-up-modal');
    closeModal('forgot-password');
    showModal('sign-in-modal');
});
setEventListner('sign-up-link', 'click', function () {
    closeModal('forgot-password');
    closeModal('sign-in-modal');
    showModal('sign-up-modal');
});
setEventListner('sign-up', 'click', function () {
    closeModal('forgot-password');
    closeModal('sign-in-modal');
    showModal('sign-up-modal');
});
// setEventListner('sign-in-modal-close-btn', 'click', () => {
//     closeModal('sign-in-modal');
// })
// setEventListner('sign-up-modal-close-btn', 'click', () => {
//     closeModal('sign-up-modal');
// })
// setEventListner('forgot-password-close-btn', 'click', () => {
//     closeModal('forgot-password');
// })
setEventListner('login-btn', 'click', function () {
    signInUser();
});
setEventListner('sign-out-btn', 'click', function () {
    createConfirmationModal('Are you sure you want to sign out?', 'Sign out', function () {
        localStorage.removeItem('jwt-token');
        document.getElementById('logout-handler').style.display = 'none';
        document.getElementById('table-of-contents').style.display = 'none';
        showModal('sign-in-modal');
    });
});
setEventListner('sign-up-btn', 'click', function () {
    signUpUser();
});
setEventListner('retreive-password-btn', 'click', function () {
    retrievePassword();
});
setEventListner('btn-forgot-password', 'click', function () {
    closeModal('sign-in-modal');
    showModal('forgot-password');
});
var createConfirmationModal = function (msg, title, cb) {
    var confirmationModalContainer = document.createElement('div');
    confirmationModalContainer.classList.add('confirmation-modal-container');
    var confirmationModalContent = document.createElement('div');
    confirmationModalContent.classList.add('confirmation-modal-content');
    var confirmationModalTitle = document.createElement('div');
    confirmationModalTitle.classList.add('confirmation-modal-title');
    confirmationModalTitle.innerHTML = title;
    var confirmationModalMsg = document.createElement('div');
    confirmationModalMsg.classList.add('confirmation-modal-msg');
    confirmationModalMsg.innerHTML = msg;
    var btnContainer = document.createElement('div');
    btnContainer.classList.add('confirmation-btn-container');
    var confirmationBtn = document.createElement('div');
    confirmationBtn.classList.add('confirmation-btn');
    confirmationBtn.innerHTML = 'Confirm';
    confirmationBtn.onclick = function () {
        cb();
        confirmationModalContainer.remove();
    };
    var cancelBtn = document.createElement('div');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.onclick = function () {
        confirmationModalContainer.remove();
    };
    btnContainer.append(confirmationBtn, cancelBtn);
    confirmationModalContent.append(confirmationModalTitle, confirmationModalMsg, btnContainer);
    confirmationModalContainer.append(confirmationModalContent);
    document.body.append(confirmationModalContainer);
};
var showModal = function (id) {
    document.getElementById(id).style.display = 'flex';
};
var closeModal = function (id) {
    document.getElementById(id).style.display = 'none';
};
var signUpUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, confirmPassword, mailFormat, user, userJson, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                email = document.getElementById('sign-up-email').value;
                password = document.getElementById('sign-up-password').value;
                confirmPassword = document.getElementById('sign-up-confirm-password').value;
                mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!!mailFormat.test(email.toLowerCase())) return [3 /*break*/, 1];
                displayMsgModal('Please enter a valid email');
                return [3 /*break*/, 6];
            case 1:
                if (!(password === '' || password.length < 6)) return [3 /*break*/, 2];
                displayMsgModal('Passwrod length should be greater than 6');
                return [3 /*break*/, 6];
            case 2:
                if (!(password !== confirmPassword)) return [3 /*break*/, 3];
                displayMsgModal('password and confirm password should match');
                return [3 /*break*/, 6];
            case 3:
                showLoader();
                return [4 /*yield*/, fetch(apiUrl + "/sign-up", {
                        // Adding method type 
                        method: "POST",
                        // Adding body or contents to send 
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json"
                        }
                    })];
            case 4:
                user = _a.sent();
                return [4 /*yield*/, user.json()];
            case 5:
                userJson = _a.sent();
                if (userJson.data) {
                    localStorage.setItem('jwt-token', userJson.token);
                    closeModal('sign-up-modal');
                    document.getElementById('sign-in-user').innerHTML = userJson.data.email;
                    document.getElementById('logout-handler').style.display = 'block';
                    displayUrlDetails();
                }
                displayMsgModal(userJson.message);
                hideLoader();
                _a.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_4 = _a.sent();
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
var signInUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, mailFormat, user, userJson, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                email = document.getElementById('sign-in-email').value;
                password = document.getElementById('sign-in-password').value;
                mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!!mailFormat.test(email.toLowerCase())) return [3 /*break*/, 1];
                displayMsgModal('Please enter a valid email');
                return [3 /*break*/, 7];
            case 1:
                showLoader();
                return [4 /*yield*/, fetch(apiUrl + "/login", {
                        // Adding method type 
                        method: "POST",
                        // Adding body or contents to send 
                        body: JSON.stringify({
                            email: email,
                            password: password
                        }),
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json"
                        }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user.json()];
            case 3:
                userJson = _a.sent();
                if (!userJson.data) return [3 /*break*/, 5];
                localStorage.setItem('jwt-token', userJson.token);
                return [4 /*yield*/, displayUrlDetails()];
            case 4:
                _a.sent();
                closeModal('sign-in-modal');
                document.getElementById('sign-in-user').innerHTML = userJson.data.email;
                document.getElementById('logout-handler').style.display = 'block';
                return [3 /*break*/, 6];
            case 5:
                document.getElementById('logout-handler').style.display = 'none';
                _a.label = 6;
            case 6:
                hideLoader();
                displayMsgModal(userJson.message);
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                err_5 = _a.sent();
                console.log(err_5);
                document.getElementById('logout-handler').style.display = 'none';
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var retrievePassword = function () { return __awaiter(void 0, void 0, void 0, function () {
    var email, mailFormat, user, userJson, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                email = document.getElementById('forgot-password-email').value;
                mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!!mailFormat.test(email.toLowerCase())) return [3 /*break*/, 1];
                displayMsgModal('Please enter a valid email');
                return [3 /*break*/, 4];
            case 1:
                showLoader();
                return [4 /*yield*/, fetch(apiUrl + "/forget-password", {
                        // Adding method type 
                        method: "POST",
                        // Adding body or contents to send 
                        body: JSON.stringify({
                            email: email
                        }),
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json"
                        }
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user.json()];
            case 3:
                userJson = _a.sent();
                displayMsgModal(userJson.message);
                hideLoader();
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_6 = _a.sent();
                console.error(err_6);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
createLoader();
var checkIsUserLoggedIn = function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, userjson, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(localStorage.getItem('jwt-token') != null)) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch(apiUrl + "/ping", {
                        // Adding method type 
                        method: "GET",
                        // Adding headers to the request 
                        headers: {
                            "Content-type": "application/json",
                            "Authorization": localStorage.getItem('jwt-token')
                        }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, user.json()];
            case 2:
                userjson = _a.sent();
                if (userjson.data) {
                    document.getElementById('sign-in-user').innerHTML = userjson.data.email;
                    displayUrlDetails();
                }
                else {
                }
                return [3 /*break*/, 4];
            case 3:
                showModal('sign-in-modal');
                document.getElementById('logout-handler').style.display = 'none';
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_7 = _a.sent();
                console.log(err_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
if (window.location.pathname === '/reset-password.html') {
    var form = document.getElementById("reset");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        resetPassword();
    });
}
else {
    checkIsUserLoggedIn();
}
var resetPassword = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, token, password, confirmPassword, data, userJson, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = new URL(window.location.href);
                token = url.searchParams.get("key");
                console.log(token);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                password = document.getElementById("password").value;
                confirmPassword = document.getElementById("confirm-password").value;
                if (!(password === confirmPassword)) return [3 /*break*/, 4];
                showLoader();
                return [4 /*yield*/, fetch(apiUrl + "/reset", {
                        // Adding method type
                        method: "PUT",
                        // Adding body or contents to send
                        body: JSON.stringify({
                            token: token,
                            password: password
                        }),
                        // Adding headers to the request
                        headers: {
                            "Content-type": "application/json",
                        },
                    })];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, data.json()];
            case 3:
                userJson = _a.sent();
                if (userJson.data) {
                    localStorage.setItem('jwt-token', userJson.token);
                    window.location.href = '/index.html';
                }
                hideLoader();
                displayMsgModal(userJson.message);
                return [3 /*break*/, 5];
            case 4:
                displayMsgModal("password and confirm password shoud be same");
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_8 = _a.sent();
                console.log(err_8);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;
//# sourceMappingURL=index.js.map