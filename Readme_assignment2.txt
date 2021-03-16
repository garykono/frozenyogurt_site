Gary Kono
	Front end:
	- Sign-in
	- Order
	- Menu
	Back end:
	- All endpoints, testing, documentation for sign in and registration
Robert Max Davis
	Front end:
	- Home
	- Shopping Cart
	Back end:
	- All endpoints, testing, documentation for orders

Github: https://github.com/garykono/garykono-tcss460-w21

Homepage: https://garykono-tcss460-w21.herokuapp.com/

*Note: The project is primarily in folder "web/assign1" and boots from the index.html there.

Functionality implemented:
(pretty much everything in the assignment description):

	ASSIGNMENT 1:
	For testing, go to the order page and order a quick selection or build your own frozen yogurt. Add more orders
	by going to the order page again or hitting the "add another order" button. You can edit orders, delete them, or
	checkout. Checking out will not do anything if you are not signed in.

	Try signing in on the sign in page. Follow the rules (which you will learn via trial and error) and you will 
	be signed in with a premade customer profile (however, it does change your name on the profile to your username).
	This time when you checkout, orders will be saved in your history. Go to the order page and you can load previous
	orders.

	ASSIGNMENT 2:
	All the functionality promised in assignment 1 but with the backend endpoints and documentation implemented. Sign in
	and registration endpoints that transfer data using cookies. Sensitive information is encrypted in the database using
	salts. Orders history is saved and can be edited/deleted.

Functionality not implemented:
	Assignment 1:
	All session storage so there is no server side interaction.
	Customers can only have 10 orders at a time (because of how the code is written this iteration)

	Assignment 2:
	We chose to only track order history, not specifically favorites. However, the history can act as a favorites list
	because the user can delete previous orders.

Note about Postman tests:
	Run the script "SetupTables.sql" before testing
	Some of the tests require that the cookies are cleared in that session (specifically the tests related to JWT verification).