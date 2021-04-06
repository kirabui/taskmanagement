
var home = new Vue({
  el: '#vhome',
  data: {

    session: '',
    //manager specific data Member ID, Name, email, Avail, Fav Tasks    GET
    teamtask: '',
    date:'',
    te: '',
    teamshow: true,
    yourtask:'',
    teamweek: '',
    yourweek: '',
    colnam: {taskid: "TaskID",description:"Description",type:"Task Type", stat: "Task status", due: "Due Date", st: "Start Assigned", team: "Team Members"},
  },

  created: function(){

        this.getinfosession();
    },

  computed:{


  },
  methods: {
    getinfosession: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              var obj = JSON.parse(this.response);
              home.session= obj.user;
             // mana.session2.push(mana.session);
             home.teamtasktoday();
           console.log(this.responseText);
              console.log(JSON.stringify(home.session));
            }else if (this.readyState == 4 && this.status == 403) {
               alert("you are not logged in");
               window.location.href = "index.html";
            }

        };
        xhttp.open("GET", "/users/getsession", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

  teamtasktoday: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              home.teamtask = JSON.parse(this.response);
              //modification

                        //slicing the date
                        for(i=0;i<home.teamtask.length;i++){
                          home.date = JSON.stringify(home.teamtask[i].due_date);
                          //console.log(home.date);
                          home.te = home.date.replace("T00:00:00.000Z","");
                          //console.log(home.te);
                          home.teamtask[i].due_date = JSON.parse(home.te);
                        }
                          home.date= '';
                          home.te = '';

                          //slicing date assigned
                          for(i=0;i<home.teamtask.length;i++){
                          home.date = JSON.stringify(home.teamtask[i].date_assigned);
                          //console.log(home.date);
                          home.te = JSON.stringify(home.date.slice(1,11));
                          //console.log(home.te);
                          home.teamtask[i].date_assigned = JSON.parse(home.te);
                        }
                        //clear varible
                          home.date= '';
                          home.te = '';

                            console.log(home.teamtask);
                          //run functions
                          home.tweek();
                          home.yourtasktoday();
                          home.yoweek();
              //end modify
              //console.log(this.responseText);
              console.log(JSON.stringify(home.teamtask));
            }
        };
        xhttp.open("GET", "/users/team", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

  tweek: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              home.teamweek = JSON.parse(this.response);
              //modification
              //slicing the date
              for(i=0;i<home.teamweek.length;i++){
                home.date = JSON.stringify(home.teamweek[i].due_date);
                //console.log(home.date);
                home.te = home.date.replace("T00:00:00.000Z","");
                //console.log(home.te);
                home.teamweek[i].due_date = JSON.parse(home.te);
              }
                home.date= '';
                home.te = '';

              for(i=0;i<home.teamweek.length;i++){
                          home.date = JSON.stringify(home.teamweek[i].date_assigned);
                          //console.log(home.date);
                          home.te = JSON.stringify(home.date.slice(1,11));
                          //console.log(home.te);
                          home.teamweek[i].date_assigned = JSON.parse(home.te);
                        }
                        //clear varible
                          home.date= '';
                          home.te = '';


              //end modify
              //console.log(this.responseText);
              console.log(JSON.stringify(home.teamweek));
            }
        };
        xhttp.open("GET", "/users/tweek", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },


  yourtasktoday: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              home.yourtask = JSON.parse(this.response);
              //modification
              //slicing the date
              for(i=0;i<home.yourtask.length;i++){
                home.date = JSON.stringify(home.yourtask[i].due_date);
               // console.log(home.date);
                home.te = home.date.replace("T00:00:00.000Z","");
                //console.log(home.te);
                home.yourtask[i].due_date = JSON.parse(home.te);
              }
               home.date= '';
              home.te = '';

              for(i=0;i<home.yourtask.length;i++){
                          home.date = JSON.stringify(home.yourtask[i].date_assigned);
                          //console.log(home.date);
                          home.te = JSON.stringify(home.date.slice(1,11));
                          //console.log(home.te);
                          home.yourtask[i].date_assigned = JSON.parse(home.te);
                        }
                        //clear varible
                          home.date= '';
                          home.te = '';
              //end modify
              //console.log(this.responseText);
              console.log(JSON.stringify(home.yourtask));
            }
        };
        xhttp.open("GET", "/users/my", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

 yoweek: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              home.yourweek = JSON.parse(this.response);
              //modification
              //slicing the date
              for(i=0;i<home.yourweek.length;i++){
                home.date = JSON.stringify(home.yourweek[i].due_date);
               // console.log(home.date);
                home.te = home.date.replace("T00:00:00.000Z","");
                //console.log(home.te);
                home.yourweek[i].due_date = JSON.parse(home.te);
              }
               home.date= '';
              home.te = '';

              for(i=0;i<home.yourweek.length;i++){
                          home.date = JSON.stringify(home.yourweek[i].date_assigned);
                          //console.log(home.date);
                          home.te = JSON.stringify(home.date.slice(1,11));
                          //console.log(home.te);
                          home.yourweek[i].date_assigned = JSON.parse(home.te);
                        }
                        //clear varible
                          home.date= '';
                          home.te = '';

              //end modify
              //console.log(this.responseText);
              console.log(JSON.stringify(home.yourweek));
            }
        };
        xhttp.open("GET", "/users/myweek", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
    },

update: function(task_id,new_status){
    if(new_status == undefined){
      alert("You need to set new status to update!");
    }else{
       var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("update successfully!");
                window.location.href = "home.html";

            }else if (this.readyState == 4 && this.status == 500) {
               alert("Some problem occurred");
            }
        };
        xhttp.open("POST", "/users/update", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({taskid:task_id,stat: new_status}));
    }
  console.log(task_id,new_status);


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