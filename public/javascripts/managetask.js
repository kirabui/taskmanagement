var task = new Vue({
  el: '#vtask',
  data: {

    session: '',
    //manager specific data Member ID, Name, email, Avail, Fav Tasks    GET
    manager: '',
    //POST
    newtask: {type: '', des: '', due: '', stat: ''},
    assignment: [],
    ttype: [],
    newtaskID: '',
    assignval: [],
    temp: [],

  },
  created: function(){

        this.getinfosession();




    },
  methods: {


    getinfosession: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              task.session= obj.user;
             // mana.session2.push(mana.session);
                task.ManaInfo();

              console.log(this.responseText);
              console.log(JSON.stringify(task.session));


            }else if (this.readyState == 4 && this.status == 403) {
               alert("you are not logged in");
               window.location.href = "index.html";
            }
        };
        xhttp.open("GET", "/users/getsession", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

    ManaInfo: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              task.manager= obj;
              console.log(this.responseText);
              console.log(JSON.stringify(obj));
              console.log(JSON.stringify(task.manager));
            }
        };
        xhttp.open("GET", "/users/ManaInfo", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },



   createTask: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Task is created successfully");
              var res =JSON.parse(this.response);
              console.log(res);
              task.newtaskID = res.insertId;
               console.log(task.newtaskID);
               task.yooo();
            }

        };
        xhttp.open("POST", "/users/createtask", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify(task.newtask));
        xhttp.send(JSON.stringify(task.newtask));

    },

    yooo: function(){
        console.log(task.assignment);

       for(i=0;i<task.assignment.length; i++){
        // task.assignval.push(task.newtaskID);
        // task.assignval.push(parseInt(task.assignment[i]));
        task.temp.push(task.newtaskID);
        task.temp.push(parseInt(task.assignment[i]));
        task.assignval.push(task.temp);
        task.temp=[];
       }

       console.log(task.assignval);
        task.assign();

    },


    assign: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Task successfully assigned");
                window.location.href = "managetask.html";
            }

        };
        xhttp.open("POST", "/users/assign", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify(task.assignval));
        xhttp.send(JSON.stringify(task.assignval));


    },



    logout: function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                      alert("log-out successfully");
                      window.location.href = "index.html";
                }
            };
            xhttp.open("GET", "/logout", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },

  }
});

