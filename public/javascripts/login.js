var pro = new Vue({
  el: '#vpro',
  data: {
    lUser: '',
    lPass: '',
    fail: 'true',
    loginn: true,
    sUsername: '',
    spass: '',
    semail: '',
    sname: '',
    sismanager: '',
    smanager_id: 0,
    sign_fail: true,

  },
  methods: {

     login: function() {
         if(pro.lUser == '' || pro.lPass==''){
            alert("You must enter username and password");
          }else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               window.location.href = "home.html";

            } else if (this.readyState == 4 && this.status == 401) {
                pro.fail = 'false';
            }
        };
        xhttp.open("POST", "/login", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ user: this.lUser, pass: this.lPass }));
     }
    },

    signup: function() {
        if (pro.sUsername == '' || pro.spass == '' || pro.semail == '' || pro.sname == '' || pro.sismanager == '' ){
            alert("Username, Password, Email and Manager/Member are mandatory");
        } else{

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               window.location.href = "login.html";

            } else if (this.readyState == 4 && this.status == 300) {
                pro.sign_fail= false;
            }
        };
        xhttp.open("POST", "/signup", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        console.log(JSON.stringify({ username: this.sUsername, pass: this.spass, email: this.semail, name: this.sname, isManager: this.sismanager, manager_id: this.smanager_id }));

        xhttp.send(JSON.stringify({ username: this.sUsername, pass: this.spass, email: this.semail, name: this.sname, isManager: this.sismanager, manager_id: this.smanager_id }));
    }

    }
  }
});