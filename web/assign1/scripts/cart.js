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
    let customerId = sessionStorage.getItem("currentCustomer");
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let orders = customers[customerId].orders;
    if(orders.length == 0) {
        alert("No items in cart. Go to orders page to get started!");
        window.location.href = './order.html';
        return;
    }

    let orderSummaries = customers[customerId].orderSummaries;
    let ordersHistory = customers[customerId].orderHistoryOrders;
    let orderHistorySummaries = customers[customerId].orderHistorySummaries;
    let ordLen = orders.length;
    for (let i = 0; i < ordLen; i++) {
        //Save order info into history if logged in
        if(customerId != 0) {
            let removedOrder = orders[0];
            let removedSummary = orderSummaries[0];
            ordersHistory.push(removedOrder);
            orderHistorySummaries.push(removedSummary);
        }
        
        orders.splice(0, 1);
        orderSummaries.splice(0, 1);
    }
    sessionStorage.setItem("customers", JSON.stringify(customers));
    window.location.href = './index.html';
}
  
function addAnotherOrder() {
    sessionStorage.setItem("currentOrder", "null");
    window.location='./order.html';
}

function replaceSignInNavPlaceHolder() {
    let currentCustomerNum = sessionStorage.getItem("currentCustomer");
    if(currentCustomerNum == 0) {
      //Make placeholder the sign in button
      $("#smallSignInPlaceholder").html("Sign-in");
      $("#largeSignInPlaceholder").html("Sign-in");
    } else {
      //Make placeholder the name of the signed in customer
      let customers = JSON.parse(sessionStorage.getItem("customers"));
      let currentCustomer = Number(sessionStorage.getItem("currentCustomer"));
      let currentCustomerName = customers[currentCustomer]["name"];
      $("#smallSignInPlaceholder").html(currentCustomerName);
      $("#smallSignInPlaceholder").removeAttr('href');
      $("#largeSignInPlaceholder").html(currentCustomerName);
      $("#largeSignInPlaceholder").removeAttr('href');
    }
  }