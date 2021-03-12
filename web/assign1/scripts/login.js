async function logout() {
    let response = await fetch("/auth",  {
        method: 'DELETE'
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        logoutProfile();
        window.location.href='/'
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}

function signinProfile(email) {
    //Add user profile to customers list
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    let testUser =  {   "name": email,
                        "orders": [],
                        "orderSummaries": [],
                        "orderHistoryOrders": [],
                        "orderHistorySummaries": []
                    }
    customers.push(testUser);
    sessionStorage.setItem("customers", JSON.stringify(customers));

    //Change customer number in session storage
    sessionStorage.setItem("currentCustomer", JSON.stringify(customers.length) - 1);

    console.log(customers);
}

function logoutProfile() {
    //Removes user profile to customers list
    let customers = JSON.parse(sessionStorage.getItem("customers"));
    customers.pop();
    sessionStorage.setItem("customers", JSON.stringify(customers));

    //Change customer number in session storage
    sessionStorage.setItem("currentCustomer", JSON.stringify(customers.length) - 1);

    console.log(customers);

    sessionStorage.clear();
}