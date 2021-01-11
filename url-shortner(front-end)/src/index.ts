import { UrlDetails } from './interfaces/url-details.interface';
import { ResponseJson } from './interfaces/response-json.interface';
import Chart from 'chart.js';

let apiUrl: string = 'https://secure-login-url-shortner.herokuapp.com';

// fetch all url details to display in table
let fetchAllUrlDetails = async (): Promise<ResponseJson> => {
    try {
        let urlDetails = await fetch(`${apiUrl}/url-data`, {

            // Adding method type 
            method: "GET",

            // Adding headers to the request 
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('jwt-token')
            }
        });
        let urlDetailsJson: ResponseJson = await urlDetails.json();
        return urlDetailsJson;
    } catch (err) {
        console.error(err);
    }
}

// display url details in table and show loader till the data is been fetch and the hide loader
let displayUrlDetails = async () => {
    showLoader();
    let urlDetailsJson = await fetchAllUrlDetails();
    hideLoader();
    createDomForUrlDetails(urlDetailsJson);
    createChart(urlDetailsJson.data);
}

// fetch the redirect url and redirect in a new tab
let redirectToOriginalUrl = async (shortUrl: string) => {
    showLoader();
    let urlDetails = await fetchRedirectUrl(shortUrl);
    displayUrlDetails();
    window.open(`${urlDetails.data.url}`, '_blank');
    hideLoader();
}

// makes an api call to fetch the redirect url data
let fetchRedirectUrl = async (shortUrl: string) => {
    try {
        let urlData = await fetch(`${apiUrl}/redirect-url/${shortUrl}`);
        let urlDataJson = await urlData.json();
        return urlDataJson;
    } catch (err) {
        console.error(err);
    }
}

//creating table for the url details fetched
let createDomForUrlDetails = (urlDetailsJson) => {
    let urlDetails: Array<UrlDetails> = urlDetailsJson.data;

    let tableContainer = document.createElement('div');
    tableContainer.classList.add('container-table');

    let tableHeaderRow = document.createElement('div');
    tableHeaderRow.classList.add('container-table-header-row');

    let columnHeaders = ['Sr no.', 'Url', 'Short Url', 'Clicks'];
    columnHeaders.forEach(element => {
        let columnData = document.createElement('div');
        columnData.classList.add('column-table-data');
        columnData.innerHTML = element;
        tableHeaderRow.append(columnData);
    })

    tableContainer.append(tableHeaderRow);

    urlDetails.forEach((element: UrlDetails, index: number) => {
        let columnRow = document.createElement('div');
        columnRow.classList.add('column-table-row');

        let columnSerialData = document.createElement('div');
        columnSerialData.classList.add('column-data');
        columnSerialData.innerHTML = `${index + 1}`;

        let columnUrlData = document.createElement('div');
        columnUrlData.classList.add('column-data', 'url-data');
        columnUrlData.innerHTML = `<a href="${element.url}" target="_blank">${element.url}</a>`;

        let columnShortUrlData = document.createElement('div');
        columnShortUrlData.classList.add('column-data', 'short-url');
        columnShortUrlData.innerHTML = `${element.shortUrl}`;
        columnShortUrlData.onclick = () => {
            redirectToOriginalUrl(element.shortUrl);
        }

        let columnUrlClicksData = document.createElement('div');
        columnUrlClicksData.classList.add('column-data');
        columnUrlClicksData.innerHTML = `${element.clicks}`;

        columnRow.append(columnSerialData, columnUrlData, columnShortUrlData, columnUrlClicksData);
        tableContainer.appendChild(columnRow);
    });
    document.getElementById('table-contents').innerHTML = '';
    document.getElementById('table-contents').append(tableContainer);
    urlDetails.length === 0 ?
        document.getElementById('table-of-contents').style.display = 'none' :
        document.getElementById('table-of-contents').style.display = 'flex'

}

// creating a loader to show till the data is fetched
let createLoader = () => {
    let loaderContainer = document.createElement('div');
    loaderContainer.classList.add('loader-container');
    loaderContainer.id = 'loader-contanier';

    let loader = document.createElement('div');
    loader.classList.add('loader');

    loaderContainer.append(loader);
    document.body.append(loaderContainer)
}

// show the loader
let showLoader = () => {
    document.getElementById('loader-contanier').style.display = 'flex';
}

//hide the loader
let hideLoader = () => {
    document.getElementById('loader-contanier').style.display = 'none';
}

//make an api call to shortern the url
let shortenUrl = async () => {
    try {
        showLoader();
        let url = (<HTMLInputElement>document.getElementById('shrink-text')).value;
        let shortenUrl = await fetch(`${apiUrl}/shorten-url`, {

            // Adding method type 
            method: "POST",

            // Adding body or contents to send 
            body: JSON.stringify({
                url,
            }),

            // Adding headers to the request 
            headers: {
                "Content-type": "application/json",
                "Authorization": localStorage.getItem('jwt-token')
            }
        });
        let shortenUrlDetails = await shortenUrl.json();
        (<HTMLInputElement>document.getElementById('shrink-text')).value = '';
        displayMsgModal(shortenUrlDetails.message);
        displayUrlDetails();
        hideLoader();
    } catch (err) {

    }
}

// create a modal to display appropriate msg and disappear in 3 secs
let displayMsgModal = (msg: string) => {
    let msgModalContainer = document.createElement('div');
    msgModalContainer.classList.add('msg-modal-container');
    msgModalContainer.id = 'msg-modal-container';

    let msgModalContent = document.createElement('div');
    msgModalContent.classList.add('msg-modal-content');
    msgModalContent.innerHTML = msg;

    let modalCloseBtn = document.createElement('div');
    modalCloseBtn.classList.add('modal-close-btn');
    modalCloseBtn.innerHTML = 'close';

    msgModalContent.append(modalCloseBtn);

    msgModalContainer.append(msgModalContent);
    document.body.append(msgModalContainer);

    modalCloseBtn.onclick = () => {
        msgModalContainer.style.display = 'none';
    }
    setTimeout(() => {
        msgModalContainer.remove();
    }, 3000)
}

function setEventListner(id: string, eventType: string, cb) {
    var element = document.getElementById(id);
    if (typeof (element) !== 'undefined' && element != null) {
        element.addEventListener(eventType, cb);
    }
}

// on click of btn call a method to shorten the url
setEventListner('shortenUrl', 'click', () => {
    shortenUrl();
})

// on click show sign in modal
setEventListner('sign-in-link', 'click', () => {
    closeModal('sign-up-modal');
    closeModal('forgot-password');
    showModal('sign-in-modal');
})

setEventListner('sign-in', 'click', () => {
    closeModal('sign-up-modal');
    closeModal('forgot-password');
    showModal('sign-in-modal');
})

//on click show sign up modal
setEventListner('sign-up-link', 'click', () => {
    closeModal('forgot-password');
    closeModal('sign-in-modal');
    showModal('sign-up-modal');
})
setEventListner('sign-up', 'click', () => {
    closeModal('forgot-password');
    closeModal('sign-in-modal');
    showModal('sign-up-modal');
})

// login the user with provided credentials
setEventListner('login-btn', 'click', () => {
    signInUser();
})

//sign out the user 
setEventListner('sign-out-btn', 'click', () => {
    createConfirmationModal('Are you sure you want to sign out?', 'Sign out', () => {
        location.href = window.location.href.split('?')[0];
        localStorage.removeItem('jwt-token');
        document.getElementById('logout-handler').style.display = 'none';
        document.getElementById('table-of-contents').style.display = 'none'
        showModal('sign-in-modal');
    });
})

// create sign up btn to register user
setEventListner('sign-up-btn', 'click', () => {
    signUpUser();
})

//retrieve btn to retrieve the password
setEventListner('retreive-password-btn', 'click', () => {
    retrievePassword();
})

//forgot btn to get forgot password modal
setEventListner('btn-forgot-password', 'click', () => {
    closeModal('sign-in-modal');
    showModal('forgot-password');
})

//create confirmation modal
let createConfirmationModal = (msg: string, title: string, cb: Function) => {
    let confirmationModalContainer = document.createElement('div');
    confirmationModalContainer.classList.add('confirmation-modal-container');

    let confirmationModalContent = document.createElement('div');
    confirmationModalContent.classList.add('confirmation-modal-content');

    let confirmationModalTitle = document.createElement('div');
    confirmationModalTitle.classList.add('confirmation-modal-title');
    confirmationModalTitle.innerHTML = title;

    let confirmationModalMsg = document.createElement('div');
    confirmationModalMsg.classList.add('confirmation-modal-msg');
    confirmationModalMsg.innerHTML = msg;

    let btnContainer = document.createElement('div');
    btnContainer.classList.add('confirmation-btn-container');

    let confirmationBtn = document.createElement('div');
    confirmationBtn.classList.add('confirmation-btn');
    confirmationBtn.innerHTML = 'Confirm';
    confirmationBtn.onclick = () => {
        cb();
        confirmationModalContainer.remove();
    }

    let cancelBtn = document.createElement('div');
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.innerHTML = 'Cancel';
    cancelBtn.onclick = () => {
        confirmationModalContainer.remove();
    }

    btnContainer.append(confirmationBtn, cancelBtn);
    confirmationModalContent.append(confirmationModalTitle, confirmationModalMsg, btnContainer);
    confirmationModalContainer.append(confirmationModalContent);
    document.body.append(confirmationModalContainer);

}

//show modal
let showModal = (id: string): void => {
    document.getElementById(id).style.display = 'flex';
}

// close modal
let closeModal = (id: string): void => {
    document.getElementById(id).style.display = 'none';
}

//register user
let signUpUser = async () => {
    try {
        let email = (<HTMLInputElement>document.getElementById('sign-up-email')).value;
        let password = (<HTMLInputElement>document.getElementById('sign-up-password')).value;
        let confirmPassword = (<HTMLInputElement>document.getElementById('sign-up-confirm-password')).value;
        let firstName = (<HTMLInputElement>document.getElementById('sign-up-first-name')).value;
        let lastName = (<HTMLInputElement>document.getElementById('sign-up-last-name')).value;

        let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!mailFormat.test(email.toLowerCase())) {
            displayMsgModal('Please enter a valid email');
        } else if (password === '' || password.length < 6) {
            displayMsgModal('Passwrod length should be greater than 6');
        } else if (password !== confirmPassword) {
            displayMsgModal('password and confirm password should match');
        } else {
            showLoader();
            let user = await fetch(`${apiUrl}/sign-up`, {

                // Adding method type 
                method: "POST",

                // Adding body or contents to send 
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password
                }),

                // Adding headers to the request 
                headers: {
                    "Content-type": "application/json"
                }
            })
            let userJson = await user.json();
            if (userJson.data) {
                localStorage.setItem('jwt-token', userJson.token);
                closeModal('sign-up-modal');
                document.getElementById('sign-in-user').innerHTML = userJson.data.email;
                document.getElementById('logout-handler').style.display = 'block';
                displayUrlDetails();
            }
            displayMsgModal(userJson.message);
            hideLoader();
        }

    } catch (err) {
        console.log(err);
    }

}

//sign in user 
let signInUser = async () => {
    try {
        let email = (<HTMLInputElement>document.getElementById('sign-in-email')).value;
        let password = (<HTMLInputElement>document.getElementById('sign-in-password')).value;
        let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!mailFormat.test(email.toLowerCase())) {
            displayMsgModal('Please enter a valid email');
        } else {
            showLoader();
            let user = await fetch(`${apiUrl}/login`, {

                // Adding method type 
                method: "POST",

                // Adding body or contents to send 
                body: JSON.stringify({
                    email,
                    password
                }),

                // Adding headers to the request 
                headers: {
                    "Content-type": "application/json"
                }
            })

            let userJson = await user.json();
            if (userJson.data) {
                localStorage.setItem('jwt-token', userJson.token);
                closeModal('sign-in-modal');
                await displayUrlDetails();
                document.getElementById('sign-in-user').innerHTML = userJson.data.email;
                document.getElementById('logout-handler').style.display = 'block';
            } else {
                document.getElementById('logout-handler').style.display = 'none';
            }
            hideLoader();
            displayMsgModal(userJson.message);
        }

    } catch (err) {
        console.log(err);
        document.getElementById('logout-handler').style.display = 'none';
    }
}

//make a retrieve password call
let retrievePassword = async () => {
    try {
        let email = (<HTMLInputElement>document.getElementById('forgot-password-email')).value;
        let mailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!mailFormat.test(email.toLowerCase())) {
            displayMsgModal('Please enter a valid email');
        } else {
            showLoader();
            let user = await fetch(`${apiUrl}/forget-password`, {

                // Adding method type 
                method: "POST",

                // Adding body or contents to send 
                body: JSON.stringify({
                    email
                }),

                // Adding headers to the request 
                headers: {
                    "Content-type": "application/json"
                }
            })

            let userJson = await user.json();
            displayMsgModal(userJson.message);
            hideLoader();
        }
    } catch (err) {
        console.error(err);
    }
}

createLoader();

//check user logged in
let checkIsUserLoggedIn = async () => {
    try {
        const windowUrl = new URL(window.location.href);
        const token = windowUrl.searchParams.get("token");
        const isAccountActivationRedirect = token !== null;
        if (isAccountActivationRedirect) {
            localStorage.setItem('jwt-token', token);
        }
        if (localStorage.getItem('jwt-token') != null) {
            showLoader();
            let user = await fetch(`${apiUrl}/ping`, {

                // Adding method type 
                method: "GET",

                // Adding headers to the request 
                headers: {
                    "Content-type": "application/json",
                    "Authorization": localStorage.getItem('jwt-token')
                }
            });
            let userjson = await user.json();

            if (userjson.data) {
                document.getElementById('sign-in-user').innerHTML = userjson.data.email;
                document.getElementById('logout-handler').style.display = 'flex';
                showLoader();
                await displayUrlDetails();
                hideLoader();
                if (isAccountActivationRedirect) {
                    displayMsgModal('Account activated successfully');
                }
            } else {
                // displayMsgModal(userjson.data);
                showModal('sign-in-modal');
                document.getElementById('logout-handler').style.display = 'none';
                document.getElementById('chart-section').style.display = 'none';

            }
        } else {
            showModal('sign-in-modal');
            document.getElementById('logout-handler').style.display = 'none';
            document.getElementById('chart-section').style.display = 'none';
        }
        hideLoader();
    } catch (err) {
        console.log(err);
    }
}


if (window.location.pathname === '/reset-password.html') {
    let form = document.getElementById("reset");
    form.addEventListener("submit", e => {
        e.preventDefault();
        resetPassword();
    });
} else {
    checkIsUserLoggedIn();
}

let resetPassword = async () => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("key");
    console.log(token);
    try {
        let password = (<HTMLInputElement>document.getElementById("password")).value;
        let confirmPassword = (<HTMLInputElement>document.getElementById("confirm-password")).value;
        if (password === confirmPassword) {
            showLoader();
            let data = await fetch(`${apiUrl}/reset`, {
                // Adding method type
                method: "PUT",

                // Adding body or contents to send
                body: JSON.stringify({
                    token,
                    password
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json",
                },
            });
            let userJson = await data.json();
            if (userJson.data) {
                localStorage.setItem('jwt-token', userJson.token);
                window.location.href = '/index.html'
            }
            hideLoader();
            displayMsgModal(userJson.message);
        } else {
            displayMsgModal("password and confirm password shoud be same");
        }
    } catch (err) {
        console.log(err);
    }
}

let createChart = (urlDetails) => {

    let monthWiseData = [];
    let currentMonthsData = [];
    let days = [];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
    let urlAndRedirectData = {
        url: 0,
        redirect: 0
    };
    document.getElementById('chart-section').style.display = 'block';
    let todayDate = new Date();
    urlDetails.forEach((url: UrlDetails, index: number) => {
        let date = new Date(url.date);
        monthWiseData[date.getMonth()] ? monthWiseData[date.getMonth()]++ : monthWiseData[date.getMonth()] = 1;
        if (todayDate.getMonth() === date.getMonth()) {
            currentMonthsData[date.getDate()] ? currentMonthsData[date.getDate()]++ : currentMonthsData[date.getDate()] = 1;
        }
        urlAndRedirectData['url'] = index + 1;
        urlAndRedirectData['redirect'] += url.clicks;
    });
    let daysInMonth = getDaysInMonth(todayDate.getMonth(), todayDate.getFullYear());

    for (let i = 0; i < daysInMonth; i++) {
        if (!currentMonthsData[i]) {
            currentMonthsData[i] = 0;
        }
        days.push(i + 1);
    }

    months.forEach((month, index) => {
        if (!monthWiseData[index]) {
            monthWiseData[index] = 0;
        }
    })
    console.log(monthWiseData);

    createGraph('Current Year Data', months, monthWiseData, 'current-year-chart');
    createGraph('Current Month Data', days, currentMonthsData, 'current-month-chart');

    console.group(urlAndRedirectData)

    createPeiChart(['Url Shorten', 'Redirected From Urls'], [urlAndRedirectData['url'], urlAndRedirectData['redirect']], 'pie-chart');
}

let createGraph = (label, xAxisLabel, data, id) => {
    var ctx = (<HTMLCanvasElement>document.getElementById(id)).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: xAxisLabel,
            datasets: [{
                label: label,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data,
                showLine: true
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        fontSize: 10
                    }
                }]
            },
            plugins: {
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        font: {
                            size: 25
                        }
                    }
                }
            }
        }

    });
}

let createPeiChart = (labels, data, id) => {
    let canvas = <HTMLCanvasElement>document.getElementById(id);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: data,
                backgroundColor: ["#ef4f4f", "#ffd56b"],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: labels
        }
        // options: options
    });
}

let getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
}

setEventListner('month-data-btn', 'click', () => {
    document.getElementById('year-chart').style.display = 'block';
    document.getElementById('month-chart').style.display = 'none';
})
setEventListner('days-data-btn', 'click', () => {
    document.getElementById('year-chart').style.display = 'none';
    document.getElementById('month-chart').style.display = 'block';
})

