function calculateOrderSubtotal(order) {
    var subtotal = 0;
    for(let i = 0; i < order.length; i++) {
        for(let j = 0; j < order[i].length; j++) {
            if(order[i][j]["selected"] == "true") {
                subtotal += Number(order[i][j]["price"]);
            }
        }
    }
    return subtotal.toFixed(2);
}

function buildSummary(order) {
    var summary = "";
    let subcategoryCheckedItems = [];
    for(let i = 0; i < order.length; i++) {
        subcategoryCheckedItems.push([]);
        for(let j = 0; j < order[i].length; j++) {
            if(order[i][j]["selected"] == "true") {
                subcategoryCheckedItems[i].push(order[i][j]["description"]);                
            }
        }           
    }
    for(let i = 0; i < subcategoryCheckedItems.length; i++) {
        switch(i) {
            case 2:
                summary += "Flavor: ";
                break;
            case 3:
                summary += "Toppings: ";
                break;
            case 4:
                summary += "Specialty Toppings: ";
                break;
        }
        if(subcategoryCheckedItems[i].length == 0) {
            summary += "none. ";
            continue;
        }
        for(let j = 0; j < subcategoryCheckedItems[i].length; j++) {
            summary += subcategoryCheckedItems[i][j];
            if(j == subcategoryCheckedItems[i].length - 1) {
                summary += ". ";
            } else {
                summary += ", ";
            }
        }  
    }
    return summary;
}

const items = [
    [
        {
            "description": "8oz",
            "price": "4.65",
            "selected": "false"
        },
        {
            "description": "10oz",
            "price": "5.35",
            "selected": "false"
        },
        {
            "description": "15oz",
            "price": "6.85",
            "selected": "false"
        }
    ],
    [
        {
            "description": "Paper Bowl",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Eco-friendly Bowl",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Edible Bowl",
            "price": "2.05",
            "selected": "false"
        },
    ],
    [
        {
            "description": "Original Tart",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Vanilla",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Chocolate",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Cake Batter",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Cookies and Cream",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Green Tea",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Taro",
            "price": "0",
            "selected": "false"
        },
        {
            "description": "Strawberries and Cream",
            "price": "0",
            "selected": "false"
        }
    ],
    [
        {
            "description": "Gummy Bears",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Sprinkles",
            "price": "0.75",
            "selected": "false"
        },
        {
            "description": "M&Ms",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Oreos",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Toffee",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Reece's Peanut Butter Cups",
            "price": "0.95",
            "selected": "false"
        },
        {
            "description": "Chocolate Chip Cookie Dough",
            "price": "0.95",
            "selected": "false"
        },
        {
            "description": "Hershey's Kisses",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Fruity Pebbles",
            "price": "0.90",
            "selected": "false"
        },
        {
            "description": "Sour Gummy Worms",
            "price": "0.90",
            "selected": "false"
        }
    ],
    [
        {
            "description": "Tapioca Jelly Balls",
            "price": "1.10",
            "selected": "false"
        },
        {
            "description": "Maraschino Cherries",
            "price": "1.10",
            "selected": "false"
        },
        {
            "description": "Walnuts",
            "price": "0.95",
            "selected": "false"
        },
        {
            "description": "Sliced Strawberries",
            "price": "1.05",
            "selected": "false"
        },
        {        
            "description": "Blueberries",
            "price": "0.80",
            "selected": "false"
        }
    ]
]

const quickOrders = {
    "theclassic":   
    [
        [
            {
                "description": "8oz",
                "price": "4.65",
                "selected": "false"
            },
            {
                "description": "10oz",
                "price": "5.35",
                "selected": "true"
            },
            {
                "description": "15oz",
                "price": "6.85",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Paper Bowl",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Eco-friendly Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Edible Bowl",
                "price": "2.05",
                "selected": "false"
            },
        ],
        [
            {
                "description": "Original Tart",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Vanilla",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Chocolate",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cake Batter",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cookies and Cream",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Green Tea",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Taro",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Strawberries and Cream",
                "price": "0",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Gummy Bears",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sprinkles",
                "price": "0.75",
                "selected": "false"
            },
            {
                "description": "M&Ms",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Oreos",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Toffee",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Reece's Peanut Butter Cups",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Chocolate Chip Cookie Dough",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Hershey's Kisses",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Fruity Pebbles",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sour Gummy Worms",
                "price": "0.90",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Tapioca Jelly Balls",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Maraschino Cherries",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Walnuts",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Sliced Strawberries",
                "price": "1.05",
                "selected": "true"
            },
            {        
                "description": "Blueberries",
                "price": "0.80",
                "selected": "true"
            }
        ],
    ],
    "theworks":   
    [
        [
            {
                "description": "8oz",
                "price": "4.65",
                "selected": "false"
            },
            {
                "description": "10oz",
                "price": "5.35",
                "selected": "true"
            },
            {
                "description": "15oz",
                "price": "6.85",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Paper Bowl",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Eco-friendly Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Edible Bowl",
                "price": "2.05",
                "selected": "false"
            },
        ],
        [
            {
                "description": "Original Tart",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Vanilla",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Chocolate",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Cake Batter",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cookies and Cream",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Green Tea",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Taro",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Strawberries and Cream",
                "price": "0",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Gummy Bears",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Sprinkles",
                "price": "0.75",
                "selected": "true"
            },
            {
                "description": "M&Ms",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Oreos",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Toffee",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Reece's Peanut Butter Cups",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Chocolate Chip Cookie Dough",
                "price": "0.95",
                "selected": "true"
            },
            {
                "description": "Hershey's Kisses",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Fruity Pebbles",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sour Gummy Worms",
                "price": "0.90",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Tapioca Jelly Balls",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Maraschino Cherries",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Walnuts",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Sliced Strawberries",
                "price": "1.05",
                "selected": "false"
            },
            {        
                "description": "Blueberries",
                "price": "0.80",
                "selected": "false"
            }
        ],
    ],
    "valentineskiss":   
    [
        [
            {
                "description": "8oz",
                "price": "4.65",
                "selected": "false"
            },
            {
                "description": "10oz",
                "price": "5.35",
                "selected": "true"
            },
            {
                "description": "15oz",
                "price": "6.85",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Paper Bowl",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Eco-friendly Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Edible Bowl",
                "price": "2.05",
                "selected": "false"
            },
        ],
        [
            {
                "description": "Original Tart",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Vanilla",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Chocolate",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cake Batter",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cookies and Cream",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Green Tea",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Taro",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Strawberries and Cream",
                "price": "0",
                "selected": "true"
            }
        ],
        [
            {
                "description": "Gummy Bears",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sprinkles",
                "price": "0.75",
                "selected": "false"
            },
            {
                "description": "M&Ms",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Oreos",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Toffee",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Reece's Peanut Butter Cups",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Chocolate Chip Cookie Dough",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Hershey's Kisses",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Fruity Pebbles",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sour Gummy Worms",
                "price": "0.90",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Tapioca Jelly Balls",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Maraschino Cherries",
                "price": "1.10",
                "selected": "true"
            },
            {
                "description": "Walnuts",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Sliced Strawberries",
                "price": "1.05",
                "selected": "false"
            },
            {        
                "description": "Blueberries",
                "price": "0.80",
                "selected": "false"
            }
        ],
    ],
    "jengaandchill":   
    [
        [
            {
                "description": "8oz",
                "price": "4.65",
                "selected": "false"
            },
            {
                "description": "10oz",
                "price": "5.35",
                "selected": "true"
            },
            {
                "description": "15oz",
                "price": "6.85",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Paper Bowl",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Eco-friendly Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Edible Bowl",
                "price": "2.05",
                "selected": "false"
            },
        ],
        [
            {
                "description": "Original Tart",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Vanilla",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Chocolate",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cake Batter",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cookies and Cream",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Green Tea",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Taro",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Strawberries and Cream",
                "price": "0",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Gummy Bears",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sprinkles",
                "price": "0.75",
                "selected": "false"
            },
            {
                "description": "M&Ms",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Oreos",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Toffee",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Reece's Peanut Butter Cups",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Chocolate Chip Cookie Dough",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Hershey's Kisses",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Fruity Pebbles",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sour Gummy Worms",
                "price": "0.90",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Tapioca Jelly Balls",
                "price": "1.10",
                "selected": "true"
            },
            {
                "description": "Maraschino Cherries",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Walnuts",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Sliced Strawberries",
                "price": "1.05",
                "selected": "true"
            },
            {        
                "description": "Blueberries",
                "price": "0.80",
                "selected": "false"
            }
        ],
    ]
}

const testOrder = 
    [
        [
            {
                "description": "8oz",
                "price": "4.65",
                "selected": "false"
            },
            {
                "description": "10oz",
                "price": "5.35",
                "selected": "false"
            },
            {
                "description": "15oz",
                "price": "6.85",
                "selected": "true"
            }
        ],
        [
            {
                "description": "Paper Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Eco-friendly Bowl",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Edible Bowl",
                "price": "2.05",
                "selected": "true"
            },
        ],
        [
            {
                "description": "Original Tart",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Vanilla",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Chocolate",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cake Batter",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Cookies and Cream",
                "price": "0",
                "selected": "true"
            },
            {
                "description": "Green Tea",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Taro",
                "price": "0",
                "selected": "false"
            },
            {
                "description": "Strawberries and Cream",
                "price": "0",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Gummy Bears",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Sprinkles",
                "price": "0.75",
                "selected": "false"
            },
            {
                "description": "M&Ms",
                "price": "0.90",
                "selected": "true"
            },
            {
                "description": "Oreos",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Toffee",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Reece's Peanut Butter Cups",
                "price": "0.95",
                "selected": "true"
            },
            {
                "description": "Chocolate Chip Cookie Dough",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Hershey's Kisses",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Fruity Pebbles",
                "price": "0.90",
                "selected": "false"
            },
            {
                "description": "Sour Gummy Worms",
                "price": "0.90",
                "selected": "false"
            }
        ],
        [
            {
                "description": "Tapioca Jelly Balls",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Maraschino Cherries",
                "price": "1.10",
                "selected": "false"
            },
            {
                "description": "Walnuts",
                "price": "0.95",
                "selected": "false"
            },
            {
                "description": "Sliced Strawberries",
                "price": "1.05",
                "selected": "false"
            },
            {        
                "description": "Blueberries",
                "price": "0.80",
                "selected": "true"
            }
        ],
    ];