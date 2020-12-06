USE employee_trackerDB;

/* Departments */
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Operations");
INSERT INTO department (name) VALUES ("IT");

/* All Roles */
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Receivable Rep", 40000, (select id from department where name = "Accounting"));
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Payable Rep", 40000, (select id from department where name = "Accounting"));
INSERT INTO role (title, salary, department_id) VALUES ("Accounting Manager", 65000, (select id from department where name = "Accounting"));
INSERT INTO role (title, salary, department_id) VALUES ("Developer I", 50000, (select id from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("Developer II", 70000, (select id from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("IT Manager", 90000, (select id from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("Customer Service Associate", 35000, (select id from department where name = "Operations"));
INSERT INTO role (title, salary, department_id) VALUES ("Floor Manager", 60000, (select id from department where name = "Operations"));

/* Managers */
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John","Smith",(select id from role where title = "Accounting Manager"),NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Susan","Baker",(select id from role where title = "IT Manager"),NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jason","Anderson",(select id from role where title = "Floor Manager"),NULL);

/* Employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alan","Walker",(select id from role where title = "Accounts Receivable Rep"),(select id from role where title = "Accounting Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sheila","Jones",(select id from role where title = "Accounts Receivable Rep"),(select id from role where title = "Accounting Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tiffany","Holder",(select id from role where title = "Accounts Payable Rep"),(select id from role where title = "Accounting Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andrew","Williams",(select id from role where title = "Accounts Payable Rep"),(select id from role where title = "Accounting Manager"));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Sam","Barrows",(select id from role where title = "Developer I"),(select id from role where title = "IT Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mitchell","Carson",(select id from role where title = "Developer II"),(select id from role where title = "IT Manager"));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Heather","Boswell",(select id from role where title = "Customer Service Associate"),(select id from role where title = "Floor Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mallory","Meadows",(select id from role where title = "Customer Service Associate"),(select id from role where title = "Floor Manager"));