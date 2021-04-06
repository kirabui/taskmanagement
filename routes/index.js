var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');

const argon2 = require('argon2');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// Sign-up

router.post('/signup', async function(req, res, next) {
    var phash = null;
    try {
      phash = await argon2.hash(req.body.pass);
    } catch (err) {
      res.sendStatus(500);
      return;
    }


  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    //JSON.stringify({ username: this.sUsername, pass: this.spass, email: this.semail, name: this.sname, isManager: this.sismanager, manager_id: this.smanager_id }
      var query = "INSERT INTO user (username, password, email, name, isManager, manager_id) VALUES (?,?,?,?,?,?)";
      connection.query(query, [sanitizeHtml(req.body.username), phash,sanitizeHtml(req.body.email), sanitizeHtml(req.body.name), sanitizeHtml(req.body.isManager),sanitizeHtml(req.body.manager_id)], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        console.log(err);
        res.sendStatus(300);
        return;
      }


      res.sendStatus(200);

    });
  });

  console.log(req.session);

});

//Log-in


router.post('/login', function(req, res, next) {

  // var phash = null;
  //   try {
  //     phash = await argon2.hash(req.body.pass);
  //     console.log(phash);
  //   } catch (err) {
  //     res.sendStatus(500);
  //     return;
  //   }


  req.pool.getConnection( function(err,connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    var query = "SELECT * FROM user WHERE username = ?";
    connection.query(query, [req.body.user, req.body.pass], async function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
        res.sendStatus(500);
        return;
      }
     // console.log(phash);
      try {
          if (  await argon2.verify(rows[0].password, req.body.pass)) {
            // password match
            // add code here for when user successfully logged in
            delete rows[0].password;
            req.session.user = rows[0];
            console.log(req.session);
            res.send();
            return;


          } else {
            // password did not match
            // add code here for when user login fails

            res.sendStatus(401);
            return;
          }
        } catch (err) {
          // internal failure
          res.sendStatus(500);
          return;
        }









        // try {
        //   if (rows[0].password, req.body.pass) {
        //     delete rows[0].password;
        //     req.session.user = rows[0];
        //     console.log(req.session);
        //     res.end();
        //     return;
        //   }
        // } catch (err) {
        //   console.log(err);
        // }



    });
  });

  //console.log(req.session);

});


//Log - out
router.get('/logout', function(req, res, next) {

  delete req.session.user;
  res.sendStatus(200);
  console.log(req.session);

});




// var express = require('express');
// var router = express.Router();
// // var argon2 = require('argon2');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// // Sign-up

// router.post('/signup', function(req, res, next) {


//   req.pool.getConnection( function(err,connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     //JSON.stringify({ username: this.sUsername, pass: this.spass, email: this.semail, name: this.sname, isManager: this.sismanager, manager_id: this.smanager_id }
//       var query = "INSERT INTO user (username, password, email, name, isManager, manager_id) VALUES (?,?,?,?,?,?)";
//       connection.query(query, [req.body.username, req.body.pass, req.body.email, req.body.name, req.body.isManager, req.body.manager_id], function(err, rows, fields) {
//       connection.release(); // release connection
//       if (err) {
//         console.log(err);
//         res.sendStatus(300);
//         return;
//       }


//       res.sendStatus(200);

//     });
//   });

//   console.log(req.session);

// });

// //Log-in


// router.post('/login', function(req, res, next) {

//   req.pool.getConnection( function(err,connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     var query = "SELECT username,password,email,name,isManager,user_id,manager_id FROM user WHERE username = ? AND password = ?";
//     connection.query(query, [req.body.user,req.body.pass,req.body.user,req.body.pass], function(err, rows, fields) {
//       connection.release(); // release connection
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }

//       if(rows.length > 0){

//         try {
//           if (rows[0].password, req.body.pass) {
//             delete rows[0].password;
//             req.session.user = rows[0];
//             console.log(req.session);
//             res.send();
//             return;
//           }
//         } catch (err) {
//           console.log(err);
//         }

//       }
//       console.log(req.session);
//       res.sendStatus(401);

//     });
//   });

//   //console.log(req.session);

// });


// //Log - out
// router.get('/logout', function(req, res, next) {

//   delete req.session.user;
//   res.sendStatus(200);
//   console.log(req.session);

// });

