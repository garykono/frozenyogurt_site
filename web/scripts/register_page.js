window.onload = function() {
    replaceSignInNavPlaceHolder();

    getTempEmail();
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
    cartImage.src="./images/shopping_cart.png";
    cartImage.alt = "Shopping cart image.";
    cartImage.style.maxHeight = "20px";
    $("#cartNav").append(cartImage);
  }

function getTempEmail() {
    let temp = sessionStorage.getItem("tempEmail");
    // console.log(temp);
    if (temp) {
        $("#eml").val(temp);
    }
}

function register() {
    let email = $("#eml").val();
    let username = $("#usr").val();
    let password = $("#pwd").val();
    let phone = $("#phone").val();

    if(clientSideValidation(email, username, password, phone) == false) {
        return;
    }

    //Send to server
    serverSideRegistration(email, username, password, phone);

    //signinFakeUser(email);
}

function clientSideValidation(email, username, password, phone) {
    if(!validateEmail(email)) {
        alert("Must enter a valid email address.");
        return false;
    }
    if(username.length < 4 || username.length > 16) {
        alert("Username must be between 4 and 16 characters.");
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
    if(phone.length != 10) {
        alert("Phone number must be 10 digits.");
        return false;
    }
    if(!onlyContainsNumbers(phone)) {
        alert("Phone number can only contain digits.");
        return false;
    }
}

async function serverSideRegistration(email, username, password, phone) {
    let response = await fetch("/auth",  {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'username': username,
            'password': password,
            'phone': phone
        })
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        // console.log(json)

        if (json.success) {
            alert("Your account has been successfully registered.")
            window.location.href = "./signin_page.html";
        }
    } else {
        // console.log(response.status)
        let json = await response.json()
        // console.log(json)
        alert("Error: " + json.message)
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

function containsNumber(myString) {
    return /\d/.test(myString);
}
function containsLetter(myString) {
    return /[a-zA-Z]/g.test(myString);
}
function onlyContainsNumbers(myString) {
    return /^\d+$/.test(myString);
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}