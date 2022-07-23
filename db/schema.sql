
CREATE TABLE department(
    id INTEGER AUTO_INCREMENT PRIMARY KEY
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles(
    id INTEGER AUTO_INCREMENT PRIMARY KEY
    title VARCHAR(30) NOT NULL
    salary DECIMAL
    department_id INTEGER
);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT PRIMARY KEY
    first_name VARCHAR(30)
    last_name VARCHAR(30)
    role_id INTEGER
    manger_id INTEGER
);