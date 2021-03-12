var currentOrder;

window.onload = function() {
    //Create a list of all possible items in an order
    replaceSignInNavPlaceHolder();
    loadOrder()
}

function loadOrder() {
    fillOrderHistory();
    //Grab current order from session storage
    let currentOrderJSON = sessionStorage.getItem("currentOrder");
    if(JSON.parse(currentOrderJSON) == null) {
        currentOrder = JSON.parse(JSON.stringify(items));
    } else {
        currentOrder = JSON.parse(currentOrderJSON);
    }

    //Order name
    let currentOrderSummaryJSON = sessionStorage.getItem("currentOrderSummary");
    if(JSON.parse(currentOrderSummaryJSON) == null) {
        let tempDate = new Date();
        $("#order-name").val(`${tempDate.getMonth()}-${tempDate.getDay()}-${tempDate.getFullYear()}`);
    } else {
        $("#order-name").val(JSON.parse(currentOrderSummaryJSON)["ordername"]);
    }
    
    //Add input to form dynamically using jquery
    //Sizes = 0, Container/cup = 1, Flavor = 2, Standard toppings = 3, Specialty toppings = 4
    var locationToInsertButtons = "Hasn't been assigned a valid value.";

    //Radio buttons
    for(let i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                locationToInsertButtons = "#sizeoptions";
                break;
            case 1:
                locationToInsertButtons = "#cupoptions";
                break;
        }
        for(let j = 0; j < currentOrder[i].length ; j++) {
            var inp = document.createElement("input");
            inp.type = "radio";
            inp.name = locationToInsertButtons;
            inp.id = "" + i + j;
            //Load current state of the buttons
            let mainCategoryIndex = i;
            let subCategoryIndex = j;
            //Iterate over all the buttons and update which one is selected
            let locationOfButtons;
            switch(mainCategoryIndex) {
                case 0:
                    locationOfButtons = "#sizeoptions";
                    break;
                case 1:
                    locationOfButtons = "#cupoptions";
                    break;
            }
            if(currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] == "true") {
                inp.checked = true;
            }

            inp.addEventListener('change', function() {
                let mainCategoryIndex = Number(this.id.charAt(0));
                let subCategoryIndex = Number(this.id.charAt(1));
                //Iterate over all the buttons and update which one is selected
                let locationOfButtons;
                switch(mainCategoryIndex) {
                    case 0:
                        locationOfButtons = "#sizeoptions";
                        break;
                    case 1:
                        locationOfButtons = "#cupoptions";
                        break;
                }
                $(locationOfButtons + " :radio").each(function(index) {
                    let mainCategoryIndex = Number(this.id.charAt(0));
                    let subCategoryIndex = Number(this.id.charAt(1));
                    if(this.checked) {
                        currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] = "true";
                    } else {
                        currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] = "false";
                    }
                })
                $("#subtotal-display").html("$" + calculateOrderSubtotal(currentOrder));
            });

            var lab = document.createElement("label");
            lab.classList.add("specific-option");
            lab.for = inp.id;
            let currentPrice = currentOrder[i][j]["price"];
            if(currentPrice == 0) {
                lab.innerHTML = currentOrder[i][j].description;
            } else {
                lab.innerHTML = currentOrder[i][j].description + " ($" + currentPrice + ")";
            }
            $(locationToInsertButtons).append(inp, lab, "<br>");
        }
        $(locationToInsertButtons).after("<br>");
    }

    //Checkboxes
    for(let i = 2; i < currentOrder.length; i++) {
        switch(i) {
            case 2:
                locationToInsertButtons = "#flavorheader";
                break;
            case 3:
                locationToInsertButtons = "#standardtoppingsheader";
                break;
            case 4:
                locationToInsertButtons = "#specialtytoppingsheader";
                break;
        }
        for(let j = currentOrder[i].length - 1; j >= 0 ; j--) {
            var inp = document.createElement("input");
            inp.type = "checkbox";
            inp.name = "cupsizebutton";
            inp.id = "" + i + j;
            //Load the current state of the buttons
            var mainCategoryIndex = i;
            var subCategoryIndex = j;
            if (currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] == "true") {
                inp.checked = true;
            }
            inp.addEventListener('change', function() {
                var mainCategoryIndex = this.id.charAt(0);
                var subCategoryIndex = this.id.charAt(1);
                if(this.checked) {
                    currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] = "true";
                } else {
                    currentOrder[mainCategoryIndex][subCategoryIndex]["selected"] = "false";
                }
                $("#subtotal-display").html("$" + calculateOrderSubtotal(currentOrder));
            });

            var lab = document.createElement("label");
            lab.classList.add("specific-option");
            lab.for = inp.id;
            let currentPrice = currentOrder[i][j]["price"];
            if(currentPrice == 0) {
                lab.innerHTML = currentOrder[i][j].description;
            } else {
                lab.innerHTML = currentOrder[i][j].description + " ($" + currentPrice + ")";
            }

            $(locationToInsertButtons).after(inp, lab, "<br>");
        }
        $(locationToInsertButtons).after("<br>");
    }
    $("#subtotal-display").html("$" + calculateOrderSubtotal(currentOrder));
}

function fillOrderHistory() {
    //Get history from session storage
    var customerID = Number(sessionStorage.getItem("currentCustomer"));
    console.log(JSON.stringify(sessionStorage.getItem("customers")));
    if(customerID == 0) {
        var text = document.createElement("p");
        text.innerHTML = "Please sign in to view your order history.";
        //Add some text that there is no history
        $("#order-history-category").append(text);
    } else {
        //Get customer history
        var customers = JSON.parse(sessionStorage.getItem("customers"));
        var currentCustomerHistoryOrders = customers[customerID]["orderHistoryOrders"];
        var currentCustomerHistorySummaries = customers[customerID]["orderHistorySummaries"];

        //Create container
        var mainContainer = document.createElement("div");
        mainContainer.className += "container p-3 my-3";
        var row = document.createElement("div");
        row.className += "row";

        //Add all text and buttons to main container
        for(let i = 0; i < currentCustomerHistorySummaries.length; i++) {
            //Create text
            var orderIdentifierCol= document.createElement("div");
            orderIdentifierCol.className += "col-sm-6";
            var orderIdentifier = document.createElement("p");
            orderIdentifier.innerHTML = currentCustomerHistorySummaries[i]["ordername"];
            orderIdentifier.className += "past-order-identifier";
            orderIdentifierCol.append(orderIdentifier);
            row.append(orderIdentifierCol);

            //Delete button
            var orderButtonCol= document.createElement("div");
            orderButtonCol.className += "col-sm-6";

            var pastOrderDeleteButton = document.createElement("button");
            pastOrderDeleteButton.className += "history-buttons";
            pastOrderDeleteButton.id = "delete-button" + i;
            pastOrderDeleteButton.innerHTML = "Delete";
            pastOrderDeleteButton.addEventListener("click", function() {
                var customerID = Number(sessionStorage.getItem("currentCustomer"));
                let customers = JSON.parse(sessionStorage.getItem("customers"));
                let currentCustomerHistoryOrders = customers[customerID]["orderHistoryOrders"];
                let currentCustomerHistorySummaries = customers[customerID]["orderHistorySummaries"];
                serverDeleteOrderHistory(currentCustomerHistorySummaries[i].orderid);
                currentCustomerHistoryOrders.splice(i, 1);
                currentCustomerHistorySummaries.splice(i, 1);
                sessionStorage.setItem("customers", JSON.stringify(customers));
                window.location.href = "./order.html";
            })
            orderButtonCol.append(pastOrderDeleteButton);

            //Create Button
            var pastOrderSubmitButton = document.createElement("button");
            pastOrderSubmitButton.className += "history-buttons";
            pastOrderSubmitButton.id = "history-button" + i;
            pastOrderSubmitButton.innerHTML = "Load";
            pastOrderSubmitButton.addEventListener("click", function() {
                var customerID = Number(sessionStorage.getItem("currentCustomer"));
                let customers = JSON.parse(sessionStorage.getItem("customers"));
                let currentCustomerHistoryOrders = customers[customerID]["orderHistoryOrders"];
                let currentCustomerHistorySummaries = customers[customerID]["orderHistorySummaries"];
                let selectedPastOrder = currentCustomerHistoryOrders[i];
                let selectedPastSummary = currentCustomerHistorySummaries[i];
                sessionStorage.setItem("currentOrder", JSON.stringify(selectedPastOrder));
                sessionStorage.setItem("currentOrderSummary", JSON.stringify(selectedPastSummary));

                //Reload the page
                window.location.href = "./order.html";
            })
            orderButtonCol.append(pastOrderSubmitButton);

            row.append(orderButtonCol);

            mainContainer.append(row);
            
            //Make new row for next time
            row = document.createElement("div");
            row.className += "row";

            //Wrap in a list item
            var currentListItem = document.createElement("li");
            currentListItem.className += "list-group-item border-0";
            currentListItem.append(mainContainer);

            //Add container to correct location
            $("#order-history-category").append(currentListItem);
        }
    }
}

async function serverDeleteOrderHistory(orderid) {
    let response = await fetch("/order/" + orderid,  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        if (json.success) {
            console.log(json)
            window.location.href='./order.html'
        }
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
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

function submitOrder(order) {
    //Check to make sure that the minimum requirements have been met
    if(checkMinimumRequirements(order) == -1) {
        return;
    }

    var orderDetails =  {
        "ordername": $("#order-name").val(),
        "subtotal": calculateOrderSubtotal(order),
        "summary": buildSummary(order)
    }

    //Add order to customer's profile
    var customerIndex = Number(sessionStorage.getItem("currentCustomer"));
    let customersJSON = sessionStorage.getItem("customers");
    let customers;
    //If the user isn't signed in and there isn't a temporary cart made, make one
    if(customersJSON == "[]") {
        customers = JSON.parse(customersJSON);
        //Create new customer profile
        customers.push( { "orders": [],
                            "orderSummaries": []
                        });
    } else {
        customers = JSON.parse(customersJSON);
    }
    customers[customerIndex]["orders"].push(order);
    customers[customerIndex]["orderSummaries"].push(orderDetails);
    sessionStorage.setItem("customers", JSON.stringify(customers));
    //Navigate to cart page

    window.location.href = "./cart.html";
}

function checkMinimumRequirements(order) {
    //Order name
    if ($("#order-name").val() == "") {
        alert("Please add a name to the order (Can't be blank).");
        return -1;
    }
    let requirementMet = false;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < order[i].length; j++) {
            if(order[i][j]["selected"] == "true") {
                requirementMet = true;
            }
        }
        if(!requirementMet) {
            switch(i) {
                case 0:
                    alert("Please select a size.");
                    return -1;
                case 1:
                    alert("Please select the type of cup you prefer.");
                    return -1;
                case 2:
                    alert("Please select at least one flavor.");
                    return -1;
            }            
        }
        requirementMet = false;
    }
    return 0;    
}

function submitQuick(quickName) {
    var quickOrder = JSON.parse(JSON.stringify(quickOrders));
    $("#order-name").val(quickName);
    submitOrder(quickOrder[quickName]);
}

function resetOrder() {
    currentOrder = JSON.parse(JSON.stringify(items));
    window.location.href = "./order.html";
}

