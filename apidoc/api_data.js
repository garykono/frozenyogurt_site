define({ "api": [
  {
    "type": "get",
    "url": "/auth",
    "title": "Request to sign a user in the system",
    "name": "GetAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;username:password&quot; uses Basic Auth</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is found and password matches</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true,\n  \"message\": \"Authentication successful!\",\n  \"token\": \"eyJhbGciO...abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Missing Authorization Header": [
          {
            "group": "400: Missing Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Authorization Header&quot;</p>"
          }
        ],
        "400: Malformed Authorization Header": [
          {
            "group": "400: Malformed Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Malformed Authorization Header&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Request to sign a user in the system",
    "name": "GetAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;username:password&quot; uses Basic Auth</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is found and password matches</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true,\n  \"message\": \"Authentication successful!\",\n  \"token\": \"eyJhbGciO...abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Missing Authorization Header": [
          {
            "group": "400: Missing Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Authorization Header&quot;</p>"
          }
        ],
        "400: Malformed Authorization Header": [
          {
            "group": "400: Malformed Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Malformed Authorization Header&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/signin_backup.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Request to register a user",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>a users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>a users username used only for display purposes</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>a users phone number</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"email\":\"cfb3@fake.email\",\n    \"password\":\"test12345\"\n    \"username\": \"test\",\n    \"phone\":\"1234567890\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Email exists": [
          {
            "group": "400: Email exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Email exists&quot;</p>"
          }
        ],
        "400: Invalid parameters": [
          {
            "group": "400: Invalid parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Request to register a user",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>a users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>a users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>a users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>a username *unique, if none provided, email will be used</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"first\":\"Charles\",\n    \"last\":\"Bryan\",\n    \"email\":\"cfb3@fake.email\",\n    \"password\":\"test12345\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Username exists": [
          {
            "group": "400: Username exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Username exists&quot;</p>"
          }
        ],
        "400: Email exists": [
          {
            "group": "400: Email exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Email exists&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/register_backup.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/demosql/:name",
    "title": "Request to remove entry in the DB for name",
    "name": "DeleteDemoSql",
    "group": "DemoSql",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name entry  to delete</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The string &quot;Deleted: &quot; followed by the value of the input parameter <code>name</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Deleted: Charles\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404: Name Not Found": [
          {
            "group": "404: Name Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demosql.js",
    "groupTitle": "DemoSql"
  },
  {
    "type": "get",
    "url": "/demosql/:name?",
    "title": "Request to get all (or specific) demo entries in the DB",
    "name": "GetDemoSql",
    "group": "DemoSql",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>the name to look up. If no name provided, all names are returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "names",
            "description": "<p>List of names in the Demo DB</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "names.name",
            "description": "<p>The name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "names.message",
            "description": "<p>The message associated with the name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: Name Not Found": [
          {
            "group": "404: Name Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demosql.js",
    "groupTitle": "DemoSql"
  },
  {
    "type": "post",
    "url": "/demosql",
    "title": "Request to add someone's name to the DB",
    "name": "PostDemoSql",
    "group": "DemoSql",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>someone's name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>a message to store with the name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n  \"name\": \"Charles\",\n  \"message\": \"Hello World\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The string &quot;Inserted: &quot; followed by the value of the input parameter <code>name</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true,\n  \"message\": \"Inserted: Charles\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Name exists": [
          {
            "group": "400: Name exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name exists&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demosql.js",
    "groupTitle": "DemoSql"
  },
  {
    "type": "put",
    "url": "/demosql",
    "title": "Request to replace the message entry in the DB for name",
    "name": "PutDemoSql",
    "group": "DemoSql",
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n  \"name\": \"Charles\",\n  \"message\": \"Hello World UPDATED!\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name entry</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>a message to replace with the associated name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The string &quot;Updated: &quot; followed by the value of the input parameter <code>name</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Updated: Charles\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404: Name Not Found": [
          {
            "group": "404: Name Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demosql.js",
    "groupTitle": "DemoSql"
  },
  {
    "type": "get",
    "url": "/hello",
    "title": "Request a Hello World message",
    "name": "GetHello",
    "group": "Hello",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello World message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_eps.js",
    "groupTitle": "Hello"
  },
  {
    "type": "post",
    "url": "/hello",
    "title": "Request a Hello World message",
    "name": "PostHello",
    "group": "Hello",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello World message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_eps.js",
    "groupTitle": "Hello"
  },
  {
    "type": "post",
    "url": "/order",
    "title": "Add an order to the orders table",
    "name": "AddOrder",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"orderhistoryorders\":\"{\"bool\":[\"f\", \"t\", \"f\", \"t\", \"f\", \"f\", \"t\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"f\", \"t\", \"t\"]}\",\n    \"name\":\"Test Special\"\n}",
          "type": "json"
        },
        {
          "title": "Response-Example:",
          "content": "HTTP/1.1 201 OK\n   {\n     \"success\": true,\n     \"message\": \"Order added\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the Order is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Order added&quot;</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing parameters": [
          {
            "group": "400: Missing parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Invalid parameters": [
          {
            "group": "400: Invalid parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid parameters&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "delete",
    "url": "/demosql/:name",
    "title": "Request to remove entry in the DB for name",
    "name": "DeleteOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name entry  to delete</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/demosql/charles",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is delete</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>The string &quot;Deleted: &quot; followed by the value of the input parameter <code>orderid</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Deleted: \"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404: Name Not Found": [
          {
            "group": "404: Name Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/order",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrder",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://davisrm-tcss460-w21.herokuapp.com/order",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid MemberID&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>err.detail when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Add an order to the orders table",
    "name": "AddOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"size\":\"medium\",\n    \"color\":\"green\",\n    \"option1\":true,\n    \"option2\":false,\n    \"option3\":true\n}",
          "type": "json"
        },
        {
          "title": "Response-Example:",
          "content": "HTTP/1.1 201 OK\n   {\n     \"success\": true,\n     \"message\": \"Order added\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the Order is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Order added&quot;</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing parameters": [
          {
            "group": "400: Missing parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Invalid parameters": [
          {
            "group": "400: Invalid parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid parameters&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/cookie_orders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders_w/Cookies",
    "description": "<p>Returns all of the order entries in the DB for the user associated with the JWT found in the HTTP Request Cookie.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or the cookie is expired</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_orders_cookies.js",
    "groupTitle": "Orders_w/Cookies"
  },
  {
    "type": "get",
    "url": "/params",
    "title": "Request an message echo with a parameter",
    "name": "GetParams",
    "group": "Params",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>someone's name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello World message with echo of name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_eps.js",
    "groupTitle": "Params"
  },
  {
    "type": "post",
    "url": "/params",
    "title": "Request an message echo with a parameter",
    "name": "PostParams",
    "group": "Params",
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n  \"name\": \"Charles\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>someone's name</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Hello World message with echo of name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/demo_eps.js",
    "groupTitle": "Params"
  }
] });
