var sum = 0;
var priceArr = [];
var elem = 0;
var count = 0;

var totalSum = 0;
var cartObj = [];

$(document).ready(function() {
    replaceSignInNavPlaceHolder();

    let customerId = sessionStorage.getItem("currentCustomer");
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    if(customers[customerId]["orders"].length == 0) {
        //Cart is empty
        $("#cartdisplay").html("Cart is Empty");
    } else {
        addCartElements(customerId, customers);
    }
    $("#sumDisplay").html("$" + totalSum.toFixed(2));
    
})
  
function addCartElements(customerId, customers) {
    var customerOrderSummaries = customers[customerId]["orderSummaries"];
    //For each of that customer's current order, add orders to the cart and prices to the running total.
    for(let i = 0; i < customerOrderSummaries.length; i++) {
        let currentOrder = customerOrderSummaries[i];
        cartObj.push(currentOrder);
        totalSum += Number(currentOrder["subtotal"]);

        //What will be added to the cart display
        var mainContainer = document.createElement("div");
        mainContainer.className += "w3-row w3-border flex-container";
        mainContainer.id = "cartOrder";

        //Create text
        var textContainer= document.createElement("div");
        textContainer.className += "summText w3-col l9 w3-padding";

        let text = document.createElement("p");
        text.innerHTML = currentOrder["ordername"] + "<br>$" + currentOrder["subtotal"] + "<br>" + currentOrder["summary"]
        textContainer.append(text);
        mainContainer.append(textContainer);

        //Create buttons
        var buttonsContainer= document.createElement("div");
        buttonsContainer.className += "w3-col l3 w3-padding";
        buttonsContainer.style.float = "center";

        //Edit Button
        var editButton = document.createElement("button");
        editButton.className += "w3-round w3-light-green w3-text-white w3-button";
        editButton.id = "modification-button" + i;
        editButton.innerHTML = "Edit";
        editButton.addEventListener("click", function() {
            var customerID = Number(sessionStorage.getItem("currentCustomer"));
            let customers = JSON.parse(sessionStorage.getItem("customers"));
            let currentCustomerOrders = customers[customerID]["orders"];
            let currentCustomersOrderSummaries = customers[customerID]["orderSummaries"];
            let buttonNum = this.id.charAt(19);
            let selectedOrder = currentCustomerOrders[buttonNum];
            let selectedOrderSummary = currentCustomersOrderSummaries[buttonNum];
            sessionStorage.setItem("currentOrder", JSON.stringify(selectedOrder));
            sessionStorage.setItem("currentOrderSummary", JSON.stringify(selectedOrderSummary));

            //Delete the element from orders list so that the form won't make another copy
            removeFromCurrentOrders(buttonNum);
            //Navigate to order page
            window.location.href = "./order.html";
        })  
        
        //Delete Button
        var deleteButton = document.createElement("button");
        deleteButton.className += "w3-round w3-red w3-button";
        deleteButton.id = "delete-button" + i;
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", function() {
            let buttonNum = this.id.charAt(13);
            //Delete the element from orders list so that the form won't make another copy
            removeFromCurrentOrders(buttonNum);
            //Navigate to order page
            window.location.href = "./cart.html";
        }) 

        //Add buttons to button container
        buttonsContainer.append(editButton);
        buttonsContainer.append(deleteButton);

        //Add text and button containers to main container
        mainContainer.append(textContainer);
        mainContainer.append(buttonsContainer);

        //Add the main component to the cart display
        $("#cart").append(mainContainer);
    }
}

function removeFromCurrentOrders(index) {
    var customerID = Number(sessionStorage.getItem("currentCustomer"));
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let currentCustomerOrders = customers[customerID]["orders"];
    let currentCustomerSummaries = customers[customerID]["orderSummaries"];

    currentCustomerOrders.splice(index, 1);
    currentCustomerSummaries.splice(index, 1);
    sessionStorage.setItem("customers", JSON.stringify(customers));
}

function editSum(amount) {
    sum += amount;
}
  
function addItem(oSum) {
    $("#cartdisplay").css("display", "none");
    let item = $("#hCart").clone().css("display", "flex").attr("id","item" + elem);

    let subtotal = parseFloat(oSum.subtotal).toFixed(2);
    let str = "<p>" + oSum.ordername + "<br>$" + subtotal + "<br>" + oSum.summary + "</p>";
    item.find(".summText").append(str);
    item.appendTo("#cart");
    addSum(subtotal);
    elem++;
    count++;
}

function addSum(subtotal) {
    subtotal = parseFloat(subtotal);
    sum = parseFloat(sum);
    sum += subtotal;
    priceArr.push(subtotal);
    $("#sumDisplay").replaceWith("<h1 id=\"sumDisplay\" class=\"largeText\" style=\"color: grey; font-size:2vmin\">Current Total: $" + parseFloat(sum).toFixed(2) + "</h1>");
}
  
function removeSum(subtotal) {
    subtotal = parseFloat(subtotal);
    sum = parseFloat(sum);
    sum -= subtotal;
    if (sum < 0) {
      sum = 0;
    }
    $("#sumDisplay").replaceWith("<h1 id=\"sumDisplay\" class=\"largeText\" style=\"color: grey; font-size:2vmin\">Current Total: $" + (isNaN(parseFloat(sum)) ? (0).toFixed(2) : parseFloat(sum).toFixed(2)) + "</h1>");
}
  
function edit(x) {
    let customerId = sessionStorage.getItem("currentCustomer");
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let editJSON = customers[customerId].orders[x];
    sessionStorage.setItem("currentOrder", JSON.stringify(editJSON));
    window.location.href = './order.html';
}
  
  // Used to toggle the menu on small screens when clicking on the menu button
function navigate() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
}

function deleteSelf(x) {
    if ($("#cart").last().css("display") == "block") {
        count--;
        let str = "#" + x;
        $(str).remove();
        if (count == 0) {
            $("#empty").css("display", "block");
            elem = 0;
        }
      let y = parseInt(x.substring(4)) - 1;
      removeSum(priceArr[y]);
      priceArr.splice(y, 1);
      let customerId = sessionStorage.getItem("currentCustomer");
      let customers = JSON.parse(sessionStorage.getItem("customers"));
      customers[customerId].orderSummaries.splice(y, 1);
      customers[customerId].orders.splice(y, 1);
      sessionStorage.setItem("customers", JSON.stringify(customers));
    }
}
  
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
  
function checkOut() {
    let CCN = $("#creditcard").val();
    let PIN = $("#pin").val();

    if(!clientSideValidation(CCN, PIN)) {
        return;
    }
    
    let customerId = sessionStorage.getItem("currentCustomer");
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let orders = customers[customerId].orders;
    if(orders.length == 0) {
        alert("No items in cart. Go to orders page to get started!");
        window.location.href = './order.html';
        return;
    }

    // var customerID = Number(sessionStorage.getItem("currentCustomer"));

    if(customerId != 0) {
        let orderSummaries = customers[customerId].orderSummaries;
        let ordersHistory = customers[customerId].orderHistoryOrders;
        let orderHistorySummaries = customers[customerId].orderHistorySummaries;
        let orderIDs = orderHistorySummaries.orderID;
        let ordLen = orders.length;
        for (let i = 0; i < ordLen; i++) {
            //Save order info into history if logged in
            //if(customerId != 0) {
                let removedOrder = orders[0];
                let removedSummary = orderSummaries[0];
                ordersHistory.push(removedOrder);
                console.log(JSON.stringify(orderHistorySummaries));
                orderHistorySummaries.push(removedSummary);
                let orderName = orderSummaries[0]["ordername"];

                if(getCookie("authorized")) {
                    serverStoreOrders(removedOrder, orderName, orderIDs);
                }
            }
            
            orders.splice(0, 1);
            orderSummaries.splice(0, 1);
        }
        sessionStorage.setItem("customers", JSON.stringify(customers));
    //}
    window.location.href = './index.html';
}
  
async function serverStoreOrders(order, name, orderHistoryID) {
    let response = await fetch("/order",  {
        method: 'POST',
        headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'orderhistoryorders': encodeCurrentOrder(order),
            'name': name
        })
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        alert(json.body)
        orderHistoryID.push(json.body)
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = response
        console.log(json)
    }
}

function addAnotherOrder() {
    sessionStorage.setItem("currentOrder", "null");
    sessionStorage.setItem("currentOrderSummary", "null");
    window.location='./order.html';
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

function clientSideValidation(creditCardNum, pin) {
    if(!validateCheckout(creditCardNum)) {
        alert("Must enter a valid credit card number.");
        return false;
    }
    if(!validateCheckout(pin)) {
        alert("Must enter a valid pin.");
        return false;
    }
    if(creditCardNum.length < 16 || creditCardNum.length > 19) {
        alert("Credit card number must be between 16 and 19 characters.");
        return false;
    }
    return true;
}

function validateCheckout(input) {
    const re = /^[0-9]+$/;
    return re.test(String(input).toLowerCase());
}