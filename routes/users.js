var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
const argon2 = require('argon2');





/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use(function(req, res, next) {
  if('user' in req.session ===false  ){
      res.sendStatus(403);
  }
  next();
});

//Get sesison information

router.get('/getsession', function(req, res, next) {
  console.log(req.session);
    if('user' in req.session === false){
      res.sendStatus(403);
  }else{
    res.send(req.session);
  }
});

router.get('/userdata', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE user_id = ? ";

    connection.query(query,[req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(404);
        return;
      }
    delete rows[0].password;
      console.log(req.session);
      res.send(rows); //send response
    });
  });

});

// Get member Info
router.get('/MemInfo', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE user_id = ? ";

    connection.query(query,[req.session.user.manager_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);
      if('password' in rows[0]){
            delete rows[0].password;
            delete rows[0].isManager;
            delete rows[0].manager_id;
      }
      res.send(rows); //send response
    });
  });

});

//Get member Info

router.get('/ManaInfo', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE manager_id = ? ";

    connection.query(query,[req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(404);
        return;
      }
      console.log(rows);

          for (i=0; i<rows.length; i++){
             delete rows[i].password;
            delete rows[i].isManager;
            delete rows[i].manager_id;
          }

      res.send(rows); //send response
    });
  });

});


//Manage Account

router.post('/name', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE user SET name = ? WHERE user_id= ?;";
    console.log(req.body.name);
    connection.query(query,[sanitizeHtml(req.body.name),req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }
      req.session.user.name = req.body.name;
      console.log(req.session);
      res.json(rows); //send response
    });
  });

});

//Email
router.post('/email', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE user SET email = ? WHERE user_id= ?;";
    console.log(req.body.email);
    connection.query(query,[sanitizeHtml(req.body.email),req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }
      req.session.user.email = req.body.email;
      console.log(req.session);
      res.json(rows); //send response
    });
  });

});

//Password
router.post('/password', async function(req, res, next) {
      var phash = null;
          try {
            phash = await argon2.hash(req.body.password);
          } catch (err) {
            res.sendStatus(500);
            return;
          }
  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE user SET password = ? WHERE user_id= ?;";
    console.log(req.body.password);
    connection.query(query,[phash,req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }
      //req.session.user.email = req.body.email;
      console.log(req.session);
      res.json(rows); //send response
    });
  });

});

//Availability

router.post('/availability', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE user SET availability = ? WHERE user_id= ?;";
    console.log(req.body.availability);
    connection.query(query,[sanitizeHtml(req.body.availability),req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }
      //req.session.user.email = req.body.email;
      console.log(req.session);
      res.json(rows); //send response
    });
  });

});

//Fav_tasks
router.post('/fav_tasks', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "UPDATE user SET fav_tasks = ? WHERE user_id= ?;";
    console.log(req.body.fav_tasks);
    connection.query(query,[sanitizeHtml(req.body.fav_tasks),req.session.user.user_id], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }
      //req.session.user.email = req.body.email;
      console.log(req.session);
      res.json(rows); //send response
    });
  });

});


// Create Task

router.post('/createtask', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      console.log(req.body);
      var query = "INSERT INTO task (description,task_type,task_status,due_date,assign_by) VALUES (?,?,?,?,? )";
      connection.query(query, [sanitizeHtml(req.body.des), req.body.type,req.body.stat,sanitizeHtml(req.body.due),sanitizeHtml(req.session.user.user_id)],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      console.log(rows);
      res.json(rows);

    });
  });


});

//Assign Task
router.post('/assign', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      console.log(req.body);
      var query = "INSERT INTO assignment (task_id,team_member) VALUES ?";
      connection.query(query, [req.body],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      console.log(rows);
      res.json(rows);

    });
  });


});

var arr = [];
var toshow =[];
var mem=[];
var temp=[];
var date='';
var te='';

//get team task
router.get('/team', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var tosend;
      var query = "SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task INNER JOIN assignment ON task.task_id=assignment.task_id INNER JOIN user ON assignment.team_member = user.user_id WHERE due_date = CURDATE() AND assign_by = ?";

      if (req.session.user.isManager == 1){
        tosend = req.session.user.user_id;
      } else if (req.session.user.isManager == 0){
          if (req.session.user.manager_id === null || req.session.user.manager_id == 0 ){ //if no team just send it's own userid
              tosend = req.session.user.user_id;
          }else{ tosend = req.session.user.manager_id;}


      }else {res.sendStatus(404);}

      connection.query(query, [tosend],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
    return console.log('Error2');}

    else if (!rows[0].task_id) {
    return console.log('Error3');}
    else{

    //console.log(rows); //original from database
      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};
      }

      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';

    //end the else
    }

    // END BIG IF

    });
  });

});
///my task

router.get('/my', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var tosend;
      var query = "SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task INNER JOIN assignment ON task.task_id=assignment.task_id INNER JOIN user ON assignment.team_member = user.user_id WHERE due_date = CURDATE() AND user_id = ?";
      connection.query(query, [req.session.user.user_id],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
        res.json(rows);
    return console.log('Error2');

      }

    else if (!rows[0].task_id) {
    return console.log('Error3');}

    else{





    console.log(rows); //original from database





      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};
      delete toshow[i].teammate;
      }






      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';

    //end the else
    }
    // END BIG IF




    });
  });


});


//go find task

router.post('/gofind', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var tosend;
      var query = "SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task RIGHT JOIN assignment ON task.task_id=assignment.task_id INNER JOIN user ON assignment.team_member = user.user_id WHERE assign_by = ? AND (task.task_id = ? OR (task.due_date BETWEEN ? AND ?))";

      if (req.session.user.isManager == 1){
        tosend = req.session.user.user_id;
      } else if (req.session.user.isManager == 0){
          if (req.session.user.manager_id === null || req.session.user.manager_id == 0 ){ //if no team just send it's own userid
              tosend = req.session.user.user_id;
          }else{ tosend = req.session.user.manager_id;}


      }else {res.sendStatus(404);}


      connection.query(query, [tosend,req.body.taskid,req.body.duefr,req.body.dueto],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
        res.json(rows);
    return console.log('Error2');

      }

    else if (!rows[0].task_id) {
    return console.log('Error3');}
    else{

    console.log(rows); //original from database

      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};

      }

      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';

    //end else
    }
    // END BIG IF




    });
  });


});

//update

router.post('/update', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var assign;
      var query;
      var val =[];
//if member=> send their manager_id/ if manager, send their own ID
      if (req.session.user.isManager == 1){
        assign = req.session.user.user_id;
      } else if (req.session.user.isManager == 0){
          if (req.session.user.manager_id === null || req.session.user.manager_id == 0 ){ //if no team just send it's own userid
              assign = req.session.user.user_id;
          }else{ assign = req.session.user.manager_id;}
      }else {res.sendStatus(404);}

//if only status in req (meaning no due date)
if (!("due" in req.body)){
  query = "UPDATE task SET task_status = ? WHERE task_id= ? AND assign_by = ?";
  val.push(req.body.stat, req.body.taskid, assign);
}
if(!("stat" in req.body)){
  query = "UPDATE task SET due_date = ? WHERE task_id= ? AND assign_by = ?";
  val.push(req.body.due, req.body.taskid, assign);
}
if(("stat" in req.body)&&("due" in req.body)){
   query = "UPDATE task SET due_date = ?, task_status = ? WHERE task_id= ? AND assign_by = ?";
  val.push(req.body.due,req.body.stat,req.body.taskid,assign);
}


      connection.query(query, val,  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
        console.log(rows);
        res.json(rows);

    return console.log('Error2');

      }

    else if (!rows[0].task_id) {
    return console.log('Error3');}
    else{

    console.log(rows); //original from database

      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};

      }

      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';
    //end else
    }
    // END BIG IF

    });
  });


});
// team week
router.get('/tweek', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var tosend;
      var query = "SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task RIGHT JOIN assignment ON task.task_id=assignment.task_id INNER JOIN user ON assignment.team_member = user.user_id WHERE assign_by = ? AND (task.due_date between DATE_ADD(CURDATE(), INTERVAL 1 DAY) and DATE_ADD(CURDATE(), INTERVAL 7 DAY))";

      if (req.session.user.isManager == 1){
        tosend = req.session.user.user_id;
      } else if (req.session.user.isManager == 0){
          if (req.session.user.manager_id === null || req.session.user.manager_id == 0 ){ //if no team just send it's own userid
              tosend = req.session.user.user_id;
          }else{ tosend = req.session.user.manager_id;}


      }else {res.sendStatus(404);}

      connection.query(query, [tosend],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
    return console.log('Error2');}

    else if (!rows[0].task_id) {
    return console.log('Error3');}
    else{

    //console.log(rows); //original from database
      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};
      }

      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';

    //end the else
    }

    // END BIG IF

    });
  });

});

//my week
router.get('/myweek', function(req, res, next) {

  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
      var tosend;
      var query = "SELECT  task.* ,assignment.team_member, user.name, date_assigned FROM task RIGHT JOIN assignment ON task.task_id=assignment.task_id INNER JOIN user ON assignment.team_member = user.user_id WHERE user_id = ? AND (task.due_date between DATE_ADD(CURDATE(), INTERVAL 1 DAY) and DATE_ADD(CURDATE(), INTERVAL 7 DAY))";

      connection.query(query, [req.session.user.user_id],  function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }else if (!rows.length) {
    return console.log('Error2');}

    else if (!rows[0].task_id) {
    return console.log('Error3');}
    else{

    //console.log(rows); //original from database
      // start modification
      arr.push(rows[0].task_id);
      toshow.push(rows[0]);
      for (i=0;i<rows.length-1; i++){
        if(rows[i].task_id != rows[i+1].task_id){
          arr.push(rows[i+1].task_id);

            // date = JSON.stringify(rows[i+1].due_date);
            // te = date.replace("T00:00:00.000Z","");
            // rows[i+1].due_date = JSON.parse(te);

          toshow.push(rows[i+1]);
        }
      }

      for(i=0;i<arr.length; i++){
        temp= '';
        for(k=0;k<rows.length;k++){
          if (rows[k].task_id == arr[i]){
            temp +=  rows[k].name + ", ";
          }
        }
      delete toshow[i].team_member;
      delete toshow[i].name;
      delete toshow[i].assign_by;
      toshow[i].teammate = temp;
      temp={};
      }

      //end modification
      res.json(toshow);
      //empty the array
      arr = [];
      toshow =[];
      mem=[];
      temp=[];
      date='';
      te='';

    //end the else
    }

    // END BIG IF

    });
  });

});

module.exports = router;
