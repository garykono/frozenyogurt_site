DROP TABLE IF EXISTS Members CASCADE;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                      Email VARCHAR(255) NOT NULL UNIQUE,
                      Username VARCHAR(255) NOT NULL,
                      Password VARCHAR(255) NOT NULL,
                      Phone VARCHAR(255) NOT NULL,
                      SALT VARCHAR(255),
                      Verification INT DEFAULT 0
);


DROP TABLE IF EXISTS Demo;
CREATE TABLE Demo (DemoID SERIAL PRIMARY KEY,
                        Name VARCHAR(255) NOT NULL UNIQUE,
                        Message VARCHAR(255)
);

DROP TABLE IF EXISTS Orders CASCADE;
CREATE TABLE Orders (OrderID SERIAL PRIMARY KEY,
                     MemberID INT NOT NULL,
                     OrderHistoryOrder VARCHAR(255) NOT NULL,
                     Name VARCHAR(255) NOT NULL
);
