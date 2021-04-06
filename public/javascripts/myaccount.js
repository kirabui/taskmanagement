var mana = new Vue({
  el: '#vmana',
  data: {

    session: '',
    //avail, favtask
    user_data: '',
    //member specific data: manager ID, Name, Email   GET
    mem: '',
    //manager specific data Member ID, Name, email, Avail, Fav Tasks    GET
    manager: '',
    //POST
    updated: {name: '', email: '', availability: '', fav_tasks: '', added_mem: '', removed_mem: ''},

    session2: [],
    num: 0,
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
              mana.session= obj.user;
             // mana.session2.push(mana.session);
              mana.user_info();

              console.log(this.responseText);
              console.log(JSON.stringify(mana.session));


            }else if (this.readyState == 4 && this.status == 403) {
               alert("you are not logged in");
               window.location.href = "index.html";
            }
        };
        xhttp.open("GET", "/users/getsession", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

    user_info: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              mana.user_data= obj[0];
              console.log(this.responseText);
              console.log(JSON.stringify(obj));
              console.log(JSON.stringify(mana.user_data));
              mana.isMana();
            }
        };
        xhttp.open("GET", "/users/userdata", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

   isMana: function(){
    // console.log(this.user_data);
    // console.log(this.session);
    // console.log(mana.session);

    if(this.session.isManager == 1){
      mana.ManaInfo();
    }
      if(this.session.isManager == 0){
      mana.MemInfo();
    }
   },

  MemInfo: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              mana.mem= obj[0];
              console.log(this.responseText);
              console.log(JSON.stringify(obj));
              console.log(JSON.stringify(mana.mem));
            }
        };
        xhttp.open("GET", "/users/MemInfo", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

  ManaInfo: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

              var obj = JSON.parse(this.response);
              mana.manager= obj;
              console.log(this.responseText);
              console.log(JSON.stringify(obj));
              console.log(JSON.stringify(mana.manager));
            }
        };
        xhttp.open("GET", "/users/ManaInfo", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

   name: function() {
          if(mana.updated.name == ''){
            alert("You must enter a new Name");
          }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Information successfully updated!");
                  window.location.href = "myaccount.html";
            }
            if (this.readyState == 4 && this.status == 500) {
              alert("Cannot connect to database");
            }
            if (this.readyState == 4 && this.status == 300) {
              alert("Update not sucessful");
            }
        };
        xhttp.open("POST", "/users/name", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ name: mana.updated.name}));
        xhttp.send(JSON.stringify({ name: mana.updated.name}));
          }
    },
  email: function() {
         if(mana.updated.email == ''){
            alert("You must enter a new email");
          }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Information successfully updated!");
                  window.location.href = "myaccount.html";
            }
            if (this.readyState == 4 && this.status == 500) {
              alert("Cannot connect to database");
            }
            if (this.readyState == 4 && this.status == 300) {
              alert("Update not sucessful");
            }
        };
        xhttp.open("POST", "/users/email", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ email: mana.updated.email}));
        xhttp.send(JSON.stringify({ email: mana.updated.email}));
          }
    },

  password: function() {
     if(mana.updated.password == ''){
            alert("You must enter a new password");
          }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Information successfully updated!");
                  window.location.href = "myaccount.html";
            }
            if (this.readyState == 4 && this.status == 500) {
              alert("Cannot connect to database");
            }
            if (this.readyState == 4 && this.status == 300) {
              alert("Update not sucessful");
            }
        };
        xhttp.open("POST", "/users/password", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ password: mana.updated.password}));
        xhttp.send(JSON.stringify({ password: mana.updated.password}));
          }
    },

  avail: function() {
       if(mana.updated.availability == ''){
            alert("You must enter your new availability");
          }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Information successfully updated!");
                  window.location.href = "myaccount.html";
            }
            if (this.readyState == 4 && this.status == 500) {
              alert("Cannot connect to database");
            }
            if (this.readyState == 4 && this.status == 300) {
              alert("Update not sucessful");
            }
        };
        xhttp.open("POST", "/users/availability", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ availability: mana.updated.availability}));
        xhttp.send(JSON.stringify({ availability: mana.updated.availability}));
          }
    },

  fav_tasks: function() {
       if(mana.updated.fav_tasks == ''){
            alert("You must enter a new fav task");
          }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              alert("Information successfully updated!");
                  window.location.href = "myaccount.html";
            }
            if (this.readyState == 4 && this.status == 500) {
              alert("Cannot connect to database");
            }
            if (this.readyState == 4 && this.status == 300) {
              alert("Update not sucessful");
            }
        };
        xhttp.open("POST", "/users/fav_tasks", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ fav_tasks: mana.updated.fav_tasks}));
        xhttp.send(JSON.stringify({ fav_tasks: mana.updated.fav_tasks}));
          }
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