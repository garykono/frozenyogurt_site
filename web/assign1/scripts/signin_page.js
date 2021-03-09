window.onload = function() {
    replaceSignInNavPlaceHolder();
}

function replaceSignInNavPlaceHolder() {
    let currentCustomerUsername = sessionStorage.getItem("currentCustomerUsername");
    if(getCookie("authorized") != "true") {
      //Add a logout link to nav bar
      var signinNav = document.createElement("a");
      signinNav.href="./signin_page.html";
      signinNav.innerHTML = "Sign-in";
      signinNav.className += "w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white";
      signinNav.onclick= () => {
        window.location.href = "./signin_page.html"
      }
      $("#signin_container").append(signinNav);
    } else {
      //Add a "label" of the username to nav bar
      var accountNav = document.createElement("a");
      //accountNav.href="./cart.html";
      accountNav.innerHTML = currentCustomerUsername;
      accountNav.className += "w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white";
      $("#signin_container").append(accountNav);

      //Add a logout link to nav bar
      var logoutNav = document.createElement("a");
      logoutNav.href="./";
      logoutNav.innerHTML = "Logout";
      logoutNav.className += "w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white";
      logoutNav.onclick= () => {
        logout();
      }
      $("#signin_container").append(logoutNav);
    }
    //Shopping Cart nav
    var cartNav = document.createElement("a");
    cartNav.href="./cart.html";
    cartNav.className += "w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white";
    cartNav.id = "cartNav"
    $("#signin_container").append(cartNav);

    //Shopping Cart img
    var cartImage = document.createElement("img");
    cartImage.src="./images/cart.jpg";
    cartImage.alt = "Shopping cart image.";
    cartImage.style.maxHeight = "20px";
    $("#cartNav").append(cartImage);
}

function login() {
    let email = $("#eml").val();
    let password = $("#pwd").val();

    if (!clientSideValidation(email, password)) {
        return;
    }

    //Send to server
    serverSideSignin(email, password);

    //signinFakeUser(email);

    //Navigate to cart page after signing in
    //window.location.href = './cart.html';
}

function clientSideValidation(email, password) {
    if(!validateEmail(email)) {
        alert("Must enter a valid email address.");
        return false;
    }
    if(password.length < 4 || password.length > 16) {
        alert("Password must be between 4 and 16 characters.");
        return false;
    }
    if(!containsLetter(password) || !containsNumber(password)) {
        alert("Passwords must have at least one letter and one number.");
        return false;
    }
    return true;
}

async function serverSideSignin(email, password) {

    let encoded = window.btoa(email + ':' + password)

    console.log(encoded)

    let response = await fetch("/auth",  {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + encoded
        }
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)

        if (json.success) {
            sessionStorage.setItem("currentCustomerUsername", getCookie("username"))
            window.location.href = "./"
        }
    } else {
        console.log(response.status)
        let json = await response.json()
        console.log(json)
        alert("HTTP-Error: " + response.status + "\n" + json.message)
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

//These are verification helper functions for login()
function containsNumber(myString) {
    return /\d/.test(myString);
}
function containsLetter(myString) {
    return /[a-zA-Z]/g.test(myString);
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * If register button is pressed, go to the register page and copy email over
 */
function register() {
    //Put email in session storage
    let email = $("#eml").val();
    sessionStorage.setItem("tempEmail", email);
    
    //Navigate to registration page
    window.location.href = './register_page.html';
}

async function logout() {
    let response = await fetch("/auth",  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        window.location.href='/'

    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}

function signinFakeUser(email) {
    //Add user profile to customers list
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let testUser =  {   "name": email,
                        "orders": [],
                        "orderSummaries": [],
                        "orderHistoryOrders": [testOrder],
                        "orderHistorySummaries": [{   "ordername": "Mike's fav",
                                                        "subtotal": calculateOrderSubtotal(testOrder),
                                                        "summary": buildSummary(testOrder)
                                                    }]
                    }
    customers.push(testUser);
    sessionStorage.setItem("customers", JSON.stringify(customers));

    //Change customer number in session storage
    sessionStorage.setItem("currentCustomer", JSON.stringify(customers.length) - 1);

    console.log(customers);
    //For testing, check current order
    // let custIndex = sessionStorage.getItem("currentCustomer");
    // let custList = JSON.parse(sessionStorage.getItem("customers"));
    // let pastOrder = custList[custIndex]["orderHistory"][0];
    // sessionStorage.setItem("currentOrder", JSON.stringify(pastOrder));
    // console.log(sessionStorage.getItem("currentOrder"));
}