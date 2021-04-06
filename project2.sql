CREATE TABLE user (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    availability VARCHAR (255),
    fav_tasks VARCHAR (255),
    isManager BOOLEAN DEFAULT 0,
    manager_id INT DEFAULT 0 ,
    PRIMARY KEY (user_id)
);

CREATE TABLE task (
    task_id INT NOT NULL AUTO_INCREMENT,
    description LONGTEXT,
    task_type VARCHAR(255),
    task_status VARCHAR(255),
    due_date DATE,
    assign_by INT,

    PRIMARY KEY (task_id),
    FOREIGN KEY (assign_by) REFERENCES user(user_id) ON DELETE NO ACTION
);

CREATE TABLE assignment (
    task_id INT,
    team_member INT,
    date_assigned TIMESTAMP DEFAULT CURRENT_TIMESTAMP  ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES task(task_id) ON DELETE NO ACTION,
    FOREIGN KEY (team_member) REFERENCES user(user_id) ON DELETE NO ACTION


);

INSERT INTO user (username,email,name,password,isManager,manager_id) VALUES ('test3','test3@yahoo.com','Mr.Test3','1234',1, 0  );

INSERT INTO assignment (task_id,team_member) VALUES (14,39),(14,1);

//Find Task due today for TEAM
SELECT * FROM task INNER JOIN assignment ON task.task_id = assignment.task_id WHERE due_date = CURDATE()

-- Find task based on MANAGER ID and DUE DATE TODAY

SELECT  task.* ,assignment.team_member, user.name FROM task
INNER JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE due_date = CURDATE() AND assign_by = 0;

Store procedures

CREATE PROCEDURE selectuser @id int
AS
SELECT * FROM user WHERE user_id= @id
GO;

SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE due_date = DATE_SUB(CURDATE(), INTERVAL 5 DAY);

SELECT DATE_ADD(CURDATE(), INTERVAL 5 DAY);

-- it worked
SELECT * FROM task WHERE due_date between DATE_ADD(CURDATE(), INTERVAL 1 DAY) and DATE_ADD(CURDATE(), INTERVAL 1 DAY);

DATE_ADD(CURDATE(), INTERVAL 1 DAY)
-- Next week for team
SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = ? AND (task.due_date between DATE_ADD(CURDATE(), INTERVAL 1 DAY) and DATE_ADD(CURDATE(), INTERVAL 7 DAY));

-- Next week for user
SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE user_id = ? AND (task.due_date between CURDATE() and DATE_ADD(CURDATE(), INTERVAL 7 DAY));

--find task by between
SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = 1 AND (task.due_date BETWEEN '2020-06-24' AND '2020-06-27');

-- -find task by due date & task-id
SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = 1 AND task.task_id = '' OR task.due_date= '2020-06-27';

-- find task by id and due between
SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = 1 AND task.task_id = '' OR (task.due_date BETWEEN '2020-06-24' AND '2020-06-27');

SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = ? AND task.task_id = ? OR (task.due_date BETWEEN ? AND ?);

SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task
RIGHT JOIN assignment ON task.task_id=assignment.task_id
INNER JOIN user ON assignment.team_member = user.user_id
WHERE assign_by = 1 AND task.task_id = 14;

-- UPDATE task query
--Update only status to set
UPDATE task SET task_status = 'youuu' WHERE task_id= 19 AND assign_by = 1;
--Update only due_date to set
UPDATE task SET due_date = ? WHERE task_id= ? AND assign_by = ?;
-- update when both due and stat
UPDATE task SET due_date = '2020-09-09', task_status = 'fasdfdsf' WHERE task_id= 54 AND assign_by = 1;
